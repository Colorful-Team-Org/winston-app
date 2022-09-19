import React, { Suspense } from 'react';
import { render } from 'react-dom';

import { GlobalStyles } from '@contentful/f36-components';
import { SDKProvider } from '@contentful/react-apps-toolkit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LocalhostWarning from './components/LocalhostWarning';
import App from './App';
import Loader from 'components/Loader';

const root = document.getElementById('root');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  // You can remove this if block before deploying your app
  render(<LocalhostWarning />, root);
} else {
  render(
    <SDKProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <>
              <Loader />
            </>
          }
        >
          <GlobalStyles />
          <App />
        </Suspense>
      </QueryClientProvider>
    </SDKProvider>,
    root
  );
}
