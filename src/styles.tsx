import React from 'react';

import { Global, css } from '@emotion/react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const stylesReset = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

const GlobalStyles: React.FC = () => <Global styles={stylesReset} />;

export default GlobalStyles;
