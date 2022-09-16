import { SpaceProps } from 'contentful-management';
import { FC, useEffect, useState } from 'react';
import { useCMA } from '@contentful/react-apps-toolkit';
import CurrentSpace from '../spaces/CurrentSpace';
import OtherSpace from '../spaces/OtherSpace';
import CollectionRender from './CollectionRender';
import { fetchSpace } from 'app.service';

type SpaceRenderProps = {
  currentSpace: boolean;
  spaceId: string;
};

const SPACE_COMPONENTS = {
  current: CurrentSpace,
  other: OtherSpace,
};

const SpaceRender: FC<SpaceRenderProps> = (props: SpaceRenderProps) => {
  const cma = useCMA();
  const { currentSpace, spaceId } = props;
  const [space, setSpace] = useState<SpaceProps>();
  const Component = currentSpace ? SPACE_COMPONENTS['current'] : SPACE_COMPONENTS['other'];

  useEffect(() => {
    (async () => {
      const space = await fetchSpace(cma, {
        spaceId: spaceId,
        query: { limit: 6 },
      });

      setSpace(space);
    })();
  }, [cma, spaceId]);

  return (
    <Component space={space}>
      <CollectionRender spaceId={spaceId} currentSpace={currentSpace} />
    </Component>
  );
};

export default SpaceRender;
