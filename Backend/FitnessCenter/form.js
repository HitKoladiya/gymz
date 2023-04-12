import bodyParser from "body-parser";
import express from 'express';
import { ref, uploadBytes, deleteObject, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { auth, storage, db } from "../firebaseCred.js";
import multer from "multer";
import { collection, doc, setDoc, updateDoc, getDoc, deleteDoc, deleteField } from "firebase/firestore";

//router
const formRouter = express.Router();

//parsing data from frontend
// formRouter.use(bodyParser.json());
// formRouter.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));


formRouter.use(bodyParser.urlencoded({ extended: true }));
formRouter.use(bodyParser.json());

const centerFileSize = 1024 * 1024 * 5;//5 mb
const trainerFileSize = 1024 * 1024 * 5;
const MaxFileSize = 1024 * 1024 * 10;
//use multer for create array of files
var fitnessCenterupload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: { fileSize: MaxFileSize },
}).any();


//adding new fitness center
formRouter.post("/newFitnessCenter", (req, res, next) => {
    //convert files into array of buffer and also validate files
    fitnessCenterupload(req, res, (err) => {
        let totalFileSize = 0;
        for (let i in req.files) {
            totalFileSize += req.files[i]['size'];
        }
        if (totalFileSize >= centerFileSize) {
            console.log("file size is greater then 5 mb");
            res.status(404).send(JSON.stringify({ "message": 'Upload failed due to files size' }));
            return;
        }
        else if (err instanceof multer.MulterError) {
            console.log("multer error");
            res.status(404).send(JSON.stringify({ "error": `${err} Upload failed due to multer error` }));
            return;
        } else if (err) {
            console.log("unknown error");
            res.status(404).send(JSON.stringify({ "message": `${err} Upload failed due to unknown error` }));
            return;
        }
        console.log(totalFileSize / (1024 * 1024), " MB");

        // Everything went fine.
        next();
    });
}
    , async (req, res) => {
        // form validation baki

        // console.log(req.body['email']);
        console.log("body=", req.body)
        console.log("files=", req.files)

        const { email, name, mobile, address, country, state, city, openingTime, closingTime, gymPricePerDay, gymPricePerMonth, gymDescription, yogaPricePerDay, yogaPricePerMonth, yogaDescription, online, offline } = req.body;
        let fitnessCenterType = req.body.fitnessCenterType;
        let daysSelected = req.body.daysSelected;
        // fitnessCenterType.remove("gymz");
        // daysSelected.delete("gymz");
        delete fitnessCenterType["gymz"];
        delete daysSelected["gymz"];

        console.log(1);

        //check none of field is undefined
        if (!email || !name || !mobile || !mobile || !address || !country || !state || !city || !openingTime || !closingTime || !daysSelected || !fitnessCenterType) {
            console.log("Bad request");
            res.status(404).send(JSON.stringify({ "message": 'Bad request' }));
            res.end();
            return;
        }

        //get user data
        const userRef = doc(db, "signin", email);
        let userDataRef = await getDoc(userRef);
        if (!userDataRef.exists()) {
            res.status(404);
            res.end(JSON.stringify({ "message": 'user not found' }));
            return;
        }
        let userData = userDataRef.data();
        console.log(userData);

        const newFitnessCenterRef = collection(db, "fitnessCenter");
            await setDoc(doc(newFitnessCenterRef, `${email}+${name}`), {
                email: email,
            });

        if (fitnessCenterType.includes("yoga")) {
            if (!yogaPricePerDay || !yogaPricePerMonth || !yogaDescription) {
                console.log("Bad request");
                res.status(404).send(JSON.stringify({ "message": 'Bad request' }));
                res.end();
                return;
            }
            let yogaPhotos = {};

            let hasYoga = true;
            let yogasName;

            if (!userData['yogasName']) {
                yogasName = {};
                yogasName[name] = false;
            }
            else {
                if (!(userData['yogasName'][name])) {
                    yogasName = userData['yogasName'];
                    yogasName[name] = false;
                }
            }

            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i].fieldname == "yogaphotos") {
                    const storageRef = ref(storage, `fitnessCenter/${email}/${name}/${req.files[i].fieldname}/${req.files[i].originalname}`);

                    const metadata = {
                        contentType: req.files[i].mimetype,
                    }

                    const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metadata);
                    const url = await getDownloadURL(snapshot.ref);
                    yogaPhotos[req.files[i].originalname] =url;
                    console.log(url);
                }
            }
            console.log("yogaPhotos",yogaPhotos);
            // const fitnessCenter = collection(db, "fitnessCenter");
            // const userRef = doc(db, "fitnessCenter", `${email}+${name}`);
            // await setDoc(doc(fitnessCenter, `${email}+${name}`), {
            //     yogaDescription: yogaDescription,
            //     yogaPricePerDay: yogaPricePerDay,
            //     yogaPricePerMonth: yogaPricePerMonth,
            //     yogaPhotos: yogaPhotos
            // })
            const fitnessCenter = doc(db, "fitnessCenter", `${email}+${name}`);

            //check avaibilty of update
            
            await updateDoc(fitnessCenter, {
                yogaDescription: yogaDescription,
                yogaPricePerDay: yogaPricePerDay,
                yogaPricePerMonth: yogaPricePerMonth,
                yogaPhotos: yogaPhotos
            });

            await updateDoc(userRef, {
                hasYoga: hasYoga,
                yogasName: yogasName
            });
        }

        if (fitnessCenterType.includes("gym")) {
            if (!gymPricePerDay || !gymPricePerMonth || !gymDescription) {
                console.log("Bad request");
                res.status(404).send(JSON.stringify({ "message": 'Bad request' }));
                res.end();
                return;
            }
            let gymPhotos = {};

            let hasGym = true
            let gymsName;

            console.log(userData['gymsName']);
            if (!userData['gymsName']) {
                gymsName = {};
                gymsName[name] = false;
            }
            else {
                if (!userData['gymsName'][name]) {
                    gymsName = userData['gymsName'];
                    gymsName[name] = false;
                }
            }

            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i].fieldname == "gymphotos") {
                    const storageRef = ref(storage, `fitnessCenter/${email}/${name}/${req.files[i].fieldname}/${req.files[i].originalname}`);

                    const metadata = {
                        contentType: req.files[i].mimetype,
                    }

                    const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metadata);

                    //get the link and push into gymPhotos
                    const downloadURL = await getDownloadURL(snapshot.ref)
                    gymPhotos[req.files[i].originalname] = downloadURL
                    console.log(downloadURL);
                }
            }

            console.log("gymPhotos=", gymPhotos);
            // const fitnessCenter =collection(db, "fitnessCenter");
            // await setDoc(doc(fitnessCenter, `${email}+${name}`), {
            //     gymDescription: gymDescription,
            //     gymPhotos: gymPhotos,
            //     gymPricePerDay: gymPricePerDay,
            //     gymPricePerMonth: gymPricePerMonth,
            // })
            const fitnessCenter = doc(db, "fitnessCenter", `${email}+${name}`);
            await updateDoc(fitnessCenter, {
                gymDescription: gymDescription,
                gymPhotos: gymPhotos,
                gymPricePerDay: gymPricePerDay,
                gymPricePerMonth: gymPricePerMonth,
            });


            console.log("gymsName=", gymsName);
            await updateDoc(userRef, {
                hasGym: hasGym,
                gymsName: gymsName
            });

        }

        let allCenter = userData.allCenter ? userData.allCenter : {};
        allCenter[name] = false;
        await updateDoc(userRef, {
            allCenter: allCenter,
        });

        //not needed
        // const pendingFitnessCenter = collection(db, "pendingFitnessCenter");
        // await setDoc(doc(pendingFitnessCenter, `${email}+${name}`), {
        //     email: email,
        //     verified: false,
        //     reject: false,
        //     name: name,
        // })

        let logo;
        for (let i = 0; i < req.files.length; i++) {
            if (req.files[i].fieldname == "logo") {
                const storageRef = ref(storage, `fitnessCenter/${email}/${name}/${req.files[i].fieldname}/${req.files[i].originalname}`);

                const metadata = {
                    contentType: req.files[i].mimetype,
                }

                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metadata);

                //get the link and push into gymPhotos
                const downloadURL = await getDownloadURL(snapshot.ref)
                logo = downloadURL
                console.log(downloadURL);
            }
        }

        console.log("before:");
        const userRef1 = doc(db, "fitnessCenter", `${email}+${name}`);
            let userDataRef1 = await getDoc(userRef1);
            console.log("userDataRef=", userDataRef1.data());

        //add new center on fitnessCenter collection with all necessary data
        const fitnessCenter = doc(db, "fitnessCenter", `${email}+${name}`);
            await updateDoc(fitnessCenter, {
            email: email,
            Name: name,
            fitnessCenterType: fitnessCenterType,
            mobile: mobile,
            address: address,
            City: city,
            State: state,
            Country: country,
            daysSelected: daysSelected,
            openingTime: openingTime,
            closingTime: closingTime,
            varified: Boolean(false),
            reject: Boolean(false),
            activate: Boolean(false),
            logo: logo,
        });

        console.log("after:");
        const userRef2 = doc(db, "fitnessCenter", `${email}+${name}`);
            let userDataRef2 = await getDoc(userRef2);
            console.log("userDataRef=", userDataRef2.data());
            
        const userFitnessCenterRef = doc(db, "fitnessCenter", `${email}+${name}`);
        const userFitnessCenterData = await getDoc(userFitnessCenterRef);

        console.log(userFitnessCenterData.data());

        //send fitnessCenter data
        res.status(200);
        res.end(JSON.stringify({ "data": userFitnessCenterData.data() }));
        return;

        // } catch (err) {
        //     await res.status(500);
        //     await res.send(JSON.stringify('internal server error'));
        //     await res.end();
        //     return;
        // }

    }
)

