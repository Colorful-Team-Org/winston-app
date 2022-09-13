import { Flex } from '@contentful/f36-components';
import { FC } from 'react';
import { ReactNode } from 'react';

type ContainerProps = {
  width?: string;
  children?: ReactNode;
  flexDirection?: any;
};

const Container: FC<ContainerProps> = ({
  width = '960px',
  flexDirection = 'column',
  children,
}: ContainerProps) => (
  <Flex
    flexDirection={flexDirection}
    fullWidth={true}
    alignItems="center"
    style={{ maxWidth: width, margin: '0 auto' }}
  >
    {children}
  </Flex>
);

export default Container;
