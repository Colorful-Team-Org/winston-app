import styles from './styles';
import { Box, Flex, Subheading, Text } from '@contentful/f36-components';

import * as icons from '@contentful/f36-icons';
import clsx from 'clsx';
// import { Entry } from 'types';

import TimeAgo from 'javascript-time-ago';

const OtherEntry = (props: any) => {
  const { entry, user, contentType } = props;
  const timeAgo = new TimeAgo('en-US');

  return (
    <Box as="div" className={clsx(styles.entry)} padding="spacingS">
      <Flex gap="spacingM" alignItems="center">
        <Box
          className={styles['published']}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
          }}
        />
        <Box style={{ width: '40%' }}>
          <Subheading isTruncated marginBottom="none">
            {entry.fields[contentType.displayField]['en-US']}
          </Subheading>
        </Box>
        <Box style={{ width: '15%' }}>
          <Text as="div" isTruncated>
            {contentType.name}
          </Text>
        </Box>
        <Box style={{ width: '15%' }}>
          <Flex fullWidth={true} alignItems="center" gap="spacingS">
            {user.avatar && (
              <Box
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <img src={user.avatar} alt={user.name} width="100%" />
              </Box>
            )}
            <Text isTruncated>{user.name}</Text>
          </Flex>
        </Box>
        <Box style={{ flex: '1' }}>{timeAgo.format(Date.parse(entry.sys.updatedAt))}</Box>
        <Box style={{ marginLeft: 'auto', lineHeight: 1 }}>
          <icons.ArrowForwardIcon variant="muted" size="medium" />
        </Box>
      </Flex>
    </Box>
  );
};
export default OtherEntry;
