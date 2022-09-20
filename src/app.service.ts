import { PlainClientAPI } from 'contentful-management';
import { FetchOptions } from 'types';

const setupApp = async (cma: PlainClientAPI, options: FetchOptions) => {
  const space = await cma.space.get({ spaceId: options.spaceId });
  const contentTypes = await cma.contentType.getMany({ spaceId: options.spaceId, limit: 1000 });

  return {
    space,
    contentTypes,
  };
};

const getEntries = async (cma: PlainClientAPI, options: FetchOptions) => {
  const entries = await cma.entry.getMany({
    spaceId: options.spaceId,
    query: { limit: 6, ...options.query },
  });
  const users = await cma.user.getManyForSpace({
    spaceId: options.spaceId,
    limit: 1000,
  });

  return {
    entries,
    users,
  };
};

export { setupApp, getEntries };
