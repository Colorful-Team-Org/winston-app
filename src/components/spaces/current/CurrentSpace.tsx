import { FC } from 'react';
import { Box, Flex, Grid, Icon, Text } from '@contentful/f36-components';
import { BiCube } from 'react-icons/bi';

import Logo from 'images/logo.png';
import CurrentEntry from 'components/entries/current/CurrentEntry';
import { SpaceProps, CollectionProp, ContentTypeProps, UserProps } from 'contentful-management';
import { useQuery } from '@tanstack/react-query';
import { getManyEntries } from 'app.service';
import { useSDK } from '@contentful/react-apps-toolkit';

type CurrentSpaceProps = {
  space: SpaceProps;
  contentTypes: CollectionProp<ContentTypeProps> | undefined;
  user: UserProps;
};

const CurrentSpace: FC<CurrentSpaceProps> = (props: CurrentSpaceProps) => {
  const sdk = useSDK();
  const { space, contentTypes, user } = props;

  const { data: entries, isLoading } = useQuery(['currentEntries'], () =>
    getManyEntries({
      spaceId: sdk.ids.space,
      query: {
        'sys.updatedBy.sys.id': user.sys.id,
      },
    })
  );

  return space ? (
    <Flex fullWidth={true} flexDirection="column">
      <Flex fullWidth={true} alignItems="center" marginBottom="spacingL">
        <Box style={{ flex: '1' }}>
          <Flex as="span" gap="spacingS" alignItems="center" marginBottom="spacingS">
            <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
            <Text fontSize="fontSizeL" fontColor="gray700" fontWeight="fontWeightMedium">
              {space.name}
            </Text>
          </Flex>
          <Text fontColor="gray800" as="h1" fontSize="fontSize2Xl" fontWeight="fontWeightDemiBold">
            Welcome back, {user.firstName} 👋
          </Text>
        </Box>
        <Box style={{ lineHeight: 1 }}>
          {/* <Logo style={{ width: '110px' }} /> */}
          <img src={Logo} width="170" alt="Winston App" />
        </Box>
      </Flex>
      <Grid columns="repeat(3, minmax(0, 1fr))" columnGap="spacingL" rowGap="spacingL">
        {!isLoading &&
          entries?.items.map((e: any, i: number) => (
            <CurrentEntry
              key={`${e.sys.id}_${i}`}
              contentTypes={contentTypes ? contentTypes.items : []}
              entry={e}
            />
          ))}
      </Grid>
    </Flex>
  ) : (
    <>Space not found.</>
  );
};

export default CurrentSpace;
