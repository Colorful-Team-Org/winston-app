import styles from './styles';
import { Box, Flex, Text } from '@contentful/f36-components';

import * as icons from '@contentful/f36-icons';
import clsx from 'clsx';

type SpaceEntryProps = {
  className?: string;
};

const SpaceEntry = ({ className }: SpaceEntryProps) => (
  <Box
    as="a"
    href="#"
    className={clsx(styles.entry, className)}
    padding="spacingS"
  >
    <Flex gap="spacingM" alignItems="center">
      <Box
        className={styles['published']}
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
        }}
      />
      <Box style={{ flex: '1', maxWidth: '350px' }}>
        <Text
          isTruncated
          fontSize="fontSizeM"
          fontWeight="fontWeightDemiBold"
          fontColor="gray800"
        >
          Web Accessibility
        </Text>
      </Box>
      <Box style={{ flex: '1', maxWidth: '250px' }}>
        <Text isTruncated>Policy Page</Text>
      </Box>
      <Box style={{ flex: '1', maxWidth: '250px' }}>
        <Flex fullWidth={true} alignItems="center" gap="spacingS">
          <Box
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://www.gravatar.com/avatar/1a404d4ef0b7c03ece3260d194e2572c?s=50&d=https%3A%2F%2Favatars.contentful.com%2Finitials%2Fv1%2FEM%2F50"
              alt="Eric Miller"
              width="100%"
            />
          </Box>
          <Text isTruncated>Eric Miller</Text>
        </Flex>
      </Box>
      <Box style={{ flex: '1' }}>2 Hours Ago</Box>
      <Box style={{ marginLeft: 'auto', lineHeight: 1 }}>
        <icons.ArrowForwardIcon variant="muted" size="medium" />
      </Box>
    </Flex>
  </Box>
);
export default SpaceEntry;
