const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let tsetAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"shareKargo" <shareKargo@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
