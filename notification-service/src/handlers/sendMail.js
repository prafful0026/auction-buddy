import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
async function sendMail(event, context) {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: "prafful0026@gmail.com",
    subject: "Nodemailer Project",
    text: "Hi from your nodemailer project",
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const handler = sendMail;
