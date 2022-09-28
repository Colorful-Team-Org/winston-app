import { Flex, Skeleton } from '@contentful/f36-components';

const SpaceSkeleton = () => (
  <Flex style={{ width: '100%' }} gap="spacingL" flexDirection="column">
    <Skeleton.Container>
      <Skeleton.DisplayText lineHeight={30} width={300} />
      <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={40} />
      <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={100} />
    </Skeleton.Container>
    <Skeleton.Container>
      <Skeleton.DisplayText lineHeight={30} width={300} />
      <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={40} />
      <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={100} />
    </Skeleton.Container>
    <Skeleton.Container>
      <Skeleton.DisplayText lineHeight={30} width={300} />
      <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={40} />
      <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={100} />
    </Skeleton.Container>
  </Flex>
);

export default SpaceSkeleton;
