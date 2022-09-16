import { EntryProps, QueryParams, SpaceProps, ContentTypeProps } from 'contentful-management';
import { ReactNode } from 'react';

type RenderSpaceProps = {
  space: SpaceProps | undefined;
  children?: ReactNode;
};

type RenderCollectionProps = {
  spaceId: string;
  currentSpace: boolean;
};

type RenderEntryProps = {
  entry: EntryProps;
  currentSpace: boolean;
};

type LocalUserProps = {
  name: string;
  avatar: string | null;
};

type Entry = {
  entry: EntryProps;
  user: LocalUserProps;
  contentType: ContentTypeProps;
};

type FetchOptions = QueryParams & {
  spaceId: string;
};

export type {
  RenderSpaceProps,
  RenderEntryProps,
  RenderCollectionProps,
  FetchOptions,
  Entry,
  LocalUserProps,
};
