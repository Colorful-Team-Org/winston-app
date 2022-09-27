import { Suspense, useEffect, useState } from 'react';

import { useSDK } from '@contentful/react-apps-toolkit';
import { HomeExtensionSDK } from '@contentful/app-sdk';
import { Box, Button, Flex, Paragraph, TextInput } from '@contentful/f36-components';
import algoliasearch from 'algoliasearch/lite';
// import * as icons from '@contentful/f36-icons';

import tokens from '@contentful/f36-tokens';

import Header from 'components/layout/Header';
import useSpaceData from 'core/hooks/useSpaceData';
import OtherSpace from 'components/spaces/default/DefaultSpace';
import { SearchClient } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const Home = () => {
  const sdk = useSDK<HomeExtensionSDK>();
  // const { spacesData } = useSpaceData();
  const [algolia, setAlgolia] = useState<SearchClient | null>(null);

  useEffect(() => {
    if (
      !sdk.parameters.installation.algoliaApiKey &&
      !sdk.parameters.installation.algoliaId &&
      !sdk.parameters.installation.algoliaIndexName
    )
      return;
    console.log(sdk.parameters.installation.algoliaIndexName);
    setAlgolia(
      algoliasearch(
        sdk.parameters.installation.algoliaId,
        sdk.parameters.installation.algoliaApiKey
      )
    );
  }, [sdk.parameters]);

  return (
    <Box paddingBottom="spacingL">
      <Flex
        as="header"
        flexDirection="row"
        padding="spacingXl"
        marginBottom="spacingL"
        fullWidth={true}
        style={{
          borderBottom: `solid 2px ${tokens.gray300}`,
          background: '#fff',
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Header user={sdk.user} spaceId={sdk.ids.space} />
        </Suspense>
      </Flex>
      <Flex
        as="main"
        flexDirection="column"
        style={{ maxWidth: '960px', margin: '0 auto' }}
        fullWidth={true}
        gap="spacing2Xl"
      >
        <Suspense fallback={<div>Loading...</div>}>
          {algolia && (
            <InstantSearch
              searchClient={algolia}
              indexName={sdk.parameters.installation.algoliaIndexName}
            >
              {/* <SearchBox /> */}
            </InstantSearch>
            // <TextInput
            //   aria-label="Algolia Search"
            //   id="algolia-search"
            //   placeholder="Search for entries"
            //   icon={<icons.SearchTrimmedIcon />}
            // />
          )}
          {/* {spacesData && spacesData.others.length > 0 ? (
            spacesData.others.map((s, i) => <OtherSpace key={`${s.space.sys.id}_${i}`} data={s} />)
          ) : ( */}
          <Flex
            flexDirection="column"
            padding="spacingM"
            justifyContent="center"
            alignItems="center"
            style={{
              background: '#fff',
              border: `solid 1px ${tokens.gray300}`,
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Paragraph>
              To see recently updated related spaces, please configure the dashboard app by adding
              spaces and content types.
            </Paragraph>
            <Button
              as="a"
              href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${sdk.ids.space}/apps/${sdk.ids.app}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </Button>
          </Flex>
          {/* )} */}
        </Suspense>
      </Flex>
    </Box>
  );
};

export default Home;
