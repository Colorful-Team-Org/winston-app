import { FC } from 'react';
import { Flex } from '@contentful/f36-components';
import CurrentSpace from 'components/spaces/CurrentSpace';

type HeaderProps = {
  user: any;
  data: any;
};

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { user, data } = props;

  return (
    <Flex
      flexDirection="row"
      fullWidth={true}
      style={{ maxWidth: '960px', margin: '0 auto' }}
      alignItems="center"
    >
      <CurrentSpace data={data.primary} />
    </Flex>
  );
};

export default Header;
