import { FetchOptions, SelectedContentType } from 'types';

import { getState as getAppState } from 'core/stores/appStore';
import { CollectionProp, EntryProps } from 'contentful-management';

const isCurrentSpace = (spaceId: string, currentSpaceId: string) => spaceId === currentSpaceId;

const setupApp = async (options: FetchOptions) => {
  const { cma } = getAppState();
  const space = await cma!.space.get({ spaceId: options.spaceId });
  const contentTypes = await cma!.contentType.getMany({ spaceId: options.spaceId, limit: 1000 });

  return {
    space,
    contentTypes,
  };
};

const getSpace = (spaceId: string) => {
  const { cma } = getAppState();

  return cma!.space.get({ spaceId });
};

const getContentTypes = (spaceId: string) => {
  const { cma } = getAppState();

  return cma!.contentType.getMany({ spaceId, limit: 1000, environmentId: 'master' });
};

const getEntries = async (options: FetchOptions) => {
  const { cma, sdk } = getAppState();
  const currentSpace = isCurrentSpace(options.spaceId, sdk!.ids.space);

  const entries = currentSpace ? await getManyEntries(options) : await getFilteredEntries(options);

  const users = await cma!.user.getManyForSpace({
    spaceId: options.spaceId,
    limit: 1000,
  });

  return {
    entries,
    users,
  };
};

const getUsers = (spaceId: string) => {
  const { cma } = getAppState();

  return cma!.user.getManyForSpace({
    spaceId,
    limit: 1000,
  });
};

const getFilteredEntries: any = async (options: FetchOptions) => {
  const { sdk } = getAppState();
  const selectedContentTypes: SelectedContentType[] =
    sdk!.parameters.installation.selectedContentTypes.filter(
      (ct: SelectedContentType) => ct.spaceId === options.spaceId
    );

  if (selectedContentTypes.length === 0) return [];

  const filteredEntries = await Promise.all(
    selectedContentTypes.map(ct =>
      getManyEntries({
        spaceId: options.spaceId,
        query: {
          ...options.query,
          limit: 100,
          content_type: ct.id,
        },
      })
    )
  );

  return filteredEntries.reduce(
    (prev: CollectionProp<EntryProps>, curr: CollectionProp<EntryProps>) => {
      return {
        ...curr,
        total: prev.total + curr.total,
        items: [...prev.items, ...curr.items],
      };
    },
    {
      limit: 0,
      sys: { type: 'Array' },
      skip: 0,
      items: [],
      total: 0,
    } as CollectionProp<EntryProps>
  );
};

const getManyEntries = (options: FetchOptions) => {
  const { cma } = getAppState();

  return cma!.entry.getMany({
    environmentId: 'master',
    spaceId: options.spaceId,
    query: { limit: 6, ...options.query },
  });
};

export {
  setupApp,
  getEntries,
  getSpace,
  getContentTypes,
  getManyEntries,
  getUsers,
  getFilteredEntries,
};
