import { Skeleton } from '@contentful/f36-components';

const SpaceSkeleton = () => (
  <Skeleton.Container>
    <Skeleton.DisplayText lineHeight={30} width={300} />
    <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={40} />
    <Skeleton.DisplayText lineHeight={50} width={960} offsetTop={100} />
  </Skeleton.Container>
);

export default SpaceSkeleton;