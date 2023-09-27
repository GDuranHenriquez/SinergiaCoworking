const nodemailer = require('nodemailer');
require('dotenv').config();


const {MAIL, ADDRESS_MAIL} = process.env

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: ADDRESS_MAIL,
    pass: MAIL
  }
});

transporter.verify().then(() => {
  console.log('Ready for send emails')
});

async function sendMailLogin(name, lastName,emailUser){
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "🎉 WellNest clinic session start 🎉", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hello ${name} ${lastName}, Welcome back to Wellnest Clinic</b>`, // html body
  });
}

async function sendMailNewUser(name, lastName,emailUser){
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "🎉 Welcome to WellNest Clinic! 🎉", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hello ${name} ${lastName}, Welcome to Wellnest Clinic</b>`, // html body
  });
}

async function sendMailAppointment(name, lastName,emailUser, doctorName, Speciality, date){
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "You have a date! 👀🏥", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hello ${name} ${lastName}, we hope you having a good day, you have an appointment with ${doctorName}  ${Speciality} Specialist on ${date}, don't forget be here 15 min before ⏰ </b>`, // html body
  });
}

async function sendBillPharmacyToUser(name, emailUser, amount, price, sale, product){
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: `Hi ${name}! this is your bill! 👀🏥`, // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>amount : ${amount}</br>
               price : ${price} </br>
               sale : ${sale} </br>
               product : ${product}</b>`, // html body
  });
}

module.exports = {sendMailLogin, sendMailNewUser, sendMailAppointment, sendBillPharmacyToUser}