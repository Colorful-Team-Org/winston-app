import { useSDK } from '@contentful/react-apps-toolkit';
import { HomeExtensionSDK } from '@contentful/app-sdk';
import { Flex } from '@contentful/f36-components';

import tokens from '@contentful/f36-tokens';
import Header from 'components/layout/header/Header';
import Container from 'components/layout/Container';
import useLocations from 'hooks/useLocations';
import Loader from 'components/Loader';
import SpaceRender from 'components/SpaceRender';

const Home = () => {
  const sdk = useSDK<HomeExtensionSDK>();
  const { isLoading, spaceIds } = useLocations();

  const showSpaces = spaceIds.map((s: string) => (
    <SpaceRender key={s} currentSpace={false} spaceId={s} />
  ));

  return (
    <>
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
        <Header user={sdk.user} spaceId={sdk.ids.space} />
      </Flex>
      <Container>{isLoading ? <Loader /> : showSpaces}</Container>
    </>
  );
};

export default Home;
