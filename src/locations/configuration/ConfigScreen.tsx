import React, { useCallback, useEffect } from 'react';
import { AppExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import styles from './styles';
import { Box, Heading, Flex, FormControl, TextInput, Paragraph } from '@contentful/f36-components';

import { ReactComponent as Logo } from '../../images/colorful.svg';
import { useQueries } from '@tanstack/react-query';
import useLocations from 'core/hooks/useLocations';
import { getSpace } from 'app.service';
import DraggableSpaces from 'components/configuration/DraggableSpaces';
import useConfigStore from 'core/stores/config.store';
import { SelectedContentType } from 'types';

export interface AppInstallationParameters {
  selectedContentTypes: SelectedContentType[];
  selectedSpaces: string[];
  spaceOrder: string[];
  algoliaApiKey: string;
  algoliaId: string;
  algoliaIndexName: string;
}

/*
 * On save take the order of the displayed spaces, remove the ones that aren't in the selected array and save that as the
 * selectedSpace parameter.
 */

const filterCurrentSpace = (locations: string[], currentSpace: string) =>
  locations.filter(l => l !== currentSpace);

const ConfigScreen = () => {
  const { algoliaApiKey, algoliaId, algoliaIndexName } = useConfigStore(state => ({
    algoliaApiKey: state.algoliaApiKey,
    algoliaId: state.algoliaId,
    algoliaIndexName: state.algoliaIndexName,
  }));

  const sdk = useSDK<AppExtensionSDK>();
  const { locations } = useLocations();
  const filteredLocations = filterCurrentSpace(locations ?? [], sdk.ids.space);

  const spaces = useQueries({
    queries: filteredLocations.map(spaceId => {
      return {
        queryKey: ['space', spaceId],
        queryFn: () => getSpace(spaceId),
        enabled: !!filteredLocations.length,
        staleTime: Infinity,
      };
    }),
  });

  const onConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();

    return {
      parameters: {
        selectedContentTypes: useConfigStore.getState().selectedContentTypes,
        selectedSpaces: useConfigStore.getState().selectedSpaces,
        spaceOrder: useConfigStore.getState().spaceOrder,
        algoliaApiKey: useConfigStore.getState().algoliaApiKey,
        algoliaId: useConfigStore.getState().algoliaId,
        algoliaIndexName: useConfigStore.getState().algoliaIndexName,
      },
      targetState: currentState,
    };
  }, [sdk]);

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();
      if (currentParameters) {
        useConfigStore.setState({
          selectedContentTypes: currentParameters.selectedContentTypes || [],
          selectedSpaces: currentParameters.selectedSpaces || [],
          spaceOrder: currentParameters.spaceOrder || [],
          algoliaApiKey: currentParameters.algoliaApiKey,
          algoliaId: currentParameters.algoliaId,
          algoliaIndexName: currentParameters.algoliaIndexName,
        });
      }

      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <>
      <Box className={styles.background} />
      <Box className={styles.body}>
        <Heading as="h2">Displayed Spaces:</Heading>
        <Paragraph>
          Select the sources of content to display on the home screen of your space.
        </Paragraph>
        <Flex flexDirection="column">
          {!spaces.some(s => s.isLoading) && <DraggableSpaces spaces={spaces} />}
        </Flex>
        <Paragraph marginTop="spacingL">
          The configuration screen displays all the spaces within your organization where the Space
          Home app is installed.
        </Paragraph>
        <hr className={styles.splitter} />
        <Heading as="h2">Search</Heading>
        <Paragraph>
          To enable users search across associated spaces, please provide the details of your
          Algolia search index.
        </Paragraph>
        <FormControl>
          <FormControl.Label>Algolia App ID:</FormControl.Label>
          <TextInput
            value={algoliaId}
            onChange={e => {
              useConfigStore.setState({
                algoliaId: e.target.value,
              });
            }}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Algolia API Key:</FormControl.Label>
          <TextInput
            value={algoliaApiKey}
            onChange={e => {
              useConfigStore.setState({
                algoliaApiKey: e.target.value,
              });
            }}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Algolia Index Name:</FormControl.Label>
          <TextInput
            value={algoliaIndexName}
            onChange={e => {
              useConfigStore.setState({
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
