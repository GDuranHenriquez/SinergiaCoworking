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

async function sendRentSpaceToUser(emailUser, name, typeOffice, officeName, date, purchaseDate, price, amount, unitPrice, address ){
  const formatedDate = new Date(date).toLocaleDateString("es-ES", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
  const foramtedPurcahseDate = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeStyle: 'long'}).format(new Date(purchaseDate))
  let htmlBody = `<!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
          }
          .header {
            width: 100%;
              background-color: #007BFF;
              color: #fff;
              text-align: center;
              padding: 20px;
          }
          .reservation-details {
              width: 100%;
              border: 1px solid #ccc;
              padding: 20px;
              margin-top: 20px;
              margin-bottom: 20px;
          }
          .receipt {
              border: 1px solid #ccc;
              padding: 20px;
              margin-top: 20px;
          }
          .hi p {
            font-size: 16px;
            color: #555;
          }
  
          .invoice {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
          }
  
          .invoice h1 {
              font-size: 24px;
              color: #333;
          }
  
          .invoice p {
              font-size: 16px;
              color: #555;
          }
  
          .invoice .invoice-details {
              margin-top: 20px;
              padding: 10px;
              background-color: #fff;
              border: 1px solid #ddd;
          }
  
          .invoice .invoice-details table {
              width: 100%;
              border-collapse: collapse;
          }
  
          .invoice .invoice-details th,
          .invoice .invoice-details td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
          }
  
          .invoice .invoice-details th {
              background-color: #f4f4f4;
          }
  
          .invoice .total {
              margin-top: 20px;
              padding: 10px;
              background-color: #fff;
              border: 1px solid #ddd;
              text-align: right;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Notificación de Reserva</h1>
          </div>
          <div class="reservation-details">
              <h2>Detalles de la Reserva</h2>
              <p><strong>Oficina Reservada:</strong> ${officeName}</p>
              <p><strong>Tipo de oficina:</strong> ${typeOffice}</p>
              <p><strong>Fecha de Reserva:</strong> ${formatedDate}</p>
              <p><strong>Ubicación:</strong> ${address}</p>
          </div>

        <div class="invoice">
            <h1>Detalle de Reserva</h1>
            <p>Fecha: ${foramtedPurcahseDate}</p>
            <div class="invoice-details">
                <table>
                    <tr>
                        <th>Office</th>
                        <th>Amount</th>
                        <th>Unit price</th>
                    </tr>
                    <tr>
                      <td>${officeName}</td>
                      <td>${amount}</td>
                      <td>$${unitPrice}</td>
                    </tr>
                </table>
              </div>
      
              <div class="total">
                  <p><b>Total: $${price}</b></p>
              </div>
          </div>
          <p>¡Gracias por elegir nuestro servicio de reserva de oficinas y espacios de coworking! Estamos emocionados de tenerte como nuestro cliente.</p>
          <p>Si tienes alguna pregunta o necesitas realizar cambios en tu reserva, no dudes en contactarnos.</p>
          <p>Esperamos verte pronto en nuestras instalaciones. ¡Que tengas un excelente día!</p>
          
      </div>
  </body>
  </html>`
  const info = await transporter.sendMail({
    from: `Sinergia Cowork <${ADDRESS_MAIL}>`,
    to: emailUser,
    subject: `Hola ${name}! esta es la información de tu reserva! `,
    html: htmlBody
  });
}

module.exports = {sendMailLogin, sendMailNewUser, sendMailAppointment, sendRentSpaceToUser}