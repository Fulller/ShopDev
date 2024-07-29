import nodemailer from "nodemailer";
import env from "./env.config.js";

const transporter = nodemailer.createTransport(env.cloud.mailer);

export default transporter;
