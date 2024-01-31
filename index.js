// Modules
const express = require("express");
const URLroute = require("./routes/urlRoutes")
const {connectDB} = require("./connections");
const urlModels = require("./models/urlModels");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const multer = require("multer");
const userAuthRoute = require("./routes/userAuth");
var bodyParser= require ('body-parser');


const upload = multer();
// Constants
const PORT = 3001;
const app = express();

//Connecting to the mongoDB database
connectDB("mongodb://localhost:27017/urlShortnerDB")
.then(()=>{console.log("MongoDB successfully connected")})
.catch((err)=>{console.log("Database Connection error", err)});

// Setting up the view for server side rendering (EJS)
app.set("view engine", "ejs");
app.set('views', path.resolve("./views")); // tells the server the location of 

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Routes
app.use("/", staticRouter);
app.use("/url", URLroute);
app.use("/user", userAuthRoute);
// app.use(upload.array());
app.use(express.static('public'));

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    let timeStamp = Date.now();
    const entry = await urlModels.findOne({ shortID: shortId });

    if (entry && entry.redirectURL) {
        // Update the document with visit history
        await urlModels.updateOne(
            { shortID: shortId },
            {
                $push: { visitHistory: { timestamp: timeStamp } }
            }
        );

        res.redirect(entry.redirectURL);
    } else {
        res.status(404).send("Not Found");
    }
});



//Starting the server
app.listen(PORT, ()=>{
    console.log(`Server started at port : ${PORT}`);
});