import { FC, ReactNode } from 'react';
import SpaceRender from 'components/renders/SpaceRender';
import { Flex } from '@contentful/f36-components';

type HeaderProps = {
  user: any;
  spaceId: string;
  children?: ReactNode;
};

const Header: FC<HeaderProps> = ({ user, spaceId }: HeaderProps) => {
  return (
    <Flex
      flexDirection="row"
      fullWidth={true}
      style={{ maxWidth: '960px', margin: '0 auto' }}
      alignItems="center"
    >
      <SpaceRender spaceId={spaceId} currentSpace={true} />
    </Flex>
  );
};

export default Header;
