import { useEffect, useState } from 'react';

import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { useSDK } from '@contentful/react-apps-toolkit';
import { InstantSearch } from 'react-instantsearch-hooks-web';

// const SearchBox = ({ })

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
      <InstantSearch
        searchClient={algolia}
        indexName={sdk.parameters.installation.algoliaIndexName}
      ></InstantSearch>
      // <TextInput
      //   aria-label="Algolia Search"
      //   id="algolia-search"
      //   placeholder="Search for entries"
      //   icon={<icons.SearchTrimmedIcon />}
      // />
    )
  );
};

export default LiveSearch;
