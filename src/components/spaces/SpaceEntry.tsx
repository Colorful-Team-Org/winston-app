import styles from './styles';
import { Box, Flex } from '@contentful/f36-components';
import clsx from 'clsx';

type SpaceEntryProps = {
  className?: string;
};

const SpaceEntry = ({ className }: SpaceEntryProps) => (
  <Box className={clsx(styles.entry, className)} padding="spacingS">
    <Flex gap="spacingS" alignItems="center">
      <Box
        as="span"
        className={styles.spaceDot}
        style={{
          background: '#E1853D',
        }}
      />
      <span>Hey Dude</span>
    </Flex>
  </Box>
);
export default SpaceEntry;