//delete fitnessCenter form
formRouter.post("/deleteFitnessCenter", async (req, res) => {
    const { email, fitnessCenterName } = req.body;
    const userRef = doc(db, "signin", email);
    const userDataRef = await getDoc(userRef);
    const userData = userDataRef.data();

    //update allCenter,gymsName,yogasName,hasGym,hasYoga feild from "signin" collection
    if (!userData.allCenter) {
        res.status(404).send(JSON.stringify({ "message": 'not found center for delete' }));
        res.end();
        return;
    }
    let allCenter = await userData.allCenter;
    delete allCenter[fitnessCenterName];
    console.log("allCenter=", allCenter);
    if (Object.keys(allCenter).length == 0) {
        console.log("allCenter is empty");
        await updateDoc(userRef, {
            allCenter: deleteField(),
            gymsName: deleteField(),
            yogasName: deleteField(),
            hasGym: deleteField(),
            hasYoga: deleteField()
        })
    }
    else {
        await updateDoc(userRef, {
            allCenter: allCenter,
        })
        if (userData.gymsName) {
            let gymsName = await userData.gymsName;
            delete gymsName[fitnessCenterName];
            console.log("gymsName=", gymsName);
            if (Object.keys(gymsName).length == 0) {
                let hasGym = await userData.hasGym
                hasGym = false;
                await updateDoc(userRef, {
                    hasGym: deleteField(),
                    gymsName: deleteField()
                })
            }
            else {
                await updateDoc(userRef, {
                    gymsName: gymsName
                })
            }
        }


        if (userData.yogasName) {
            let yogasName = await userData.yogasName;
            delete yogasName[fitnessCenterName];
            console.log("yogasName=", yogasName);
            if (Object.keys(yogasName).length == 0) {
                let hasYoga = await userData.hasYoga
                hasYoga = false;
                await updateDoc(userRef, {
                    hasYoga: hasYoga,
                    yogasName: deleteField()
                })
            }
            else {
                await updateDoc(userRef, {
                    yogasName: yogasName
                })
            }
        }
    }

    //delete full doc from "fitnessCeneter" collection
    deleteDoc(doc(db, "fitnessCenter", `${email}+${fitnessCenterName}`));

    //delete full doc from "pendingFitnessCenter" collection
    deleteDoc(doc(db, "pendingFitnessCenter", `${email}+${fitnessCenterName}`));

    let directoryRef = ref(storage, `fitnessCenter/${email}/${fitnessCenterName}/yogaphotos`);
    listAll(directoryRef)
        .then((res) => {
            console.log("res:", res);
            res.items.forEach((itemRef) => {
                console.log(itemRef);
                deleteObject(itemRef);
            });
        }).catch((error) => {
            console.log(error);
        });

    directoryRef = ref(storage, `fitnessCenter/${email}/${fitnessCenterName}/gymphotos`);
    listAll(directoryRef)
        .then((res) => {
            console.log("res:", res);
            res.items.forEach((itemRef) => {
                console.log(itemRef);
                deleteObject(itemRef);
            });
        }).catch((error) => {
            console.log(error);
        });

    directoryRef = ref(storage, `fitnessCenter/${email}/${fitnessCenterName}/logo`);
    listAll(directoryRef)
        .then((res) => {
            console.log("res:", res);
            res.items.forEach((itemRef) => {
                console.log(itemRef);
                deleteObject(itemRef);
            });
        }).catch((error) => {
            console.log(error);
        });

    //send response
    res.status(200);
    res.end(JSON.stringify({ "message": "fitnessCenter deleted" }));
    return;
})


var trainerUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf" ||
            file.mimetype == "application/msword"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg .pdf and .word format allowed!"));
        }
    },
    limits: { fileSize: MaxFileSize },
}).any();


// fitnessCenter trainer form
formRouter.post("/registerAsTrainer", (req, res, next) => {
    //convert files into array of buffer and also validate files
    trainerUpload(req, res, (err) => {
        let totalFileSize = 0;
        for (let i in req.files) {
            totalFileSize += req.files[i]['size'];
        }
        if (totalFileSize >= trainerFileSize) {
            console.log("file size is greater then 5 mb");
            res.status(404).send(JSON.stringify({ "message": 'Upload failed due to files size' }));
            return;
        }
        else if (err instanceof multer.MulterError) {
            console.log("multer error");
            res.status(404).send(JSON.stringify({ "error": `${err} Upload failed due to multer error` }));
            return;
        } else if (err) {
            console.log("unknown error");
            res.status(404).send(JSON.stringify({ "message": `${err} Upload failed due to unknown error` }));
            return;
        }
        console.log(totalFileSize / (1024 * 1024), " MB");

        // Everything went fine.
        next();
    });
}
    , async (req, res) => {
        console.log(req.body)
        console.log(req.files);
        const{name,mobile,online,offline,address,country,state,city,openingTime,closingTime,daysSelected,fitnessCenterType,email,description,gymPricePerDay, gymPricePerMonth, yogaPricePerDay, yogaPricePerMonth}=req.body;

        //check none of field is undefined
        if (name == undefined || mobile == undefined || online == undefined || offline == undefined || address == undefined || country == undefined || state == undefined || city == undefined || openingTime == undefined || closingTime == undefined || daysSelected == undefined || fitnessCenterType == undefined || email == undefined || description == undefined) {
            res.status(404).send(JSON.stringify({ "message": 'Bad request' }));
            res.end();
            return;
        }

        let trainerRef=doc(db,"trainers",email);
        let trainerDataRef=await getDoc(trainerRef);
        if(!trainerData.exists()){
            res.status(404).send(JSON.stringify({ "message": 'user not found' }));
            res.end();
            return;
        }

        let trainerData=trainerDataRef.data();
        console.log(trainerData);

        let resume;
        if(fitnessCenterType.includes("gym")){
            if(gymPricePerDay==undefined || gymPricePerMonth==undefined){
                res.status(404).send(JSON.stringify({ "message": 'Bad request' }));
                res.end();
                return;
            }
            const storageRef = ref(storage, `trainer/${email}/${req.files[0].fieldname}/${req.files[0].originalname}`);

            const metadata = {
                contentType: req.files[0].mimetype,
            }

            const snapshot = await uploadBytesResumable(storageRef, req.files[0].buffer, metadata);
            const url = await getDownloadURL(snapshot.ref);
            resume= url;
        }




        res.end(JSON.stringify({"test":"test"}));


    })


