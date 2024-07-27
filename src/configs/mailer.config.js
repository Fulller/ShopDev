import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import env from "./env.config.js";

const ses = new aws.SES(env.cloud.ses);

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export default transporter;
