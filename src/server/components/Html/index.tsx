import * as React from 'react';

import { IAppState } from '~/interfaces';

interface Props {
  scripts?: string[];
  state?: IAppState;
  styleElement?: any;
  children?: any;
}

export const Html = ({ scripts, state, styleElement, children }: Props) => {
  const appState = JSON.stringify(state || {});

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="a, b, c" />
        <meta name="description" content="..." />
        <meta name="author" content="..." />
        <meta name="og:title" property="og:title" content="..." />
        <meta name="og:description" property="og:description" content="..." />
        <meta name="og:image" property="og:image" content="..." />
        <meta property="og:url" content="..." />
        <meta name="robots" content="index, follow" />
        <title>react-ssr</title>
        {styleElement}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__APP_STATE__=${appState}` }} />
      </head>
      <body>
        <noscript>You need to enable JavaScript!</noscript>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map(r => `/static/${r}`).map(src => (
          <script key={src} src={src} type="text/javascript" async />
        ))}
      </body>
    </html>
  );
}
