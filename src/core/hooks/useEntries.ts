import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { useQuery } from '@tanstack/react-query';
import { getEntries } from 'app.service';

const useEntries = (spaceId: string, currentSpace: boolean = false) => {
  const cma = useCMA();
  const sdk = useSDK();
  const currentQuery = currentSpace ? { 'sys.updatedBy.sys.id': sdk.user.sys.id } : {};

  return useQuery(['entries', spaceId], async () => {
    const entryData = await getEntries(cma, {
      spaceId: spaceId,
      query: {
        limit: 6,
        ...currentQuery,
      },
    });

    return entryData;
  });
};

export default useEntries;