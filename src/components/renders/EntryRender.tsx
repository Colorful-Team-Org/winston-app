import { useCMA } from '@contentful/react-apps-toolkit';
import { fetchContentType, fetchUser } from 'app.service';
import CurrentEntry from 'components/entries/current/CurrentEntry';
import OtherEntry from 'components/entries/other/OtherEntry';
import { ContentTypeProps } from 'contentful-management';
import { FC, useEffect, useState } from 'react';
import { LocalUserProps, RenderEntryProps } from 'types';

const ENTRIES = {
  current: CurrentEntry,
  other: OtherEntry,
};

const EntryRender: FC<RenderEntryProps> = (props: RenderEntryProps) => {
  const cma = useCMA();
  const { entry, currentSpace } = props;
  const [user, setUser] = useState<LocalUserProps>();
  const [contentType, setContentType] = useState<ContentTypeProps>();

  const Entry = currentSpace ? ENTRIES['current'] : ENTRIES['other'];

  useEffect(() => {
    (async () => {
      const user = await fetchUser(cma, {
        userId: entry.sys.updatedBy?.sys.id,
        spaceId: entry.sys.space.sys.id,
      });
      setUser(user);

      const contentType = await fetchContentType(cma, {
        spaceId: entry.sys.space.sys.id,
        contentTypeId: entry.sys.contentType.sys.id,
      });
      setContentType(contentType);
    })();
  }, [entry, cma]);

  return (
    <>{user && contentType && <Entry user={user} contentType={contentType} entry={entry} />}</>
  );
};

export default EntryRender;
