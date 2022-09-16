import { PlainClientAPI, SpaceProps } from 'contentful-management';
import { FetchOptions } from 'types';

const fetchSpace = async (
  cma: PlainClientAPI,
  options: FetchOptions
): Promise<SpaceProps | undefined> => {
  try {
    const space = await cma.space.get({ spaceId: options.spaceId });
    return space;
  } catch (error) {
    return undefined;
  }
};

const fetchEntry = async (cma: PlainClientAPI, options: FetchOptions) => {
  const entry = await cma.entry.getMany({
    spaceId: options.spaceId,
  });

  return entry;
};

const fetchUser = async (cma: PlainClientAPI, options: FetchOptions & { userId?: string }) => {
  if (!options.userId) {
    return {
      name: 'Unknown',
      avatar: null,
    };
  }
  const user = await cma.user.getForSpace({
    userId: options.userId,
    spaceId: options.spaceId,
  });

  return {
    name: `${user.firstName} ${user.lastName}`,
    avatar: user.avatarUrl,
  };
};

const fetchContentType = async (
  cma: PlainClientAPI,
  options: FetchOptions & { contentTypeId: string }
) => {
  const user = await cma.contentType.get({
    spaceId: options.spaceId,
    contentTypeId: options.contentTypeId,
  });

  return user;
};

export { fetchSpace, fetchEntry, fetchUser, fetchContentType };
