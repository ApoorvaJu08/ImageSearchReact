const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const User =  mongoose.model("User")
const Images =  mongoose.model("Images")

router.post('/addImage', requireLogin, (req, res) => {
    const {url} = req.body
    req.user.password = undefined
    req.user.email = undefined
    const image = new Images({
        url,
        addedBy: req.user
    })
    image.save().then(result => {
        res.json({image: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         Images.find({addedBy:req.params.id})
         .populate("addedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.get('/myimage',requireLogin,(req,res)=>{
    Images.find({addedBy:req.user._id})
    .populate("addedBy","_id name")
    .then(myimage=>{
        res.json({myimage})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router