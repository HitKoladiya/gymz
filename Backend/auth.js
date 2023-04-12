import express from 'express';
import bodyParser from "body-parser"
import { auth, db } from "./firebaseCred.js"
import { sendEmail } from "./sendEmail.js"
import { collection, getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { hash, compare } from 'bcrypt'

const loginRouter = express.Router();

loginRouter.use(bodyParser.urlencoded({ extended: false }));
loginRouter.use(bodyParser.json());

loginRouter.post("/signUp", async (req, res) => {
    try {
        const { email } = req.body;
        let password = req.body.password;
        console.log(email+" "+password);
        let hashPassword = await hash(password, 8);
        password = await hashPassword;
        // console.log(email+" "+password);

        //check if user already exist or not in firestore signup
        const signUpRef = doc(db, "signup", email);
        const signupDoc = await getDoc(signUpRef);

        //check if user already exist or not in firestore signin
        const signInRef = doc(db, "signin", email);
        const signinDoc = await getDoc(signInRef);

        //if user exists in signin
        if (signinDoc.exists()) {
            await res.status(409);
            res.end('user already exist');
            return;
        }

        const otp = Math.floor(Math.random() * 8999) + 1000;
        const d = new Date();
        const time = d.getTime();

        //if not exist then save user for authentication
        if (!signupDoc.exists()) {

            //create entry in database
            const signUpRef = collection(db, "signup");
            await setDoc(doc(signUpRef, email), {
                email: email,
                password: password,
                OTP: otp,
                Time: time
            });

            //send otp on email
            await sendEmail(email, "otp for signup", String(otp))

            await res.status(200)
            await res.end('email sent succesfully');
            return;
        }

        //user already exist in signup
        else {
            const signUpRef = doc(db, "signup", email);

            // update user password,otp,time (if we have user in signup but user send request for signup again then update the user)
            await updateDoc(signUpRef, {
                password: password,
                OTP: otp,
                Time: time
            });

            //send new otp on email
            await sendEmail(email, "otp for signup", String(otp))

            await res.status(200)
            await res.end("email sent succesfully");
            return;
        }
    } catch (err) {
        console.log(err);
        await res.status(500);
        await res.end(err);
        return;
    }
})

loginRouter.post("/emailOtpAuth", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const userReferenceSignup = doc(db, "signup", email);
        const signupDoc = await getDoc(userReferenceSignup);

        const d = new Date();
        const time = d.getTime();

        //check if user exists
        if (signupDoc.exists()) {

            //check if otp time out
            // console.log("time=",Number(time)-Number(signupDoc.data()['Time']));
            if (Number(time) - Number(signupDoc.data()['Time']) > 300000) {
                await res.status(422).send("OTP Time out");
                await res.end();
                return;
            }

            const signupInfo = signupDoc.data();
            //compare otp
            if (String(signupInfo['OTP']) == String(otp)) {
                //first make entry in firebase auth service and then delete entry from firestore

                //signup in firebase auth
                await createUserWithEmailAndPassword(auth, email, signupInfo["password"])
                    .then(async (userCredential) => {
                        // Signed in 
                        const user = await userCredential.user;
                        // console.log(user);
                        await res.status(200);
                        await res.json({ "user": user });
                        await res.end();

                    })
                    .catch(async (error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        await res.status(500);
                        await res.send(errorMessage);
                        await res.end();
                        return;
                    });

                // create user in signin database
                const signinRef = collection(db, "signin");
                await setDoc(doc(signinRef, email), {
                    email: email,
                    password: signupInfo["password"]
                });

                //delete signup data of user
                await deleteDoc(doc(db, "signup", email));

                return;
            }
            else {
                await res.status(401);
                await res.end('wrong OTP');
                return;
            }
            // await res.status(200).send("validate user")

        }
        else {
            await res.status(401);
            await res.end("user not exist");
            return;
        }
    }
    catch (err) {
        console.log("catch=" + err)
        await res.status(500).send(err);
    }
})

loginRouter.post("/signIn", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const userReferenceSignup = doc(db, "signin", email); try {
            const { email, password } = req.body;
            const userReferenceSignup = doc(db, "signin", email);
            const signinDoc = await getDoc(userReferenceSignup);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...

                    res.status(200).json({ firebase: user, data: signinDoc.data() });
                    res.end();
                    return;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    res.status(errorCode).json({ error: errorMessage });
                    res.end();
                    return;
                });
        } catch (error) {
            res.status(500).json({ error: error });
            res.end();
            return;
        }
        const signinDoc = await getDoc(userReferenceSignup);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...

                res.status(200).json({ firebase: user, data: signinDoc.data() });
                res.end();
                return;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                res.status(errorCode).json({ error: errorMessage });
                res.end();
                return;
            });
    } catch (error) {
        res.status(500).json({ error: error });
        res.end();
        return;
    }
})

export { loginRouter };














//testing code
// db.collection("signup").doc(email).update({password:password,OTP: otp,Time:time});

            // let mailResponce=await mail.sendEmail(email,"otp for signup",String(otp))
            // console.log(mailResponce)
            // if(mailResponce=="No recipients defined"){
            //     await res.status(553).send('mail doesn\'t exist');
            // }
            // else{
            //     console.log("else")


 // const docRef = db.collection('signup').doc(email);
            // await docRef.set({
            // email: email,
            // password: password,
            // OTP: otp,
            // Time:time
            // });

            // const express = require("express");
// const bodyParser = require("body-parser");
// const loginRouter = express.Router();
// const db=require('./firebaseCred').db
// const auth=require('./firebaseCred').auth
// const mail=require('./sendEmail');
// const { getAuth } = require("firebase/auth");
// console.log(db)