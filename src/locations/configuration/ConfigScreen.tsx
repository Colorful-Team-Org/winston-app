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
  Note,
  Text,
  TextLink,
  Grid,
} from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons';

import { ReactComponent as Logo } from '../../images/colorful.svg';
import { SpaceProps, ContentTypeProps } from 'contentful-management';
import { CombinedSpaceProps } from 'types';
import { useQueries, useQuery } from '@tanstack/react-query';
import useLocations from 'core/hooks/useLocations';
import { getContentTypes, getSpace } from 'app.service';

type SelectedContentType = {
  spaceName: string;
} & ContentTypeProps;

export interface AppInstallationParameters {
  selectedContentTypes: SelectedContentType[];
  selectedSpaces: string[];
  algoliaApiKey: string;
  algoliaId: string;
  algoliaIndexName: string;
}

interface OptionsProps {
  spaces: CombinedSpaceProps[];
  selectedSpace: SpaceProps | undefined;
}

const uniqueSpaceIds = (contentTypes: SelectedContentType[]) =>
  Array.from(new Set(contentTypes.map(ct => ct.sys.space.sys.id)));

const filterCurrentSpace = (locations: string[], currentSpace: string) =>
  locations.filter(l => l !== currentSpace);

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    selectedContentTypes: [],
    selectedSpaces: [],
    algoliaApiKey: '',
    algoliaId: '',
    algoliaIndexName: '',
  });
  const [configOptions, setConfigOptions] = useState<OptionsProps>({
    spaces: [],
    selectedSpace: undefined,
  });

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
  const { data: contentTypes, isLoading: ctLoading } = useQuery(
    ['contentTypes', configOptions.selectedSpace?.sys.id],
    () => getContentTypes(configOptions.selectedSpace!.sys.id),
    {
      enabled: !!configOptions.selectedSpace,
      suspense: false,
    }
  );

  const onConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  const handleSelectSpace = useCallback(
    (space: SpaceProps | undefined) => {
      setConfigOptions({
        ...configOptions,
        selectedSpace: space ?? ({} as SpaceProps),
      });
    },
    [configOptions]
  );

  const handleSpaceCleared = useCallback(
    (item: string) => {
      if (!item || item === '' || typeof item === 'undefined') {
        setConfigOptions({
          ...configOptions,
          selectedSpace: undefined,
        });
      }
    },
    [configOptions]
  );

  const handleSelectedContentType = useCallback(
    (item: ContentTypeProps) => {
      const newSelectedContentTypes = [
        ...(parameters.selectedContentTypes ? parameters.selectedContentTypes : []),
        ...[
          {
            ...item,
            spaceName: configOptions.selectedSpace!.name,
          },
        ],
      ];

      setParameters({
        ...parameters,
        selectedContentTypes: newSelectedContentTypes,
        selectedSpaces: uniqueSpaceIds(newSelectedContentTypes),
      });
    },
    [parameters, configOptions]
  );

  const handleCtRemove = useCallback(
    (id: string) => {
      const newSelectedContentTypes = parameters.selectedContentTypes!.filter(
        ct => ct.sys.id !== id
      );

      setParameters({
        ...parameters,
        selectedContentTypes: newSelectedContentTypes,
        selectedSpaces: uniqueSpaceIds(newSelectedContentTypes),
      });
    },
    [parameters]
  );

  return (
    <>
      <Box className={styles.background} />
      <Box className={styles.body}>
        {spaces.length === 0 && (
          <Box marginBottom="spacingM">
            <Note variant="negative">
              This app needs to be installed in at least two spaces to work properly.
            </Note>
          </Box>
        )}
        <Heading as="h2">Configuration</Heading>
        <Flex flexDirection="row" gap="spacingXl">
          <FormControl style={{ flex: 1 }} isDisabled={spaces.length === 0}>
            <FormControl.Label>Related Spaces:</FormControl.Label>
            <Autocomplete
              items={spaces}
              onSelectItem={({ data }) => handleSelectSpace(data)}
              placeholder="Select a space"
              renderItem={item => item.data?.name}
              itemToString={(item: any) => item?.data?.name}
              onInputValueChange={handleSpaceCleared}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }} isDisabled={ctLoading || contentTypes === undefined}>
            <FormControl.Label>Content Types:</FormControl.Label>
            <Autocomplete
              items={contentTypes ? contentTypes.items : []}
              onSelectItem={handleSelectedContentType}
              placeholder="Select Content Types"
              renderItem={item => item.name}
              itemToString={(item: any) => item.name}
              clearAfterSelect={true}
              closeAfterSelect={true}
            />
          </FormControl>
        </Flex>
        {parameters.selectedContentTypes && (
          <Grid columns="repeat(3, minmax(0, 1fr))" columnGap="spacingS" rowGap="spacingS">
            {parameters.selectedContentTypes.map((item, i) => (
              <Box key={`${item.sys.id}_${i}`} className={styles.selectedCt} padding="spacingXs">
                <Flex alignItems="center" gap="spacingM" style={{ width: '100%' }}>
                  <Box
                    style={{
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      minWidth: 0,
                    }}
                  >
                    <Text fontWeight="fontWeightDemiBold">{item.name}</Text>
                    <Text fontSize="fontSizeS" as="div" isTruncated>
                      {item.spaceName}
                    </Text>
                  </Box>
                  <TextLink
                    as="button"
                    variant="secondary"
                    onClick={() => handleCtRemove(item.sys.id)}
                    style={{ lineHeight: 1 }}
                  >
                    <icons.CloseIcon style={{ lineHeight: 1 }} variant="muted" />
                  </TextLink>
                </Flex>
              </Box>
            ))}
          </Grid>
        )}
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
