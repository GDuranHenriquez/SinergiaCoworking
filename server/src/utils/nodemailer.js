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
    from: `Sinergia Cowork <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "🎉 WellNest clinic session start 🎉", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hello ${name} ${lastName}, Welcome back to Wellnest Clinic</b>`, // html body
  });
}

async function sendMailNewUser(name, emailUser){
  const info = await transporter.sendMail({
    from: `Sinergia Cowork <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "🎉 Welcome to Sinergia Cowork! 🎉", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hola ${name}, Bienvenido a Sinergia Cowork</b>`, // html body
  });
}

async function sendMailAppointment(name, lastName,emailUser, doctorName, Speciality, date){
  const info = await transporter.sendMail({
    from: `Sinergia Cowork <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "You have a date! 👀🏥", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hello ${name} ${lastName}, we hope you having a good day, you have an appointment with ${doctorName}  ${Speciality} Specialist on ${date}, don't forget be here 15 min before ⏰ </b>`, // html body
  });
}

async function sendRentSpaceToUser(emailUser, name, typeSpace, price, cantSpace, direction ){
  const info = await transporter.sendMail({
    from: `Sinergia Cowork <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: `Hola ${name}! esta es la información de tu reserva! 👀🏥`, // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Tipo de espacio : ${typeSpace}</br>
               Total cancelado : ${price} </br>
               Cantidad de espacios : ${cantSpace} </br>
               Dirección : ${direction}</b></br>
               </br>
               </br>
               <b>Gracias por preferirnos.</b>`, // html body
  });
}

module.exports = {sendMailLogin, sendMailNewUser, sendMailAppointment, sendRentSpaceToUser}