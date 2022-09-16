import { FC, useEffect, useMemo, useState } from 'react';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { QueryOptions } from 'contentful-management';

import { fetchEntry } from 'app.service';
import { RenderCollectionProps } from 'types';
import EntryRender from './EntryRender';

const CollectionRender: FC<RenderCollectionProps> = (props: RenderCollectionProps) => {
  const cma = useCMA();
  const sdk = useSDK();
  const { spaceId, currentSpace } = props;
  const [entry, setEntry] = useState<any>();

  const query = useMemo<QueryOptions>(() => {
    if (currentSpace) {
      return {
        limit: 6,
        'sys.updatedBy.sys.id': sdk.user.sys.id,
      };
    }
    return { limit: 6 };
  }, [currentSpace, sdk.user.sys.id]);

  useEffect(() => {
    (async () => {
      const entry = await fetchEntry(cma, {
        spaceId: spaceId,
        query,
      });

      setEntry(entry);
    })();
  }, [cma, spaceId, query]);

  return (
    <>
      {entry &&
        entry.items.map((entry: any) => (
          <EntryRender key={entry.sys.id} currentSpace={currentSpace} entry={entry} />
        ))}
    </>
  );
};

export default CollectionRender;
