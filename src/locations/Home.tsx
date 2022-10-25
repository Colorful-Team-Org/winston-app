import { Suspense, useState } from 'react';

import { useSDK } from '@contentful/react-apps-toolkit';
import { HomeExtensionSDK } from '@contentful/app-sdk';
import { Box, Button, Flex, Paragraph, Text } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';

import Header from 'components/layout/Header';
import HeaderSkeleton from 'components/loaders/HeaderSkeleton';
import DefaultSpace from 'components/spaces/default/DefaultSpace';
import SpaceSkeleton from 'components/loaders/SpaceSkeleton';
import LiveSearch from 'components/algolia/LiveSearch';

import { ReactComponent as Logo } from 'images/colorful.svg';
import { sortStringsByArray } from 'core/utils/sorting';
import SpaceErrorBoundary from 'components/SpaceErrorBoundary';

const Home = () => {
  const sdk = useSDK<HomeExtensionSDK>();
  console.log(sdk);
  const [selectedSpaces] = useState<string[]>(() => {
    return sortStringsByArray(
      sdk.parameters.installation.selectedSpaces,
      sdk.parameters.installation.spaceOrder
    );
  });

  return (
    <Box paddingBottom="spacing3Xl">
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
        <Suspense fallback={<HeaderSkeleton />}>
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
        {sdk.parameters.installation.algoliaIndexName !== '' &&
          sdk.parameters.installation.algoliaIndexName &&
          !!selectedSpaces.length && <LiveSearch spaceIds={selectedSpaces} />}
        <Suspense fallback={<SpaceSkeleton />}>
          {!!selectedSpaces && !!selectedSpaces.length ? (
            sdk.parameters.installation.selectedSpaces.map((s: string) => (
              <SpaceErrorBoundary sdk={sdk} key={s}>
                <DefaultSpace spaceId={s} />
              </SpaceErrorBoundary>
            ))
          ) : (
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
          )}
        </Suspense>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="spacingM">
          <Logo width="50px" />
          <Text fontColor="gray500">
            &copy; {new Date().getFullYear()} Colorful Collective. All rights reserved.
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
