import { useQuery } from '@tanstack/react-query';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { setupApp } from 'app.service';
import useLocations from './useLocations';

const useSpaceData = () => {
  const sdk = useSDK();
  const cma = useCMA();
  const { locations } = useLocations();

  const { data } = useQuery(
    ['spaces'],
    async () => {
      const spaces = [];

      for (const spaceId of locations!) {
        const spaceData = await setupApp(cma, { spaceId });
        spaces.push(spaceData);
      }

      return {
        ids: locations,
        primary: spaces.find(s => s.space.sys.id === sdk.ids.space),
        others: spaces.filter(s => s.space.sys.id !== sdk.ids.space),
      };
    },
    {
      enabled: !!locations,
    }
  );

  return {
    spacesData: data,
  };
};

export default useSpaceData;
