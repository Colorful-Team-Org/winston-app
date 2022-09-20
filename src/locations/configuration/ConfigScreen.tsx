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
  Checkbox,
} from '@contentful/f36-components';
import { ReactComponent as Logo } from '../../images/colorful.svg';
import useSpaceData from 'hooks/useSpaceData';

export interface AppInstallationParameters {}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const sdk = useSDK<AppExtensionSDK>();
  const { spacesData } = useSpaceData();
  console.log(spacesData);

  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [selectedCt, setSelectedCt] = useState<any>([]);

  const [spaces, setSpaces] = useState<any>([]);
  const [cts, setCts] = useState<any>([]);

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
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

  useEffect(() => {
    if (!spacesData?.others) return;

    setSpaces(spacesData.others.map(item => ({ name: item.space.name, value: item.space.sys.id })));
  }, [spacesData]);

  const handleSelectSpace = (item: { name: string; value: string }) => {
    const ct = spacesData?.others.find(
      (item: any) => item.space.sys.id === selectedSpace
    )?.contentTypes;
    setSelectedSpace(item.value);
    console.log(ct);
    // setCts(ct?.items.map(item => item.name));
  };

  return (
    <>
      <Box className={styles.background} />
      <Box className={styles.body}>
        <Heading>Configuration</Heading>
        <hr className={styles.splitter} />
        <Flex flexDirection="row" gap="spacingXl">
          <FormControl
            style={{ flex: 1 }}
            isDisabled={spaces.length === 0}
            isInvalid={spaces.length === 0}
          >
            <FormControl.Label>Related Spaces:</FormControl.Label>
            <Autocomplete
              items={spaces}
              placeholder="Select Spaces"
              isDisabled={spaces.length === 0}
              onSelectItem={handleSelectSpace}
              itemToString={(item: any) => item.id}
              renderItem={(item: any) => item.name}
            />
            {spaces.length === 0 && (
              <FormControl.ValidationMessage>
                Install the app in more than one space
              </FormControl.ValidationMessage>
            )}
          </FormControl>
          <FormControl style={{ flex: 1 }} isDisabled={!selectedSpace}>
            <FormControl.Label>Content Types:</FormControl.Label>
            <Autocomplete
              items={cts}
              onSelectItem={() => {}}
              placeholder="Select Content Types"
              isDisabled={!selectedSpace}
            />
          </FormControl>
        </Flex>
      </Box>
      <Box style={{ textAlign: 'center' }} paddingTop="spacingXl" paddingBottom="spacingXl">
        <Logo width="50px" />
      </Box>
    </>
  );
};

export default ConfigScreen;
