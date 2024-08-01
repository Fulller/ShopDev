import MailerService from "../services/mailer.service.js";

const MailerController = {
  async sendWelcomeEmail(req, res) {
    const { email, name } = req.body;
    const subject = "Welcome to Our Service";
    const text = `Hello ${name}, welcome to our service!`;
    const html = `<p>Hello <strong>${name}</strong>, welcome to our service!</p>`;

    return res.fly({
      status: 200,
      message: "Welcome email sent successfully",
      metadata: await MailerService.sendMail(email, subject, text, html),
    });
  },
};

export default MailerController;
