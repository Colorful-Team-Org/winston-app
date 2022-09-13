import Header from '../components/layout/header/Header';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { HomeExtensionSDK } from '@contentful/app-sdk';
import { GlobalStyles } from '@contentful/f36-components';
import { useState, useEffect } from 'react';

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

  return (
    <>
      <GlobalStyles />
      <div>
        <Header user={sdk.user} spaceName={spaceName} />
        <div className="container">
          <p>Body</p>
        </div>
      </div>
    </>
  );
};

export default Home;
