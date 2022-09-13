import tokens from '@contentful/f36-tokens';
import { Flex, Icon, Text } from '@contentful/f36-components';
import { FC, ReactNode } from 'react';

import { BiCube } from 'react-icons/bi';

type HeaderProps = {
  user: any;
  spaceName: string;
  children?: ReactNode;
};

const Header: FC<HeaderProps> = ({ user, spaceName }: HeaderProps) => (
  <Flex
    as="header"
    flexDirection="row"
    padding="spacingXl"
    marginBottom="spacingL"
    fullWidth={true}
    style={{
      borderBottom: `solid 2px ${tokens.gray300}`,
      background: '#fff',
    }}
  >
    <Flex
      as="div"
      flexDirection="column"
      gap="spacingS"
      fullWidth={true}
      style={{
        maxWidth: '1120px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Flex as="span" gap="spacingS" alignItems="center">
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
    </Flex>
  </Flex>
);

export default Header;
