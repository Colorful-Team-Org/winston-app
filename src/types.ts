import {
  EntryProps,
  QueryParams,
  SpaceProps,
  ContentTypeProps,
  UserProps,
  CollectionProp,
} from 'contentful-management';
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
  entries: CollectionProp<EntryProps>;
  space: SpaceProps;
  users: CollectionProp<UserProps>;
};

export type { RenderSpaceProps, FetchOptions, CombinedSpaceProps };
