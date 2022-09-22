import { Box, Flex, Icon, Text, TextLink } from '@contentful/f36-components';
import { FC, Suspense } from 'react';
import { CombinedSpaceProps } from 'types';
import { BiCube } from 'react-icons/bi';
import * as icons from '@contentful/f36-icons';
import DefaultEntry from 'components/entries/default/DefaultEntry';

import styles from './styles';
import useEntries from 'core/hooks/useEntries';

type OtherSpaceProps = {
  data: CombinedSpaceProps;
};

const OtherSpace: FC<OtherSpaceProps> = (props: OtherSpaceProps) => {
  const { data } = props;
  const { data: spaceData, isLoading } = useEntries(data.space.sys.id);

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
          href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${data.space.sys.id}/content`}
          icon={<icons.ExternalLinkIcon />}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {data.space.name}
        </TextLink>
      </Flex>
      <Flex flexDirection="column" gap="spacingS">
        <Suspense fallback={<div>Loading...</div>}>
          {spaceData.entries.items.length > 0 ? (
            spaceData.entries.items
              .slice(0, 6)
              .map((e: any) => (
                <DefaultEntry
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
        </Suspense>
      </Flex>
    </Box>
  ) : (
    <>Space Not Found</>
  );
};

export default OtherSpace;
