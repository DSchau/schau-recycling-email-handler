import * as nodeMailer from 'nodemailer';
import * as config from 'config';

import { toJson } from './to-json';
import { template as html } from './template';
import { validator } from './validator';

export function send(body: string): Promise<string> {
  const data = toJson(body);
  const required = [
    'name',
    'message'
  ];
  const valid = validator(data, ['name', 'message']);
  if ( !valid ) {
    return Promise.reject(new Error('[Data Validation]: Required fields not present'));
  }

  return new Promise((resolve, reject) => {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: config.get('gmail')
    });

    const options = {
      from: `"${data.name}" <${data.email || 'dustinschau@gmail.com'}>`,
      to: 'dustinschau+website@gmail.com',
      subject: `${data.subject || 'Hello from dustinschau.com'}`,
      html: html(data)
    };

    transporter.sendMail(options, (error, info) => {
      if ( error ) {
        return reject(error);
      }
      resolve(info);
    });
  });
}
