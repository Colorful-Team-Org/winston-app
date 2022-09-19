import { Flex, Spinner } from '@contentful/f36-components';

const Loader = () => (
  <>
    <Flex fullHeight={true} fullWidth={true} alignItems="center" justifyContent="center">
      <Spinner customSize={75} />
    </Flex>
  </>
);

export default Loader;
