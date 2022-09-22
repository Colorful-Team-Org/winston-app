import { useSDK } from '@contentful/react-apps-toolkit';
import { HomeExtensionSDK } from '@contentful/app-sdk';
import { Box, Flex } from '@contentful/f36-components';

import tokens from '@contentful/f36-tokens';

import Header from 'components/layout/Header';
import useSpaceData from 'core/hooks/useSpaceData';
import OtherSpace from 'components/spaces/default/DefaultSpace';

const Home = () => {
  const sdk = useSDK<HomeExtensionSDK>();
  const { spacesData } = useSpaceData();

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
        <Header user={sdk.user} data={spacesData} />
      </Flex>
      <Flex
        as="main"
        flexDirection="column"
        style={{ maxWidth: '960px', margin: '0 auto' }}
        fullWidth={true}
        gap="spacing2Xl"
      >
        {spacesData &&
          spacesData.others.map((s, i) => <OtherSpace key={`${s.space.sys.id}_${i}`} data={s} />)}
      </Flex>
    </Box>
  );
};

export default Home;
