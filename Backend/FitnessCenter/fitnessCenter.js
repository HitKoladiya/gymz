import bodyParser from "body-parser";
import express from "express";
import {
  ref,
  uploadBytes,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { auth, storage, db } from "../firebaseCred.js";
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  deleteField,
  arrayUnion
} from "firebase/firestore";
//router
const fitnessCenterRouter = express.Router();

fitnessCenterRouter.use(bodyParser.urlencoded({ extended: true }));
fitnessCenterRouter.use(bodyParser.json());

fitnessCenterRouter.post("/oneFitnessCenterInfo", async (req, res) => {
  const { email, name } = req.body;
  console.log(email + " " + name);
  const fitnessCenterRef = doc(db, "fitnessCenter", `${email}+${name}`);
  let fitnessCenterDataRef = await getDoc(fitnessCenterRef);
  if (fitnessCenterDataRef.exists()) {
    res.status(200);
    res.end(JSON.stringify(fitnessCenterDataRef.data()));
    return;
  } else {
    res.status(404);
    res.end("fitnessCenter not found");
    return;
  }
});

fitnessCenterRouter.post("/allFitnessCenterInfo", async (req, res) => {
  const { city } = req.body;
  console.log(city);

  let fitnessCenterQuery = query(
    collection(db, "fitnessCenter"),
    where("City", "==", city)
  );

  let allFitnessCenterDataRef = await getDocs(fitnessCenterQuery);

  let allFitnessCenterData = [];
  allFitnessCenterDataRef.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    allFitnessCenterData.push(doc.data());
  });

  if (allFitnessCenterData.length > 0) {
    res.status(200);
    res.end(JSON.stringify(allFitnessCenterData));
    return;
  } else {
    res.status(404);
    res.end("fitnessCenters not found");
    return;
  }
});

fitnessCenterRouter.post("/subscribe", async (req, res) => {
  const {
    userEmail,
    userName,
    fitnessCenterEmail,
    fitnessCenterName,
    Date,
    Time,
  } = req.body;
    console.log(userEmail);
  const fitnessCenterRef = doc(
    db,
    "fitnessCenter",
    `${fitnessCenterEmail}+${fitnessCenterName}`
  );
  let fitnessDataRef = await getDoc(fitnessCenterRef);
  if (!fitnessDataRef.exists()) {
    res.status(404);
    res.end("fitnessCenter not found");
    return;
  }


  const userRef = doc(db, "signin", userEmail);
  let newDoc={
    userEmail: userEmail,
    userName: userName,
    fitnessCenterEmail: fitnessCenterEmail,
    fitnessCenterName: fitnessCenterName,
    Date: Date,
    Time: Time,
  }
  updateDoc(userRef, {
    subscribe: arrayUnion(newDoc)
});

//also save data in fitnessCenter collection
  updateDoc(fitnessCenterRef, {
    subscribe: arrayUnion(newDoc)
  });

  res.status(200);
  res.end("subscribe success");
  return;
});

fitnessCenterRouter.post("/mysubscribe", async (req, res) => {
    const {fitnessCenterEmail, fitnessCenterName} = req.body;
    console.log(fitnessCenterEmail + " " + fitnessCenterName);
    const fitnessCenterRef = doc(db, "fitnessCenter", `${fitnessCenterEmail}+${fitnessCenterName}`);
    let fitnessCenterDataRef = await getDoc(fitnessCenterRef);
    if (fitnessCenterDataRef.exists()) {
        res.status(200);
        res.end(JSON.stringify(fitnessCenterDataRef.data().subscribe));
        return;
    } else {
        res.status(404);
        res.end("fitnessCenter not found");
        return;
    }
});
//     const querySnapshot = await getDocs(q1);
//     let allSubscribeData = [];
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         allSubscribeData.push(doc.data());
//         }
//     );
//     if (allSubscribeData.length > 0) {
//         res.status(200);
//         res.end(JSON.stringify(allSubscribeData));
//         return;
//     }
//     else {
//         res.status(404);
//         res.end("subscribe not found");
//         return;
//     }
// })

export { fitnessCenterRouter };
