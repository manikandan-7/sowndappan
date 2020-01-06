const nodemailer = require("nodemailer");
const { email_service } = require("../config/keys.config");
let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: email_service.user,
    pass: email_service.pass // generated ethereal password
  }
});
const generatMailInfo = require("../utils/email_service_content");

async function mail(payload, id, SERVICE_NO) {
  let emailContent = await generatMailInfo(payload, SERVICE_NO);
  let info = await transporter.sendMail({
    from: '"Let`s Go" <harincastle14@gmail.com>',
    to: "mvsomupushpa@gmail.com",
    subject: "Bus Ticket",
    text: "Thanks for travelling with us",
    html: emailContent
  });
  console.log("Message sent: %s", info.messageId);
}
module.exports = mail;
