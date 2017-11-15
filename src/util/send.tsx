import * as React from 'react';
import * as nodeMailer from 'nodemailer';
import * as EmailTemplate from '@schau-recycling/email-template';

import { toJson } from './to-json';
import { inky } from './inky';
import { htmlTemplate } from './html-template';
import { validator } from './validator';

export async function send(body: string): Promise<nodeMailer.SentMessageInfo> {
  const data = toJson(body);
  const required = ['name', 'message'];
  const valid = validator(data, required);
  if (!valid) {
    return Promise.reject(
      new Error('[Data Validation]: Required fields not present')
    );
  }

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dustinschau+website@gmail.com',
      pass: process.env['GMAIL_PASSWORD']
    }
  });

  const html = await htmlTemplate(EmailTemplate, data);
  const options = {
    from: `"${data.name}" <${data.email || 'schauts@gmail.com'}>`,
    to: 'schauts@gmail.com',
    subject: data.subject || 'Hello from schaurecycling.com',
    html
  };

  return (await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  })) as nodeMailer.SentMessageInfo;
}
