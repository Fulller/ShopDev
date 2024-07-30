// import transporter from "../configs/aws.ses.config.js";
import transporter from "../configs/gmail.config.js";
import TemplateService from "./template.service.js";
import createHttpError from "http-errors";
import { replaceHTMLTemplate } from "../utils/index.js";

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
  async sendMailVerifySignUp(email, verify_link) {
    const template = await TemplateService.get({ tem_id: 2 });
    if (!template) {
      throw createHttpError(404, "Template is not exist");
    }
    const temHtml = replaceHTMLTemplate(template.tem_html, { verify_link });
    MailerService.sendMail(
      email,
      "Confirm sign up with Shop DEV",
      null,
      temHtml
    );
  },
};

export default MailerService;
