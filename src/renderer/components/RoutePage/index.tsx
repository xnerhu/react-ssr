import * as React from 'react';
import loadable from '@loadable/component';

export const RoutePage = (path: string) => {
  return loadable(() => import(`~/renderer/app/components/${path}`), {
    fallback: (<div>loading</div>)
  });
}
