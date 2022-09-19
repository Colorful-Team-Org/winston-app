import { Box, Flex, Icon, Text, TextLink } from '@contentful/f36-components';
import { FC, ReactNode } from 'react';
import { CombinedSpaceProps } from 'types';
import { BiCube } from 'react-icons/bi';
import * as icons from '@contentful/f36-icons';

type OtherSpaceProps = {
  data: CombinedSpaceProps;
  children?: ReactNode[];
};

const OtherSpace: FC<OtherSpaceProps> = (props: OtherSpaceProps) => {
  const { children, data } = props;

  return data.space ? (
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
          href={`https://app.contentful.com/spaces/${data.space.sys.id}/content`}
          icon={<icons.ExternalLinkIcon />}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {data.space.name}
        </TextLink>
      </Flex>
      <Flex flexDirection="column" gap="spacingS">
        {children}
      </Flex>
    </Box>
  ) : (
    <>Space Not Found</>
  );
};

export default OtherSpace;
