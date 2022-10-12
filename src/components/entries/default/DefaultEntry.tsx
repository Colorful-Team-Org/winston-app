import styles from './styles';
import { Box, Flex, Subheading, Text, Tooltip } from '@contentful/f36-components';

import * as icons from '@contentful/f36-icons';
import clsx from 'clsx';
// import { Entry } from 'types';

import TimeAgo from 'javascript-time-ago';
import { ContentTypeProps, EntryProps, UserProps } from 'contentful-management';

type DefaultEntryProps = {
  contentTypes: ContentTypeProps[] | undefined;
  entry: EntryProps;
  users: UserProps[] | undefined;
};

const DefaultEntry = (props: DefaultEntryProps) => {
  const { contentTypes, entry, users } = props;
  const timeAgo = new TimeAgo('en-US');

  const status = entry.sys.publishedAt ? 'Published' : entry.sys.archivedAt ? 'Archived' : 'Draft';
  const selectedContentType = contentTypes
    ? contentTypes.find(ct => ct.sys.id === entry.sys.contentType.sys.id)
    : null;
  const selectedUser = users
    ? users.find(user => user.sys.id === entry.sys.updatedBy?.sys.id)
    : null;

  return (
    <Box
      as="a"
      href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${entry.sys.space.sys.id}/entries/${entry.sys.id}`}
      target="_blank"
      rel="nofollow"
      className={clsx(styles.entry)}
      padding="spacingS"
    >
      <Flex gap="spacingM" alignItems="center">
        <Tooltip placement="top" id={entry.sys.id} content={status}>
          <Box
            className={styles[status]}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          />
        </Tooltip>
        <Box style={{ width: '40%' }}>
          <Subheading isTruncated marginBottom="none">
            {selectedContentType && entry.fields[selectedContentType.displayField]
              ? entry.fields[selectedContentType.displayField]['en-US']
              : 'Unknown'}
          </Subheading>
        </Box>
        <Box style={{ width: '15%' }}>
          <Text as="div" isTruncated>
            {selectedContentType ? selectedContentType.name : 'N/A'}
          </Text>
        </Box>
        <Box style={{ width: '15%' }}>
          <Flex fullWidth={true} alignItems="center" gap="spacingS">
            {selectedUser && selectedUser.avatarUrl && (
              <Box
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <img src={selectedUser.avatarUrl} alt={selectedUser.firstName} width="100%" />
              </Box>
            )}
            <Text isTruncated>
              {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : 'N/A'}
            </Text>
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
export default DefaultEntry;
