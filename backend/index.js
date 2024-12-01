const express = require('express')
const {userModel} = require("./models")
const jwt = require("jsonwebtoken")
const { Keypair } = require('@solana/web3.js')
const app = express()
app.use(express.json())

const JWT_SECRET = "123456"
// signup will create pvt key for the end user
app.post("/api/v1/signup", async(res,req) =>{
    const username = req.body.username
    const password = req.body.password
  
    const keyPair = new Keypair()
    await userModel.create({
        username, password,
        publicKey: keyPair.publicKey.toString(),
        privateKey:keyPair.secretKey.toString()
    })
    res.json({
        message: "Sign up"
    })
})
app.post("/api/v1/signin", async (res,req) =>{
    const username = req.body.username
    const password = req.body.password
    const user = await userModel.findOne({
        username

    })

    if (user){
        const token = jwt.sign(
            {
                id: user.id
            },JWT_SECRET
        )
        res.json(200)({
            token
        })

    }else{
        res.status(403).json({
            message:"creadentials are incorrect"
        })
    }
    res.json({
        message: "sign in"
    })
})


app.post("/api/v1/txn/sign", (res,req) =>{
    
// user will send txn object and we will sign on the user behalf
    res.json({
        message: "txn signed"
    })
})

app.get("/api/v1/txn/?id=id", (res,req) =>{
    res.json({
        message: "txn id"
    })
})

app.listen(3000)