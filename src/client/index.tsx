import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from '~/renderer/store';
import { IAppState } from '~/interfaces';
import App from '~/renderer/components/App';

declare const window: {
  __APP_STATE__: IAppState;
};

hydrate((
  <StoreProvider data={window.__APP_STATE__}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
), document.getElementById('app'));
