import * as React from 'react';

import { IAppState} from '~/interfaces';  

interface Props {
  scripts?: string[];
  state?: IAppState;
  helmetContext?: any;
  styleElement?: any;
  appState?: any;
  children?: any;
}

export const Html = ({ scripts, state, helmetContext, styleElement, children }: Props) => {
  const { helmet } = helmetContext;

  const appState = JSON.stringify(state || {});

  return (
    <html lang="pl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {styleElement}
        <script type="text/javascript" dangerouslySetInnerHTML={{__html: `window.__APP_STATE__=${appState}`}} />
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
