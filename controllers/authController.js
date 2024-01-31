const userModels = require("../models/userModels");

async function handleSginUp(req, res){
    const {name, email, password} = req.body;
    await userModels.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}
async function handleLogin(req, res){
    const {email, password} = req.body;
    const user = await userModels.findOne({email , password});
    if(!user){
        return res.render("loginError")
    }else{
        return res.redirect("/")
    }
    
}
module.exports = {handleSginUp, handleLogin}