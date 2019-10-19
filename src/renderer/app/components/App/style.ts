import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { h4, centerIcon } from '~/renderer/mixins';
import { icons, transparency } from '~/renderer/constants';
import { ITheme } from '~/interfaces';

export const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ${({ theme }: { theme: ITheme }) => css`
    background-color: ${theme.dark ? '#212121' : '#fff'};
    color ${theme.dark ? '#fff' : '#000'};
  `}
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ theme }: { theme: ITheme }) => css`
    background-color: ${theme.dark ? '#424242' : '#f5f5f5'};
  `}
`;

export const Link = styled(RouterLink)`
  padding: 12px 8px;
  font-size: 18px;
  text-decoration: none;

  ${({ theme }: { theme: ITheme }) => css`
    color: ${theme.dark ? '#fff' : '#000'};
  `}

  &:not(:first-child) {
    margin-left: 8px;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 16px;
  overflow-y: auto;
`;

export const PageTitle = styled.div`
  padding-bottom: 12px;
  ${h4()};
`;

export const DarkThemeIcon = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-image: url(${icons.darkMode});
  opacity: ${transparency.icons.inactive};
  right: 16px;
  position: absolute;
  ${centerIcon(24)};

  ${({ theme }: { theme: ITheme }) => css`
    filter: ${theme.dark ? 'invert(100%)' : 'unset'};
  `}
`;
