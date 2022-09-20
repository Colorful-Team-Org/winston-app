import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { useQuery } from '@tanstack/react-query';
import { getEntries } from 'app.service';

const useCurrentSpace = () => {
  const sdk = useSDK();
  const cma = useCMA();
  const { data, isLoading } = useQuery(['entries', sdk.ids.space], async () => {
    const entryData = await getEntries(cma, {
      spaceId: sdk.ids.space,
      // query: { 'sys.updatedBy.sys.id': sdk.user.sys.id + '2' },
      query: {
        limit: 1,
      },
    });

    return entryData;
  });

  return { data, isLoading };
};

export default useCurrentSpace;
