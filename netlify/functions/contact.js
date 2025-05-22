const nodemailer = require("nodemailer");

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "https://www.hozeproject.com", // güvenlik için sadece siteni aç
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const { name, email, demoUrl, contactNumber, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "aziz.giorgis@gmail.com, burak@hozeproject.com, ismail@hozeproject.com",
    subject: `${name} adlı kişiden yeni demo gönderisi`,
    text: `
Ad: ${name}
E-posta: ${email}
Telefon: ${contactNumber}
Demo Linki: ${demoUrl}
Mesaj: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "E-posta başarıyla gönderildi." }),
    };
  } catch (error) {
    console.error("E-posta Gönderim Hatası:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "E-posta gönderilemedi." }),
    };
  }
};
