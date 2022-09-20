import { FC } from 'react';
import { Box, Flex, Grid, Icon, Text } from '@contentful/f36-components';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { useQuery } from '@tanstack/react-query';
import { BiCube } from 'react-icons/bi';

import { ReactComponent as Logo } from 'images/colorful-coin-logo.svg';
import { CombinedSpaceProps } from 'types';
import CurrentEntry from 'components/entries/current/CurrentEntry';
import { getEntries } from 'app.service';

type CurrentSpaceProps = {
  data: CombinedSpaceProps;
};

const CurrentSpace: FC<CurrentSpaceProps> = (props: CurrentSpaceProps) => {
  const sdk = useSDK();
  const cma = useCMA();

  const { data } = props;
  const { data: currentSpaceData, isLoading } = useQuery(['entries', sdk.ids.space], async () => {
    const entryData = await getEntries(cma, {
      spaceId: sdk.ids.space,
      // query: { 'sys.updatedBy.sys.id': sdk.user.sys.id + '2' },
      query: {
        limit: 6,
        'sys.updatedBy.sys.id': sdk.user.sys.id,
      },
    });

    return entryData;
  });

  return data ? (
    <Flex fullWidth={true} flexDirection="column">
      <Flex fullWidth={true} alignItems="center" marginBottom="spacingL">
        <Box style={{ flex: '1' }}>
          <Flex as="span" gap="spacingS" alignItems="center" marginBottom="spacingS">
            <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
            <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
              {data.space.name}
            </Text>
          </Flex>
          <Text fontColor="gray800" as="h1" fontSize="fontSize2Xl" fontWeight="fontWeightDemiBold">
            Welcome back, {sdk.user.firstName} 👋
          </Text>
        </Box>
        <Box style={{ lineHeight: 1 }}>
          <Logo style={{ width: '110px' }} />
        </Box>
      </Flex>
      {/* <Flex flexDirection="row" gap="spacingL" flexWrap="wrap" alignItems="flex-start"> */}
      <Grid columns="repeat(3, minmax(0, 1fr))" columnGap="spacingL" rowGap="spacingL">
        {!isLoading &&
          currentSpaceData &&
          currentSpaceData.entries &&
          currentSpaceData.entries.items.map(e => (
            <>
              <CurrentEntry key={e.sys.id} contentTypes={data.contentTypes.items} entry={e} />
            </>
          ))}
        {/* </Flex> */}
      </Grid>
    </Flex>
  ) : (
    <>Space not found.</>
  );
};

export default CurrentSpace;
