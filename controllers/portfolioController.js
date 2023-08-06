
const nodemailer = require('nodemailer');
const mailchimp = require('@mailchimp/mailchimp_marketing');


 mailchimp.setConfig({
   apiKey: process.env.API_MAILCHIMP
 });



 const transporter = nodemailer.createTransport({
  service: 'GMail', // Replace with your email service
  auth: {
    user: 'pervaizadina@gmail.com', // Replace with your email address
    pass: 'rmgmpngfgamgnaov' // Replace with your email password
  }
});



const sendEmailController = (req, res) =>{

    try{
        const {name, email, msg}=req.body
        //validation
        if(!name|| !email || !msg){
          return res.status(500).send({
            success:false,
            message:'Please provide all fields'
          })
        }

        // Send an HTML email
        const mailOptions = {
          from: 'adina19606@gmail.com',
          to: 'pervaizadina@gmail.com',
          subject: 'This is a test email',
          html: `
            <p>Hello,</p>
            <ul>
            <li><p>Name: ${name}</p></li>
            <li><p>Email: ${email}</p></li>
            <li><p>Message: ${msg}</p></li>
            </ul>
          `
        };


        //email matter
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
        
        return res.status(200).send({
            success:true,
            message:'Your message sent successfully',    
        })

    }catch(error){
      console.log(error)
      return res.status(500).send({
        success:false,
        message:'Send Email API Error',
        error
      })

    }

}
module.exports = {sendEmailController}