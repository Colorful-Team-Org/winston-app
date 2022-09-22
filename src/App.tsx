import React, { useMemo } from 'react';
import { locations, init } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { createClient } from 'contentful-management';

import ConfigScreen from './locations/configuration/ConfigScreen';
import Home from './locations/Home';
import { setState as setCmaState } from 'core/stores/appStore';

import './App.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

const ComponentLocationSettings = {
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_HOME]: Home,
};

init(sdk => {
  const cma = createClient(
    {
      apiAdapter: sdk.cmaAdapter,
    },
    {
      type: 'plain',
      defaults: {
        organizationId: sdk.ids.organization,
        spaceId: sdk.ids.space,
        environmentId: sdk.ids.environment,
      },
    }
  );

  setCmaState({ cma, sdk });
});

const App = () => {
  const sdk = useSDK();

  const Component = useMemo(() => {
    for (const [location, component] of Object.entries(ComponentLocationSettings)) {
      if (sdk.location.is(location)) {
        return component;
      }
    }
  }, [sdk.location]);

  return Component ? <Component /> : null;
};

export default App;
