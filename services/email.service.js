import nodemailer from "nodemailer";

export async function sendMailFunc({ from, to, subject, text, html }) {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj",
    },
  });

  const mailOptions = {
    from: `nabaraj <${from}>`,
    to,
    subject,
    text,
    html,
  };

  await transpoter.sendMail(mailOptions);
}
