const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://Deepak:Deepak123@cluster0.tfkyq8g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const UserSchema = mongoose.Schema(
{    username:String,
    password: String,
    privateKey: String,
    publicKey:String
}
) 

const userModel = mongoose.model("users", UserSchema)

module.exports= {
    userModel
}