import { Flex, Icon, Text, TextLink } from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons';

import { FC, useState, useEffect, ReactNode } from 'react';
import { BiCube } from 'react-icons/bi';
import SpaceEntry from './SpaceEntry';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { SpaceProps, EntryProps } from 'contentful-management';
import Loader from 'components/Loader';

type SpaceContainerProps = {
  spaceId: string;
  children?: ReactNode;
};
const SpaceContainer: FC<SpaceContainerProps> = (props: SpaceContainerProps) => {
  const cma = useCMA();
  const sdk = useSDK();
  const { spaceId, children } = props;
  const [space, setSpace] = useState<SpaceProps>();
  const [entries, setEntries] = useState<EntryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cma.space
      .get({ spaceId })
      .then(space => {
        setSpace(space);
        return space;
      })
      .then(async space => {
        const entries = await cma.entry.getMany({
          spaceId: space.sys.id,
          query: { limit: 6, 'sys.updatedBy.sys.id': '5klc0hsOFIiGeoD6plRZDy' },
        });

        setEntries(entries.items);
        setIsLoading(false);
      });
  }, [cma, spaceId]);

  const renderContainer = (
    <>
      <Flex
        as="div"
        flexDirection="row"
        marginBottom="spacingM"
        alignItems="center"
        fullWidth={true}
      >
        <Flex as="span" gap="spacingS" alignItems="center" style={{ flex: '1' }}>
          <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
          <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
            {space?.name}
          </Text>
        </Flex>
        <TextLink
          icon={<icons.ExternalLinkIcon />}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            sdk.dialogs.openCurrent({
              title: 'Test',
            });
          }}
        >
          Open Test
        </TextLink>
      </Flex>
      <Flex as="div" style={{ width: '100%' }} gap="spacingM" flexDirection="column">
        {children}
        {/* {entries.map(e => (
          <SpaceEntry setIsLoading={setIsLoading} entry={e} key={e.sys.id} />
        ))} */}
      </Flex>
    </>
  );

  return <>{isLoading ? <Loader /> : renderContainer}</>;
};

export default SpaceContainer;
