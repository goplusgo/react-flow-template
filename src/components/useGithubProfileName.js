// @flow

import axios from 'axios';
import { useQuery } from 'react-query';

export default function useGithubProfileName(repository: string): string {
  const { data } = useQuery('repoData', () =>
    axios.get(repository).then((res) => res.data)
  );

  return data.name;
}
