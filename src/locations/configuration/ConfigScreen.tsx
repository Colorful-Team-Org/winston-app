import React, { useCallback, useState, useEffect } from 'react';
import { AppExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import styles from './styles';
import { Box, Heading, Flex, FormControl, TextInput } from '@contentful/f36-components';

import { ReactComponent as Logo } from '../../images/colorful.svg';
import { SpaceProps, ContentTypeProps } from 'contentful-management';
import { useQueries } from '@tanstack/react-query';
import useLocations from 'core/hooks/useLocations';
import { getSpace } from 'app.service';
import DraggableSpaces from 'components/configuration/DraggableSpaces';
import useConfigStore from './config.store';

export interface AppInstallationParameters {
  algoliaApiKey: string;
  algoliaId: string;
  algoliaIndexName: string;
}

const filterCurrentSpace = (locations: string[], currentSpace: string) =>
  locations.filter(l => l !== currentSpace);

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    algoliaApiKey: '',
    algoliaId: '',
    algoliaIndexName: '',
  });
  const { selectedContentTypes, selectedSpaces } = useConfigStore();

  const sdk = useSDK<AppExtensionSDK>();
  const { locations } = useLocations();
  const filteredLocations = filterCurrentSpace(locations ?? [], sdk.ids.space);

  const spaces = useQueries({
    queries: filteredLocations.map(spaceId => {
      return {
        queryKey: ['space', spaceId],
        queryFn: () => getSpace(spaceId),
        enabled: !!filteredLocations.length,
      };
    }),
  });

  const onConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();

    return {
      parameters,
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <>
      <Box className={styles.background} />
      <Box className={styles.body}>
        {selectedSpaces.map(ct => (
          <p>{ct}</p>
        ))}
        <Flex flexDirection="column" gap="spacingL">
          {!spaces.some(s => s.isLoading) && <DraggableSpaces spaces={spaces} />}
        </Flex>
        <hr className={styles.splitter} />
        <Heading as="h2">Algolia Configuration</Heading>
        <FormControl>
          <FormControl.Label>Algolia App ID:</FormControl.Label>
          <TextInput
            value={parameters.algoliaId}
            onChange={e => {
              setParameters({
                ...parameters,
                algoliaId: e.target.value,
              });
            }}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Algolia API Key:</FormControl.Label>
          <TextInput
            value={parameters.algoliaApiKey}
            onChange={e => {
              setParameters({
                ...parameters,
                algoliaApiKey: e.target.value,
              });
            }}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Algolia Index Name:</FormControl.Label>
          <TextInput
            value={parameters.algoliaIndexName}
            onChange={e => {
              setParameters({
                ...parameters,
                algoliaIndexName: e.target.value,
              });
            }}
          />
        </FormControl>
      </Box>
      <Box style={{ textAlign: 'center' }} paddingTop="spacingXl" paddingBottom="spacingXl">
        <Logo width="50px" />
      </Box>
    </>
  );
};

export default ConfigScreen;
