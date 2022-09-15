import { Box, Flex, Icon, Text } from '@contentful/f36-components';
import { SpaceProps } from 'contentful-management';
import { BiCube } from 'react-icons/bi';
import { ReactComponent as Logo } from 'images/colorful-coin-logo.svg';
import { FC } from 'react';

type CurrentSpaceProps = {
  space: SpaceProps | undefined;
};

const CurrentSpace: FC<CurrentSpaceProps> = (props: CurrentSpaceProps) => {
  const { space } = props;
  return space ? (
    <>
      <Box style={{ flex: '1' }}>
        <Flex as="span" gap="spacingS" alignItems="center" marginBottom="spacingS">
          <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
          <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
            {space.name}
          </Text>
        </Flex>
        <Text as="h2" fontSize="fontSize3Xl">
          Welcome back, Test 👋
        </Text>
      </Box>
      <Box style={{ lineHeight: 1 }}>
        <Logo style={{ width: '110px' }} />
      </Box>
    </>
  ) : (
    <>Space not found.</>
  );
};

export default CurrentSpace;
