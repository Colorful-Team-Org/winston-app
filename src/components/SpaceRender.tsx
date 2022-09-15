import { PlainClientAPI, QueryParams, SpaceProps } from 'contentful-management';
import { useEffect, useState } from 'react';
import { useCMA } from '@contentful/react-apps-toolkit';
import SpaceEntry from './spaces/SpaceEntry';
import CurrentSpace from './CurrentSpace';

type SpaceRenderProps = {
  currentSpace: boolean;
  spaceId: string;
};

type FetchOptions = QueryParams & {
  spaceId: string;
};

const SPACE_COMPONENTS = {
  current: CurrentSpace,
  other: CurrentSpace,
};

const ENTRY_COMPONENTS = {
  current: () => <>Test</>,
  other: SpaceEntry,
};

const SpaceRender = (props: SpaceRenderProps) => {
  const cma = useCMA();
  const { currentSpace, spaceId } = props;
  const [space, setSpace] = useState<SpaceProps>();
  const Component = currentSpace ? SPACE_COMPONENTS['current'] : SPACE_COMPONENTS['other'];
  // const Entry = currentSpace ? ENTRY_COMPONENTS['current'] : ENTRY_COMPONENTS['other'];

  useEffect(() => {
    (async () => {
      const space = await fetchSpace(cma, {
        spaceId: spaceId,
        query: { limit: 6 },
      });

      setSpace(space);
    })();
  }, [cma, spaceId]);

  return <Component space={space} />;
};

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

export default SpaceRender;
