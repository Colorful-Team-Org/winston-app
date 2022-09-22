import { Box, Flex, Icon, Text, TextLink } from '@contentful/f36-components';
import { FC } from 'react';
import { CombinedSpaceProps } from 'types';
import { BiCube } from 'react-icons/bi';
import * as icons from '@contentful/f36-icons';
import { useQuery } from '@tanstack/react-query';
import { useCMA } from '@contentful/react-apps-toolkit';
import { getEntries } from 'app.service';
import OtherEntry from 'components/entries/other/OtherEntry';

import styles from './OtherSpace.styles';

type OtherSpaceProps = {
  data: CombinedSpaceProps;
};

const OtherSpace: FC<OtherSpaceProps> = (props: OtherSpaceProps) => {
  const cma = useCMA();

  const { data } = props;
  const { data: spaceData, isLoading } = useQuery(['entries', data.space.sys.id], async () => {
    const entryData = await getEntries(cma, {
      spaceId: data.space.sys.id,
      query: {
        limit: 6,
      },
    });

    return entryData;
  });

  return data.space && spaceData && !isLoading ? (
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
            {data.space.name}
          </Text>
        </Flex>
        <TextLink
          href={`${process.env.REACT_APP_CONTENTFUL_URL}/${data.space.sys.id}/content`}
          icon={<icons.ExternalLinkIcon />}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {data.space.name}
        </TextLink>
      </Flex>
      <Flex flexDirection="column" gap="spacingS">
        {spaceData.entries.items.length > 0 ? (
          spaceData.entries.items.map(e => (
            <OtherEntry
              key={e.sys.id}
              entry={e}
              users={spaceData.users.items}
              contentTypes={data.contentTypes.items}
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

export default OtherSpace;
