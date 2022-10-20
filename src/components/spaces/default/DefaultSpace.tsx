import { Box, Flex, Icon, Text, TextLink } from '@contentful/f36-components';
import { FC, useEffect, useState } from 'react';
import { BiCube } from 'react-icons/bi';
import * as icons from '@contentful/f36-icons';
import DefaultEntry from 'components/entries/default/DefaultEntry';

import { useQuery } from '@tanstack/react-query';
import {
  SpaceProps,
  CollectionProp,
  ContentTypeProps,
  UserProps,
  EntryProps,
} from 'contentful-management';
import { getSpace, getContentTypes, getUsers, getFilteredEntries } from 'app.service';

import styles from './styles';

type DefaultSpaceProps = {
  spaceId: string;
};

const DefaultSpace: FC<DefaultSpaceProps> = (props: DefaultSpaceProps) => {
  const { spaceId } = props;
  const { data: space } = useQuery<SpaceProps>(['space', spaceId], () => getSpace(spaceId));
  const { data: users } = useQuery<CollectionProp<UserProps>>(['users', spaceId], () =>
    getUsers(spaceId)
  );
  const { data: cts } = useQuery<CollectionProp<ContentTypeProps>>(['cts', spaceId], () =>
    getContentTypes(spaceId)
  );
  const { data: entries, isLoading } = useQuery<CollectionProp<EntryProps>>(
    ['entries', spaceId],
    () => getFilteredEntries({ spaceId })
  );

  const [sortedEntries, setSortedEntries] = useState<EntryProps[]>([]);

  useEffect(() => {
    console.log(entries);
    if (!entries || !entries.items.length) return;

    const sorted = entries.items.sort((a, b) => {
      const aDate = new Date(a.sys.updatedAt);
      const bDate = new Date(b.sys.updatedAt);

      return bDate.getTime() - aDate.getTime();
    });

    setSortedEntries(sorted.slice(0, 6));
  }, [entries]);

  return space ? (
    <Box>
      <Flex
        as="div"
        flexDirection="row"
        alignItems="center"
        fullWidth={true}
        marginBottom="spacingS"
      >
        <Flex as="h2" gap="spacingS" alignItems="center" style={{ flex: '1' }}>
          <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
          <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
            {space.name}
          </Text>
        </Flex>
        <TextLink
          href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${space.sys.id}/content`}
          icon={<icons.ExternalLinkIcon />}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Space
        </TextLink>
      </Flex>
      <Flex flexDirection="column" gap="spacingS">
        {!isLoading && sortedEntries.length > 0 ? (
          sortedEntries.map((e: EntryProps, i: number) => (
            <DefaultEntry
              key={`${e.sys.id}_${i}`}
              entry={e}
              contentTypes={cts?.items}
              users={users?.items}
            />
          ))
        ) : (
          <Box className={styles.empty} padding="spacingM">
            Recently updated entries will show up here.
          </Box>
        )}
      </Flex>
    </Box>
  ) : (
    <>Space Not Found</>
  );
};

export default DefaultSpace;
