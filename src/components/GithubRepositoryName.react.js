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
