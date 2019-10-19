import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

// import store from '~/renderer/store';
import { Home } from '../Home';
import { About } from '../About';
import { Footer } from '../Footer';

import { Style } from '~/renderer/style';
import { StyledApp, Link, Nav, Container, DarkThemeIcon } from './style';
import { useStore } from '~/renderer/store';

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
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
});

export default hot(App);
