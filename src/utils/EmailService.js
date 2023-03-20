const Logger = require("./Logger");
const logger = new Logger({ debug: true });
const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
        host: "smtp.porkbun.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.email,
            pass: process.env.email_pass,
        },
            
    });
  }

  async sendDonateThankYou(username, email) {
    var options = {
        from: process.env.email,
        to: email,
        subject: "Thank you for your donation!",
        text: `Dear ${username},
I would like to express my heartfelt gratitude for your recent donation to Chiyeko. Your contribution means a lot to us and will go a long way in helping us cover the costs of our server and other essential expenses.
        
It is thanks to generous individuals like yourself that we are able to continue working towards our goal of providing an innovative and effective solution to our users. We cannot overstate the importance of your support, and we are truly grateful for your generosity.
        
As a token of our appreciation, we would like to offer you a list of exclusive perks for being a supporter of Chiyeko. Simply type in the supporter command to access the list of perks that we have in store for you.
        
Once again, thank you for your invaluable support. Your contribution will help us to continue serving our community and make a real difference in the world. We are honored to have you as a supporter, and we hope to continue working together towards our shared vision.
        
Sincerely, Kiyo`,
    };
    
    this.transporter.sendMail(options, (err, info) => {
        if (err) {
            logger.log(err, "Email Service");
        } else {
            console.log(info);
        }
    });
  }
}

module.exports = EmailService;