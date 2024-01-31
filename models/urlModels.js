const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortID: {
        type:String, 
        required: true,
        unique: true
    },
    redirectURL:{
        type:String,
        required: true
    },
    visitHistory : [{ 
        timestamp:{
        type: Number,
    }, 
}],
},
{timestamps:true}
)

const urlModels = mongoose.model("urlModels", urlSchema)

module.exports = urlModels;