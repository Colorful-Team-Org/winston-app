import { FetchOptions } from 'types';

import { getState as getCma } from 'core/stores/cmaStore';

const setupApp = async (options: FetchOptions) => {
  const { cma } = getCma();
  const space = await cma!.space.get({ spaceId: options.spaceId });
  const contentTypes = await cma!.contentType.getMany({ spaceId: options.spaceId, limit: 1000 });

  return {
    space,
    contentTypes,
  };
};

const getEntries = async (options: FetchOptions) => {
  const { cma } = getCma();

  const entries = await cma!.entry.getMany({
    spaceId: options.spaceId,
    query: { limit: 6, ...options.query },
  });
  const users = await cma!.user.getManyForSpace({
    spaceId: options.spaceId,
    limit: 1000,
  });

  return {
    entries,
    users,
  };
};

export { setupApp, getEntries };
