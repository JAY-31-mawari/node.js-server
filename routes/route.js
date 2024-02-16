const express=require('express')
const router=express.Router()
const infomiddleware=require('../middleware/request-info')
const authenticationMiddleware=require('../middleware/authenticationMiddleware')

const {getusers,postuser,loginuser,updateuser,deleteuser}=require("../contorllers/controller")

router.route("/").get(infomiddleware,authenticationMiddleware,getusers)
router.route("/").post(infomiddleware,postuser)
router.route("/:id").put(infomiddleware,updateuser)
router.route("/:id").delete(infomiddleware,deleteuser)
//router.route("/login").post(infomiddleware,loginuser)

//router.route("/").get(getusers).post(postuser)
//router.route("/:id").put(updateuser).delete(deleteuser)

module.exports=router