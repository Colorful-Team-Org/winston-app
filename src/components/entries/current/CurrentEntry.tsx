import { Box, Flex, Text } from '@contentful/f36-components';
import { EntryProps, ContentTypeProps } from 'contentful-management';

import * as icons from '@contentful/f36-icons';

import styles from './styles';

import TimeAgo from 'javascript-time-ago';
import { useMemo } from 'react';

type CurrentEntryProps = {
  contentTypes: ContentTypeProps[];
  entry: EntryProps;
};

const CurrentEntry = (props: CurrentEntryProps) => {
  const { contentTypes, entry } = props;
  const timeAgo = new TimeAgo('en-US');

  const selectedContentType = useMemo(
    () => contentTypes.find(ct => ct.sys.id === entry.sys.contentType.sys.id),
    [contentTypes, entry]
  );

  return entry && selectedContentType ? (
    <Box
      as="a"
      href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${entry.sys.space.sys.id}/entries/${entry.sys.id}`}
      className={styles.entry}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Flex flexDirection="column">
        <Flex flexDirection="row" gap="spacingM" padding="spacingM">
          <icons.EntryIcon variant="muted" className={styles.icon} size="medium" />
          <Flex style={{ minWidth: 0 }} flexDirection="column">
            <Box className={styles.title}>
              <Text fontWeight="fontWeightDemiBold" fontSize="fontSizeL">
                {entry.fields[selectedContentType.displayField]
                  ? entry.fields[selectedContentType.displayField]['en-US']
                  : 'Unknown'}
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
