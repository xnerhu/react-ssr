import * as React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

class Store {
  @observable
  public darkTheme = false;

  constructor(test?: any) {
    this.darkTheme = test;
  }
}

export const createStore = (data: any) => () => {
  return new Store(data);
}

const StoreContext = React.createContext<Store>(null)

export const StoreProvider = ({ data, children }: { data?: any, children: any }) => {
  const store = useLocalStore(createStore(data));
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store
}
