import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { HomeExtensionSDK } from '@contentful/app-sdk';
import { Flex, GlobalStyles } from '@contentful/f36-components';
import { useState, useEffect } from 'react';

import tokens from '@contentful/f36-tokens';
import Header from 'components/layout/header/Header';
import SpaceContainer from 'components/spaces/SpaceContainer';
import Container from 'components/layout/Container';

const Home = () => {
  const sdk = useSDK<HomeExtensionSDK>();
  const cma = useCMA();

  const [spaceName, setSpaceName] = useState<string>('');

  useEffect(() => {
    const getSpace = async () => {
      const { name } = await cma.space.get({ spaceId: sdk.ids.space });

      setSpaceName(name);
    };

    getSpace();
  }, [cma.space, sdk.ids.space]);

  useEffect(() => {
    const getInstallations = async () => {
      const installations = await cma.appDefinition.getInstallationsForOrg({
        organizationId: sdk.ids.organization,
        appDefinitionId: sdk.ids.app!,
      });

      console.log(installations);
    };

    getInstallations();
  }, [cma.appDefinition, sdk.ids.organization, sdk.ids.app]);

  return (
    <>
      <GlobalStyles />
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
        <Header user={sdk.user} spaceName={spaceName} />
      </Flex>
      <Container>
        <SpaceContainer space={{ id: 'test', name: 'hello' }} />
      </Container>
    </>
  );
};

export default Home;
