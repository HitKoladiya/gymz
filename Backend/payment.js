import Razorpay from "razorpay";

import express from "express";
import bodyParser from "body-parser";
import { auth, db } from "./firebaseCred.js";
import { sendEmail } from "./sendEmail.js";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { hash, compare } from "bcrypt";
import * as dotenv from 'dotenv' 
import { createHmac } from 'crypto';

dotenv.config()

const paymentRouter = express.Router();

paymentRouter.use(bodyParser.urlencoded({ extended: false }));
paymentRouter.use(bodyParser.json());

paymentRouter.post("/orderId", async (req, res) => {
    console.log(req.body);

    var instance = new Razorpay({
      key_id: String(process.env.PAYMENT_KEY_ID),
      key_secret: process.env.PAYMENT_KEY_SECRET,
    });
    console.log(process.env.PAYMENT_KEY_ID);
    console.log(process.env.PAYMENT_KEY_SECRET);

    var options = {
      amount: req.body.amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: req.body.receipt,
    };

    instance.orders.create(options, async function (err, order) {
      console.log("order:", order);
      console.log("err:", err);
      if (err) {
        res.status(500).json({ status: "error", error: err });
      } else {
        res.status(200).json({ status: "success", order: order });
      }
    });

});


paymentRouter.post("/payment", async (req, res) => {
        // console.log(req.body);

        const userRef = doc(db, "signin", req.body.email);
        const userSnap = await getDoc(userRef);
        // console.log(userSnap.data());


        if (!userSnap.exists()) {
            res.status(404).json({ "error": "user not found" });
            return;
        }
        else {

            if (userSnap.data().payment) {
                let payment = await userSnap.data().payment;
                for (let i = 0; i < payment.length; i++) {
                    if (payment[i].razorpay_order_id === req.body.razorpay_order_id) {
                        console.log(payment[i]);

                        res.status(200).json({
                            "error": "payment already done",
                            "statusWith": payment[i].status
                        });
                        return;
                    }
                }
            }

            let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
            console.log("body ", body);

            var expectedSignature = createHmac('sha256', String(process.env.PAYMENT_KEY_SECRET))
                .update(body.toString())
                .digest('hex');
            console.log("sig received ", req.body.razorpay_signature);
            console.log("sig generated ", expectedSignature);

            var response = { "signatureIsValid": "false" }
            if (expectedSignature === req.body.razorpay_signature) {
                console.log("signature is valid");
                response = { "signatureIsValid": "true" }
                res.status(200).json(response)
            }
            else {
                console.log("signature is not valid");
                res.status(401).json(response)
            }

            let newPayment = {
                razorpay_payment_id: req.body.razorpay_payment_id,
                razorpay_order_id: req.body.razorpay_order_id,
                razorpay_signature: req.body.razorpay_signature,
                date: new Date().getTime(),
                amount: req.body.amount,
                status: response.signatureIsValid
            }
            updateDoc(userRef, {
                payment: arrayUnion(newPayment)
            });
            return;
        }
});


export { paymentRouter };
