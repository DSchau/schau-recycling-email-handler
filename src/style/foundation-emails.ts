import * as fs from 'fs';
import * as path from 'path';

export const FOUNDATION_STYLE = fs.readFileSync(
  path.resolve('node_modules/foundation-emails/dist/foundation-emails.css'),
  'utf8'
);
