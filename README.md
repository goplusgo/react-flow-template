# Table of contents

- [Environment Setup](#environment_setup)
- [Project Setup](#project_setup)

## Environment Setup<a name="environment_setup" />

This section covers settings for:

- Webpack
- Babel
- Flow
- ESLint

For more, detailed, see [here](./docs/Environment%20Setup.md).

## Project Setup<a name="project_setup" />

#### Install React-query and axios

```
yarn add react-query axios
```

#### Install react-error-boundary lib

```
yarn add react-error-boundary
```

#### Create custom hook to fetch data

`useGithubProfileName.js`:

```javascript
// @flow

import axios from 'axios';
import { useQuery } from 'react-query';

export default function useGithubProfileName(repository: string): string {
  const { data } = useQuery('repoData', () =>
    axios.get(repository).then((res) => res.data),
  );

  return data.name;
}
```

#### Component to render with data fetching

`GithubRepositoryName.react.js`:

```javascript
// @flow

import * as React from 'react';
import useGithubProfileName from './useGithubProfileName';

type Props = { repository: string };

export default function GithubProfile({
  repository,
}: Props): React.MixedElement {
  const repositoryName = useGithubProfileName(repository);

  return <p>Hello, {repositoryName}!</p>;
}
```

#### Parent component with React Suspense + ErrorBoundary

`GithubProfile.react.js`:

```javascript
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
```
