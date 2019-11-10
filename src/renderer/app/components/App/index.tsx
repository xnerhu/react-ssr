import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Footer } from '../Footer';
import { RoutePage } from '~/renderer/components/RoutePage';

import { useStore } from '~/renderer/app/store';
import { Style } from '~/renderer/app/style';
import { StyledApp, Link, Nav, Container, DarkThemeIcon } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = observer(() => {
  const onThemeClick = React.useCallback(() => {
    store.darkTheme = !store.darkTheme;
  }, []);

  const store = useStore();

  return (
    <ThemeProvider theme={{ dark: store.darkTheme }}>
      <StyledApp>
        <GlobalStyle />
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <DarkThemeIcon onClick={onThemeClick} />
        </Nav>
        <Container >
          <Switch>
            <Route path="/about" component={RoutePage('About')} />
            <Route path="/" component={RoutePage('Home')} />
          </Switch>
        </Container>
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
});

export default hot(App);
