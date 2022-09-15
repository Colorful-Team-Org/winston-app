import { Flex } from '@contentful/f36-components';
import { FC } from 'react';
import { ReactNode } from 'react';

type ContainerProps = {
  width?: string;
  children?: ReactNode;
  flexDirection?: any;
  gap?: string;
};

const Container: FC<ContainerProps> = ({
  width = '960px',
  flexDirection = 'column',
  gap = 'none',
  children,
}: ContainerProps) => (
  <Flex
    flexDirection={flexDirection}
    fullWidth={true}
    alignItems="center"
    gap={gap}
    style={{ maxWidth: width, margin: '0 auto' }}
  >
    {children}
  </Flex>
);

export default Container;
