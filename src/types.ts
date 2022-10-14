import { QueryParams, SpaceProps, ContentTypeProps, CollectionProp } from 'contentful-management';
import { ReactNode } from 'react';
import type { PlainClientAPI } from 'contentful-management';
import type { KnownSDK } from '@contentful/app-sdk';

type RenderSpaceProps = {
  data: {
    primary: CombinedSpaceProps;
    others: CombinedSpaceProps[];
  };
  children?: ReactNode;
};

type FetchOptions = QueryParams & {
  spaceId: string;
  sdk?: KnownSDK;
};

type CombinedSpaceProps = {
  contentTypes: CollectionProp<ContentTypeProps>;
  space: SpaceProps;
};

export type AppStoreState = {
  sdk: KnownSDK | undefined;
  cma: PlainClientAPI | undefined;
  setCma: (cma: PlainClientAPI) => void;
};

export type SdkState = {
  sdk: KnownSDK | undefined;
  setSdk: (sdk: KnownSDK) => void;
};

export type SelectedContentType = {
  spaceId: string;
  id: string;
  displayField: string;
  name: string;
};

export type { RenderSpaceProps, FetchOptions, CombinedSpaceProps };
