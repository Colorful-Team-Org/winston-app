import { useEffect, useState } from 'react';

import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { useSDK } from '@contentful/react-apps-toolkit';
import {
  Configure,
  InstantSearch,
  PoweredBy,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';
import Hits, { NoResults } from './Hits';
import { Box } from '@contentful/f36-components';

import styles from './styles';

import 'instantsearch.css/themes/satellite.css';

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
          <SearchBox className={styles.searchBox} placeholder="Search spaces..." />
          <PoweredBy />
          <NoResultsBoundary fallback={<NoResults className={styles.searchResults} />}>
            <Hits className={styles.searchResults} />
          </NoResultsBoundary>
        </InstantSearch>
      </Box>
    )
  );
};

export default LiveSearch;
