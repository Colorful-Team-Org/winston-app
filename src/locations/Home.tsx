import { useSDK } from '@contentful/react-apps-toolkit';
import { HomeExtensionSDK } from '@contentful/app-sdk';
import { Flex } from '@contentful/f36-components';

import tokens from '@contentful/f36-tokens';

import Header from 'components/layout/Header';
import useSpaceData from 'hooks/useSpaceData';
import OtherSpace from 'components/spaces/OtherSpace';

const Home = () => {
  const sdk = useSDK<HomeExtensionSDK>();
  const { spacesData } = useSpaceData();

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
        <Header user={sdk.user} data={spacesData} />
      </Flex>
      <Flex
        as="main"
        flexDirection="column"
        style={{ maxWidth: '960px', margin: '0 auto' }}
        fullWidth={true}
        gap="spacing2Xl"
      >
        {/* {spacesData && spacesData.others.map(s => <OtherSpace key={s.space.sys.id} data={s} />)} */}
      </Flex>
    </>
  );
};

export default Home;
