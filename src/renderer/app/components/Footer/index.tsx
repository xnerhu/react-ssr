import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { StyledFooter } from './style';

export const Footer = observer((props: any) => {
  const store = useStore();

  return (
    <StyledFooter>
      &copy; ...
      <div style={{ marginLeft: 'auto' }}>
        Dark theme is: <b>{store.darkTheme ? 'enabled' : 'disabled'}</b>
      </div>
    </StyledFooter>
  );
});
