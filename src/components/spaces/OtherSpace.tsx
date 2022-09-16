import { Box, Flex, Icon, Text, TextLink } from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';
import { FC } from 'react';
import { RenderSpaceProps } from 'types';
import { BiCube } from 'react-icons/bi';
import * as icons from '@contentful/f36-icons';

const OtherSpace: FC<RenderSpaceProps> = (props: RenderSpaceProps) => {
  const sdk = useSDK();
  const { children, space } = props;
  return space ? (
    <>
      <Flex as="div" flexDirection="row" alignItems="center" fullWidth={true}>
        <Flex as="h2" gap="spacingS" alignItems="center" style={{ flex: '1' }}>
          <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
          <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
            {space.name}
          </Text>
        </Flex>
        <TextLink
          icon={<icons.ExternalLinkIcon />}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            sdk.dialogs.openCurrent({
              title: 'Test',
            });
          }}
        >
          Open Test
        </TextLink>
      </Flex>
      <Flex flexDirection="column" gap="spacingS">
        {children}
      </Flex>
    </>
  ) : (
    <>Space Not Found</>
  );
};

export default OtherSpace;
