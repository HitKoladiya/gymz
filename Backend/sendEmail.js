import nodemailer from "nodemailer"
import * as dotenv from 'dotenv' 
dotenv.config()



async function sendEmail(email,subject,data){
    // console.log("cred=",process.env.EMAIL+" "+process.env.EMAIL_PASSWORD);

    //test account
    // let testAccount = await nodemailer.createTestAccount();

    // let mailTransporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: testAccount.user, // generated ethereal user
    //       pass: testAccount.pass, // generated ethereal password
    //     },
    //   });
      
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    let mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text:data,
    };

    let res;
    await mailTransporter.sendMail(mailDetails,async function(err, data) {
            if (err) {
                console.log("error:",err)
                res=await"No recipients defined";
            } else {
                console.log("Email sent successfully");
                res=await"Email sent successfully";
            }
            // console.log("res==",res);
            // return await res;
        })
    // console.log("res=",res);
    // return await res;
}

// console.log("final ans=",sendEmail("koladiyahit44@gmail.com","test","hii hit"))
export {sendEmail};