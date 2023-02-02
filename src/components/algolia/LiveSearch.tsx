import { useEffect, useState } from 'react';

import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { useSDK } from '@contentful/react-apps-toolkit';
import { Configure, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import Hits from './Hits';
import { Box } from '@contentful/f36-components';

import styles from './styles';

import 'instantsearch.css/themes/satellite.css';

type LiveSearchProps = {
  spaceIds: string[];
};

const LiveSearch = (props: LiveSearchProps) => {
  const sdk = useSDK();
  const { spaceIds } = props;
  const [algolia, setAlgolia] = useState<SearchClient | null>(null);
  const [spaceIdFilter] = useState<string>(() => spaceIds.join(' OR space:'));

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
          <Configure
            hitsPerPage={5}
            filters={`locale:en-US AND space:${spaceIdFilter} OR space:${sdk.ids.space}`}
          />
          <SearchBox className={styles.searchBox} placeholder="Search spaces..." />
          <Hits className={styles.searchResults} />
        </InstantSearch>
      </Box>
    )
  );
};

export default LiveSearch;
