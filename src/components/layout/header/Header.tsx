import { Box, Flex, Icon, Text } from '@contentful/f36-components';
import { FC, ReactNode } from 'react';

import { BiCube } from 'react-icons/bi';
import { ReactComponent as Logo } from 'images/colorful-coin-logo.svg';
import Container from '../Container';

type HeaderProps = {
  user: any;
  spaceName: string;
  children?: ReactNode;
};

const Header: FC<HeaderProps> = ({ user, spaceName }: HeaderProps) => (
  <Container flexDirection="row">
    <Box style={{ flex: '1' }}>
      <Flex
        as="span"
        gap="spacingS"
        alignItems="center"
        marginBottom="spacingS"
      >
        <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
        <Text
          fontSize="fontSizeL"
          fontColor="gray700"
          fontWeight="fontWeightMedium"
        >
          {spaceName}
        </Text>
      </Flex>
      <h2>Welcome back, {user.firstName} 👋</h2>
    </Box>
    <Box style={{ lineHeight: 1 }}>
      <Logo style={{ width: '110px' }} />
    </Box>
  </Container>
);

export default Header;
