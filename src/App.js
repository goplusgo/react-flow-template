// @flow

import './App.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import * as React from 'react';
import GithubProfile from './components/GithubProfile.react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App(): React.MixedElement {
  return (
    <div className="App">
      <header className="App-header">
        <QueryClientProvider client={queryClient}>
          <GithubProfile />
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
