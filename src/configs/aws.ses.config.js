import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import env from "./env.config.js";

const ses = new aws.SES(env.cloud.ses);
<<<<<<< HEAD

// create Nodemailer SES transporter
=======
// Test comman
>>>>>>> b69207e (Initial commit)
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export default transporter;
