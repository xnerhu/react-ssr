import { Router } from 'express';
import { resolve } from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';

import { StoreProvider } from '~/renderer/app/store';
import { IAppState } from '~/interfaces';
import { Html } from '../components/HTML';
import App from '~/renderer/app/components/App';

const router = Router();

const scripts = ['app.js', 'vendor.chunk.js'];

const statsFile = resolve('./build/client/static/loadable-stats.json')

router.get('*', (req, res, next) => {
  const sheet = new ServerStyleSheet();
  const routerContext = {};
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["app"] });

  const appState: IAppState = { theme: { dark: true } }

  const Content = extractor.collectChunks(
    <StaticRouter location={req.baseUrl} context={routerContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <StoreProvider data={appState}>
          <App />
        </StoreProvider>
      </StyleSheetManager>
    </StaticRouter>
  );

  const html = renderToString(Content);

  const str = renderToString(
    <Html scripts={extractor.getScriptElements()} styleElement={sheet.getStyleElement()} state={appState}>
      {html}
    </Html>
  );

  res.send(`<!doctype html>${str}`);

  next();
});

export default router;
