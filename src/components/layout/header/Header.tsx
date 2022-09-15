import { FC, ReactNode } from 'react';
import Container from '../Container';
import SpaceRender from 'components/SpaceRender';

type HeaderProps = {
  user: any;
  spaceId: string;
  children?: ReactNode;
};

const Header: FC<HeaderProps> = ({ user, spaceId }: HeaderProps) => {
  return (
    <Container flexDirection="row">
      <SpaceRender spaceId={spaceId} currentSpace={true} />
    </Container>
  );
};

export default Header;
