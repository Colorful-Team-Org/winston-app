import { QueryParams, SpaceProps, ContentTypeProps, CollectionProp } from 'contentful-management';
import { ReactNode } from 'react';

type RenderSpaceProps = {
  data: {
    primary: CombinedSpaceProps;
    others: CombinedSpaceProps[];
  };
  children?: ReactNode;
};

type FetchOptions = QueryParams & {
  spaceId: string;
};

type CombinedSpaceProps = {
  contentTypes: CollectionProp<ContentTypeProps>;
  space: SpaceProps;
};

export type { RenderSpaceProps, FetchOptions, CombinedSpaceProps };
