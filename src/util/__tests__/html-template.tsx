import * as React from 'react';
import { css } from 'glamor';
import { htmlTemplate, inline, render } from '../html-template';
import * as EmailTemplate from '@dschau/email-template';

const props = {
  email: 'dustinschau@gmail.com',
  message: 'Hello World',
  name: 'Sup boo'
};

const Component = () => {
  const styles = {
    container: css({
      backgroundColor: 'red'
    })
  };

  return (
    <div className={css({ backgroundColor: 'red' })}>
      <h1>Hello World</h1>
    </div>
  );
};

describe('inline', () => {
  test('it inlines style rules', async () => {
    const html = await inline(
      `<style>h1 { color: red; } </style><h1>i am red</h1>`
    );

    expect(html).toMatch(/color: red/);
  });

  test('it keeps absolute URLs absolute', async () => {
    const html = await inline(`<a href="https://google.com">google</a>`);

    expect(html).toMatch('https://google.com');
  });

  test('it keeps relative URLs relative', async () => {
    const html = await inline(`<a href="relative/link.html">relative</a>`);

    expect(html).toMatch('"relative/link.html');
  });

  test('it works with mailto links', async () => {
    const html = await inline(
      `<a href="mailto:dustinschau@gmail.com">hello</a>`
    );

    expect(html).toMatch(/mailto:dustinschau@gmail.com/);
  });

  test('it works with data attributes', async () => {
    const html = await inline(
      `<style>[data-header-element] { color: red; }</style><h1 data-header-element>hello world</h1>`
    );

    expect(html).toMatch(/color: red/);
  });
});

describe('render', () => {
  test('it returns an object with expected props', () => {
    expect(render(EmailTemplate, props)()).toEqual(
      expect.objectContaining({
        css: expect.any(String),
        html: expect.any(String),
        ids: expect.any(Array)
      })
    );
  });

  test('css is non-null', () => {
    const results = render(EmailTemplate, props)();

    expect(results.css).toBeDefined();
    expect(results.css.length).toBeGreaterThan(0);
  });
});

test('it allows usage of a function', async () => {
  expect(async () => await htmlTemplate(EmailTemplate, props)).not.toThrow();
});

test('it inlines CSS', async () => {
  const html = await htmlTemplate(EmailTemplate, props);

  expect(html.match(/style="/).length).toBeGreaterThan(0);
});
