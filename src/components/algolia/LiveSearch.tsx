import { useEffect, useState } from 'react';

import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { useSDK } from '@contentful/react-apps-toolkit';
import {
  Configure,
  InstantSearch,
  SearchBox,
  useSearchBox,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';
import Hits, { NoResults } from './Hits';
import { Box, TextInput } from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons';

import styles from './styles';

const SearchsBox = (props: any) => {
  const { query, refine } = useSearchBox(props);

  return (
    <>
      <TextInput placeholder="Search multiple spaces..." icon={<icons.SearchTrimmedIcon />} />
    </>
  );
};

function NoResultsBoundary({ children, fallback }: any) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

const LiveSearch = () => {
  const sdk = useSDK();
  const [algolia, setAlgolia] = useState<SearchClient | null>(null);

  useEffect(() => {
    if (
      sdk.parameters.installation.algoliaApiKey === '' ||
      sdk.parameters.installation.algoliaId === '' ||
      sdk.parameters.installation.algoliaIndexName === ''
    )
      return;

    setAlgolia(
      algoliasearch(
        sdk.parameters.installation.algoliaId,
        sdk.parameters.installation.algoliaApiKey
      )
    );
  }, [sdk.parameters]);

  return (
    algolia && (
      <Box className={styles.searchContainer}>
        <InstantSearch
          searchClient={algolia}
          indexName={sdk.parameters.installation.algoliaIndexName}
        >
          <Configure hitsPerPage={5} />
          <SearchBox />
          <SearchsBox />
          <NoResultsBoundary fallback={<NoResults className={styles.searchResults} />}>
            <Hits className={styles.searchResults} />
          </NoResultsBoundary>
        </InstantSearch>
      </Box>
    )
  );
};

export default LiveSearch;
