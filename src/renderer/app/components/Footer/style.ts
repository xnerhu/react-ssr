import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';

export const StyledFooter = styled.div`
  width: 100%;
  padding: 24px 12px;
  margin-top: auto;
  font-size: 16px;
  display: flex;

  ${({ theme }: { theme: ITheme }) => css`
    background-color: ${theme.dark ? '#616161' : '#E0E0E0'};
  `}
`;
