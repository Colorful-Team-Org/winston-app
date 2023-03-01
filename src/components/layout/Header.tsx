import { FC } from 'react';
import { Flex } from '@contentful/f36-components';
import CurrentSpace from 'components/spaces/current/CurrentSpace';
import { useQuery } from '@tanstack/react-query';
import { getContentTypes, getSpace } from 'app.service';
import { SpaceProps, CollectionProp, ContentTypeProps } from 'contentful-management';

type HeaderProps = {
  user: any;
  spaceId: string;
};

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { spaceId, user } = props;
  const { data: space } = useQuery<SpaceProps>(['currentSpace', spaceId], () => getSpace(spaceId));
  const { data: cts } = useQuery<CollectionProp<ContentTypeProps>>(['currentSpaceCts'], () =>
    getContentTypes(spaceId)
  );

  return (
    <>
      <Flex
        flexDirection="row"
        fullWidth={true}
        style={{ maxWidth: '960px', margin: '0 auto' }}
        alignItems="center"
      >
        <CurrentSpace space={space!} contentTypes={cts} user={user} />
      </Flex>
    </>
  );
};

export default Header;