export { formRouter };








//  //check if user has already register with name for gym
//  if ((userData['gymsName'].includes(name))) {

//     //if user has already register with name then remove element from fitnessCenterType
//     if (fitnessCenterType.includes('gym')) {
//         while (fitnessCenterType.includes("gym")) {
//             console.log("1");
//             let index = fitnessCenterType.indexOf("gym");
//             if (index > -1) { // only splice array when item is found
//                 fitnessCenterType.splice(index, 1);
//             }
//             console.log(fitnessCenterType);
//         }
//     }

//     //else remove that entry on firestore profile
//     else {
//         let index = userData['gymsName'].indexOf(name);
//         if (index > -1) { // only splice array when item is found
//             userData['gymsName'].splice(index, 1);
//             if (userData['gymsName'].length == 0) {
//                 await updateDoc(userRef, {
//                     hasGym: false
//                 });
//             }
//             await updateDoc(userRef, {
//                 gymsName: userData['gymsName']
//             });
//         }
//     }

// }

// //check if user has already register with name for yoga
// if ((userData['yogasName'].includes(name))) {

//     //if user has already register with name then remove element from fitnessCenterType
//     if (fitnessCenterType.includes('yoga')) {
//         while (fitnessCenterType.includes('yoga')) {
//             let index = fitnessCenterType.indexOf("yoga");
//             if (index > -1) { // only splice array when item is found
//                 fitnessCenterType.splice(index, 1);
//             }
//         }
//     }

//     //else remove that entry on firestore profile
//     else {
//         let index = userData['yogasName'].indexOf(name);
//         if (index > -1) { // only splice array when item is found
//             userData['yogasName'].splice(index, 1);
//             if (userData['yogasName'].length == 0) {
//                 await updateDoc(userRef, {
//                     hasYoga: false
//                 });
//             }
//             await updateDoc(userRef, {
//                 yogasName: userData['yogasName']
//             });
//         }
//     }
// }

// //if all entry are up to date then return
// if (fitnessCenterType.length == 0) {
//     res.status(409);
//     res.send(JSON.stringify('center already exist'));
//     res.end();
//     return;
// }




//  //if user does'nt send fitnessCenterType then delete that fitness center from database
//  if (!userData['yogasName'].includes(name) && !userData['gymsName'].includes(name)) {
//     const directoryRef = ref(storage, `fitnessCenter/${email}/${name}`);

//     //delete firebase storage
//     listAll(directoryRef)
//         .then((res) => {
//             res.items.forEach((itemRef) => {
//                 deleteObject(itemRef);
//             });
//         }).catch((error) => {
//             console.log(error);
//         });

//     //delete entity from fitnessCenter collection in firestore
//     await deleteDoc(doc(db, "fitnessCenter", `${email}+${name}`));
//     res.send(JSON.stringify("deleted"));
//     res.end();
//     return;
// }