import transporter from "../configs/aws.ses.config.js";

const MailerService = {
  async sendMail(to, subject, text, html) {
    const mailOptions = {
      from: "brokenpromiseboy@gmail.com", // Sender address
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
      html, // HTML body
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  },
};

export default MailerService;
