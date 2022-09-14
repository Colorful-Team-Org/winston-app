import { Space } from '@/types/Space';
import { Flex, Icon, Text, TextLink } from '@contentful/f36-components';
import * as icons from '@contentful/f36-icons';

import { FC } from 'react';
import { BiCube } from 'react-icons/bi';
import SpaceEntry from './SpaceEntry';

type SpaceContainerProps = {
  space: Space;
};
const SpaceContainer: FC<SpaceContainerProps> = (
  props: SpaceContainerProps
) => {
  const { space } = props;

  return (
    <>
      <Flex
        as="div"
        flexDirection="row"
        marginBottom="spacingM"
        alignItems="center"
        fullWidth={true}
      >
        <Flex
          as="span"
          gap="spacingS"
          alignItems="center"
          style={{ flex: '1' }}
        >
          <Icon as={BiCube} color="primary" size="medium" variant="secondary" />
          <Text
            fontSize="fontSizeL"
            fontColor="gray700"
            fontWeight="fontWeightMedium"
          >
            {space.name}
          </Text>
        </Flex>
        <TextLink
          href={`/spaces/${space.id}`}
          icon={<icons.ExternalLinkIcon />}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {space.name}
        </TextLink>
      </Flex>
      <Flex
        as="div"
        style={{ width: '100%' }}
        gap="spacingM"
        flexDirection="column"
      >
        <SpaceEntry />
        <SpaceEntry />
        <SpaceEntry />
      </Flex>
    </>
  );
};

export default SpaceContainer;
