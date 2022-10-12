import React, { useCallback, useState, useEffect } from 'react';
import { AppExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import styles from './styles';
import {
  Box,
  Heading,
  Flex,
  Autocomplete,
  FormControl,
  TextInput,
} from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons';

import { ReactComponent as Logo } from '../../images/colorful.svg';
import { SpaceProps, ContentTypeProps } from 'contentful-management';
import { useQueries, useQuery } from '@tanstack/react-query';
import useLocations from 'core/hooks/useLocations';
import { getSpace } from 'app.service';
import DraggableSpaces from 'components/configuration/DraggableSpaces';

const UNIQUE_SPACES = 5;

type SelectedContentType = {
  spaceName: string;
} & ContentTypeProps;

export interface AppInstallationParameters {
  algoliaApiKey: string;
  algoliaId: string;
  algoliaIndexName: string;
}

const uniqueSpaceIds = (contentTypes: SelectedContentType[]) =>
  Array.from(new Set(contentTypes.map(ct => ct.sys.space.sys.id)));

const filterCurrentSpace = (locations: string[], currentSpace: string) =>
  locations.filter(l => l !== currentSpace);

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    algoliaApiKey: '',
    algoliaId: '',
    algoliaIndexName: '',
  });
  const [selectedSpaces, setSelectedSpaces] = useState<SpaceProps[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentTypeProps[]>([]);

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
  // const { data: contentTypes, isLoading: ctLoading } = useQuery(
  //   ['contentTypes', configOptions.selectedSpace?.sys.id],
  //   () => getContentTypes(configOptions.selectedSpace!.sys.id),
  //   {
  //     enabled: !!configOptions.selectedSpace,
  //     suspense: false,
  //     staleTime: Infinity,
  //   }
  // );

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

  const handleNewSelectedSpace = useCallback((space: SpaceProps | undefined) => {
    if (!space) return;

    setSelectedSpaces((spaces: SpaceProps[]) => {
      return [...spaces, ...[space]];
    });
  }, []);

  const toggleCt = useCallback(
    (ct: ContentTypeProps) => {
      const foundIndex = selectedContentTypes.findIndex(
        (selected: ContentTypeProps) =>
          selected.sys.space.sys.id === ct.sys.space.sys.id && selected.sys.id === ct.sys.id
      );

      if (foundIndex > -1) {
        setSelectedContentTypes((selected: ContentTypeProps[]) =>
          selected.filter((current, index) => index !== foundIndex)
        );
      } else {
        setSelectedContentTypes((selected: ContentTypeProps[]) => [...selected, ...[ct]]);
      }
    },
    [selectedContentTypes]
  );

  // const handleSpaceCleared = useCallback(
  //   (item: string) => {
  //     if (!item || item === '' || typeof item === 'undefined') {
  //       setConfigOptions({
  //         ...configOptions,
  //         selectedSpace: undefined,
  //       });
  //     }
  //   },
  //   [configOptions]
  // );

  return (
    <>
      <Box className={styles.background} />
      <Box className={styles.body}>
        <Flex flexDirection="column" gap="spacingL">
          <FormControl style={{ flex: 1 }} isDisabled={spaces.length === 0} marginBottom="none">
            <FormControl.Label>Add a space:</FormControl.Label>
            <Autocomplete
              items={spaces}
              onSelectItem={({ data }) => handleNewSelectedSpace(data)}
              placeholder="Select a space"
              renderItem={item => item.data?.name}
              itemToString={(item: any) => item?.data?.name}
              clearAfterSelect
            />
          </FormControl>
          {!!selectedSpaces.length && (
            <DraggableSpaces spaces={selectedSpaces} toggleCt={toggleCt} />
          )}
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
