const nodemailer = require('nodemailer');

async function sendVerificationEmail(userEmail, verificationToken, name) {
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    service: 'Gmail',
    auth: {
      user: 'mayurbhargava026@gmail.com',
      pass: 'wohdgkvkfnewxrtx',
    },
  });

  const mailOptions = {
    from: 'mayurbhargava026@gmail.com',
    to: userEmail,
    subject: 'Blood Bank Management App',
    html: `<h1>Hi ${name},</h1>
            <p>You are just a step away from creating your account on Blood Bank Management System</p>
            <p>To veriy the mail please click on the below:-</p>
           <a style=" display: inline-block;
           text-decoration: none;
           color: #f44336;
           border: 1px solid #f44336;
           padding: 12px 34px;
           font-size: 13px;
           background: transparent;
           display: flex;
           justify-content: center;
           text-align:center;
           position: relative;
           cursor: pointer;" href="http://localhost:5000/verify?token=${verificationToken}"><h style="text-align:center">Verify Email</h></a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

module.exports = sendVerificationEmail;