import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderStatic } from 'glamor/server';
import * as inlineCss from 'inline-css';

import { inky } from './inky';
import { FOUNDATION_STYLE } from '../style';

const compose = (...args) => {
  return args.reduce((value, fn) => {
    value = typeof fn === 'function' ? fn(value) : fn;
    return value;
  }, undefined);
};

export const inline = template => inlineCss(template, { url: ' ' });
export const render = (Component, props = {}) => () =>
  renderStatic(() => renderToStaticMarkup(<Component {...props} />));

export const htmlTemplate = async (Component, props) => {
  return compose(
    render(Component, props),
    ({ css, html }) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width"/>
  <style>
${FOUNDATION_STYLE}
  </style>
  ${css && `<style>${css}</style>`}
</head>
<body>
  ${inky(html)}
</body>
</html>
    `,
    await inline
  );
};
