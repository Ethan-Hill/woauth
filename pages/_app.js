/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { GlobalStyles } from 'twin.macro';
import { Provider } from 'next-auth/client';

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
