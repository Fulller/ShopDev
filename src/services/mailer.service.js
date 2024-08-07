// import transporter from "../configs/aws.ses.config.js";
import transporter from "../configs/gmail.config.js";
import TemplateService from "./template.service.js";
import { replaceHTMLTemplate } from "../utils/index.js";

const MailerService = {
  async sendMail(to, subject, text, html) {
    const mailOptions = {
      to,
      subject,
      text,
      html,
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
    const template = await TemplateService.get({ tem_id: 1 });
    const temHtml = replaceHTMLTemplate(template.tem_html, { verify_link });
    MailerService.sendMail(
      email,
      "Confirm sign up with Shop DEV",
      null,
      temHtml
    );
  },
  async sendMailWelcome(email, default_password) {
    const template = await TemplateService.get({ tem_id: 2 });
    const temHtml = replaceHTMLTemplate(template.tem_html, {
      default_password,
    });
    MailerService.sendMail(email, "Welcome to our service", null, temHtml);
  },
  async sendMailForgotPaswordOTP(email, forgot_password_otp) {
    const template = await TemplateService.get({ tem_id: 3 });
    const temHtml = replaceHTMLTemplate(template.tem_html, {
      forgot_password_otp,
    });
    MailerService.sendMail(email, "Forgot password", null, temHtml);
  },
};

export default MailerService;
