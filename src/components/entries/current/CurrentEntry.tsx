import { Box, Flex, Text } from '@contentful/f36-components';
import { ContentTypeProps, EntryProps } from 'contentful-management';

import * as icons from '@contentful/f36-icons';

import styles from './styles';

import TimeAgo from 'javascript-time-ago';

type CurrentEntryProps = {
  contentTypes: ContentTypeProps[];
  entry: EntryProps;
};

const CurrentEntry = (props: CurrentEntryProps) => {
  const { contentTypes, entry } = props;
  const timeAgo = new TimeAgo('en-US');

  const selectedContentType = contentTypes.find(ct => ct.sys.id === entry.sys.contentType.sys.id);

  return entry && selectedContentType ? (
    <Box
      as="a"
      href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${entry.sys.space.sys.id}/entries/${entry.sys.id}`}
      className={styles.entry}
    >
      <Flex flexDirection="column">
        <Flex flexDirection="row" gap="spacingM" padding="spacingM">
          <icons.EntryIcon variant="muted" className={styles.icon} size="medium" />
          <Flex style={{ minWidth: 0 }} flexDirection="column">
            <Box className={styles.title}>
              <Text fontWeight="fontWeightDemiBold" fontSize="fontSizeL">
                {entry.fields[selectedContentType.displayField]['en-US']}
              </Text>
            </Box>
            <Text isTruncated as="div" fontColor="gray500">
              {selectedContentType.name}
            </Text>
          </Flex>
        </Flex>
        <Box
          paddingTop="spacingXs"
          paddingBottom="spacingXs"
          paddingLeft="spacingM"
          paddingRight="spacingM"
          className={styles.footer}
        >
          <Text fontSize="fontSizeS" fontColor="gray500">
            You edited {timeAgo.format(Date.parse(entry.sys.updatedAt))}
          </Text>
        </Box>
      </Flex>
    </Box>
  ) : (
    <>Something went wrong.</>
  );
};

export default CurrentEntry;
