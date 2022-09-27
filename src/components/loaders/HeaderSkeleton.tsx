import { Flex, Skeleton } from '@contentful/f36-components';

const HeaderSkeleton = () => (
  <Flex
    flexDirection="row"
    fullWidth={true}
    style={{ maxWidth: '960px', margin: '0 auto' }}
    alignItems="center"
  >
    <Skeleton.Container>
      <Skeleton.DisplayText lineHeight={50} width={500} />
      <Skeleton.Image offsetTop={60} width={304} height={113} />
      <Skeleton.Image offsetTop={60} offsetLeft={314} width={304} height={113} />
      <Skeleton.Image offsetTop={60} width={304} offsetLeft={628} height={113} />
    </Skeleton.Container>
  </Flex>
);

export default HeaderSkeleton;
