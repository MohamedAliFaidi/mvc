const express = require('express')
const router = express.Router()

const authController = require("../contollers/auth.controller")






router.get("/check" , authController.check )
router.post("/register", authController.register );
router.post("/login", authController.login );
router.get("/logout", authController.logout );





module.exports = router