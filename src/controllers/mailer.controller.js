import MailerService from "../services/mailer.service.js";

const MailerController = {
  async sendWelcomeEmail(req, res) {
    const { email, name } = req.body;
    const subject = "Welcome to Our Service";
    const text = `Hello ${name}, welcome to our service!`;
    const html = `<p>Hello <strong>${name}</strong>, welcome to our service!</p>`;

    try {
      await MailerService.sendMail(email, subject, text, html);
      res.status(200).json({ message: "Welcome email sent successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to send welcome email",
        error: error.message,
      });
    }
  },
};

export default MailerController;
