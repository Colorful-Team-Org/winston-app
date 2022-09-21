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
import useSpaceData from 'hooks/useSpaceData';
import { SpaceProps, ContentTypeProps } from 'contentful-management';
import { CombinedSpaceProps } from 'types';

type SelectedContentType = {
  spaceName: string;
} & ContentTypeProps;

export interface AppInstallationParameters {
  selectedContentTypes: SelectedContentType[] | null;
  selectedSpaces: string[];
  algoliaApiKey: string | null;
  algoliaIndexName: string | null;
}

interface OptionsProps {
  spaces: CombinedSpaceProps[];
  contentTypes: ContentTypeProps[];
  selectedSpace: SpaceProps | null;
}

const uniqueSpaceIds = (contentTypes: SelectedContentType[]) =>
  Array.from(new Set(contentTypes.map(ct => ct.sys.space.sys.id)));

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    selectedContentTypes: [],
    selectedSpaces: [],
    algoliaApiKey: null,
    algoliaIndexName: null,
  });
  const [configOptions, setConfigOptions] = useState<OptionsProps>({
    spaces: [],
    contentTypes: [],
    selectedSpace: null,
  });
  const sdk = useSDK<AppExtensionSDK>();
  const { spacesData, isLoading } = useSpaceData();

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
    if (!spacesData || spacesData.others.length === 0) return;

    setConfigOptions(config => ({
      ...config,
      spaces: spacesData.others,
    }));
  }, [spacesData]);

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
    (item: CombinedSpaceProps) => {
      setConfigOptions({
        ...configOptions,
        selectedSpace: item.space,
        contentTypes: item.contentTypes.items,
      });
    },
    [configOptions]
  );

  const handleSpaceCleared = useCallback(
    (item: string) => {
      if (!item || item === '' || typeof item === 'undefined') {
        setConfigOptions({
          ...configOptions,
          selectedSpace: null,
          contentTypes: [],
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
        {configOptions.spaces.length === 0 && !isLoading && (
          <Box marginBottom="spacingM">
            <Note variant="negative">
              This app needs to be installed in at least two spaces to work properly.
            </Note>
          </Box>
        )}
        <Heading as="h2">Configuration</Heading>
        <Flex flexDirection="row" gap="spacingXl">
          <FormControl style={{ flex: 1 }} isDisabled={configOptions.spaces.length === 0}>
            <FormControl.Label>Related Spaces:</FormControl.Label>
            <Autocomplete
              items={configOptions.spaces}
              placeholder="Select Spaces"
              isDisabled={configOptions.spaces.length === 0}
              onSelectItem={handleSelectSpace}
              itemToString={(item: any) => item.space.name}
              renderItem={(item: any) => item.space.name}
              onInputValueChange={handleSpaceCleared}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }} isDisabled={!configOptions.selectedSpace}>
            <FormControl.Label>Content Types:</FormControl.Label>
            <Autocomplete
              items={configOptions.contentTypes}
              onSelectItem={handleSelectedContentType}
              placeholder="Select Content Types"
              isDisabled={!configOptions.selectedSpace}
              itemToString={(item: any) => item.name}
              renderItem={(item: any) => item.name}
              clearAfterSelect={true}
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
          <FormControl.Label>Algolia API Key:</FormControl.Label>
          <TextInput />
        </FormControl>
        <FormControl>
          <FormControl.Label>Algolia Index Name:</FormControl.Label>
          <TextInput />
        </FormControl>
      </Box>
      <Box style={{ textAlign: 'center' }} paddingTop="spacingXl" paddingBottom="spacingXl">
        <Logo width="50px" />
      </Box>
    </>
  );
};

export default ConfigScreen;
