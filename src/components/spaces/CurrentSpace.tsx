import { Box, Flex, Icon, Text } from '@contentful/f36-components';
import { BiCube } from 'react-icons/bi';
import { ReactComponent as Logo } from 'images/colorful-coin-logo.svg';
import { FC } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';
import { RenderSpaceProps } from 'types';

const CurrentSpace: FC<RenderSpaceProps> = (props: RenderSpaceProps) => {
  const { space, children } = props;
  const sdk = useSDK();

  return space ? (
    <Flex fullWidth={true} flexDirection="column">
      <Flex fullWidth={true} alignItems="center" marginBottom="spacingL">
        <Box style={{ flex: '1' }}>
          <Flex as="span" gap="spacingS" alignItems="center" marginBottom="spacingS">
            <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
            <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
              {space.name}
            </Text>
          </Flex>
          <Text fontColor="gray800" as="h1" fontSize="fontSize2Xl" fontWeight="fontWeightDemiBold">
            Welcome back, {sdk.user.firstName} 👋
          </Text>
        </Box>
        <Box style={{ lineHeight: 1 }}>
          <Logo style={{ width: '110px' }} />
        </Box>
      </Flex>
      <Box>{children}</Box>
    </Flex>
  ) : (
    <>Space not found.</>
  );
};

export default CurrentSpace;
