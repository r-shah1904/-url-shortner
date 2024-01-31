const shortid = require("shortid");
const newURL = require("../models/urlModels")

async function generateShortURL(req, res){
    console.log(req.body)
    const shortID = shortid()
    const body = req.body;
    if(!body.url){
        return res.status(400).json({msg:"url is required"});
    }
    await newURL.create({
        shortID : shortID,
        redirectURL : body.url
    });

    return res.json({id:shortID});

}

module.exports = {generateShortURL};