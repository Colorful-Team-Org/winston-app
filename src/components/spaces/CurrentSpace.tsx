import { Box, Flex, Icon, Text } from '@contentful/f36-components';
import { BiCube } from 'react-icons/bi';
import { ReactComponent as Logo } from 'images/colorful-coin-logo.svg';
import { FC, ReactNode } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';
import { CombinedSpaceProps } from 'types';

type CurrentSpaceProps = {
  data: CombinedSpaceProps;
  children?: ReactNode[];
};

const CurrentSpace: FC<CurrentSpaceProps> = (props: CurrentSpaceProps) => {
  const { data, children } = props;
  const sdk = useSDK();

  return data ? (
    <Flex fullWidth={true} flexDirection="column">
      <Flex fullWidth={true} alignItems="center" marginBottom="spacingL">
        <Box style={{ flex: '1' }}>
          <Flex as="span" gap="spacingS" alignItems="center" marginBottom="spacingS">
            <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
            <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
              {data.space.name}
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
      {data.entries.items.map(e => (
        <>{e.fields.internalName['en-US']}</>
      ))}
    </Flex>
  ) : (
    <>Space not found.</>
  );
};

export default CurrentSpace;
