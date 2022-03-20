// @flow

import * as React from 'react';
import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

const GithubRepositoryName = React.lazy(() =>
  import('./GithubRepositoryName.react'),
);

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const REPOSITORY = 'https://api.github.com/repos/goplusgo/react-flow-template';

export default function GithubProfile(): React.MixedElement {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback="Loading...">
        <GithubRepositoryName repository={REPOSITORY} />
      </Suspense>
    </ErrorBoundary>
  );
}
