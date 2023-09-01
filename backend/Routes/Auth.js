const express = require('express');
const router = express.Router(); // Use express.Router() to create the router
const User = require("../models/User");
const Order = require("../models/Orders")

const bcrypt = require('bcrypt');
const { genSalt } = require('bcrypt');

const jwt = require('jsonwebtoken')
const jwtSecret = 'gofoodmernstackproject'

const { body, validationResult } = require('express-validator');


//api for Signup
router.post('/createuser', [
    body('email').isEmail(),    //Express-validator for email and password
    body('password').isLength({ min: 5 })
], async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() })
    }
    //for password bcrypt
    const SALT = await genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, SALT)
    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: securePassword,
        });
        resp.json({ success: true });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ errors: [{ msg: "Internal server error." }] });
    }
});

// API for login
router.post('/loginuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() })
        }
        try {
            const filter = { email: req.body.email }
            const userData = await User.findOne(filter);
            if (!userData) {
                return resp.status(400).json({ errors: [{ msg: "Invalid email." }] });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return resp.status(400).json({ errors: [{ msg: "Invalid password." }] });
            }

            //an object 
            const data = {
                user: {
                    id: userData.id //getting user id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return resp.json({ success: true, authToken: authToken });

        } catch (error) {
            console.error(error);
            return resp.status(500).json({ errors: [{ msg: "Internal server error." }] });
        }
    })


router.post('/foodData', async (req, res) => {
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    // console.log("1231242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            console.log(data)
            // console.log("12312424",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})
router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email);
        let eId = await Order.findOne({ 'email': req.body.email });
        res.json({ order_data: eId });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

module.exports = router;
