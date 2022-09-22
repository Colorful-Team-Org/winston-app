import { useQuery } from '@tanstack/react-query';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { setupApp } from 'app.service';

const useSpaceData = () => {
  const sdk = useSDK();
  const cma = useCMA();

  const { data, isLoading } = useQuery(['spaces'], async () => {
    const spaces = [];
    const locations = [sdk.ids.space, ...sdk.parameters.installation.selectedSpaces];

    for (const spaceId of locations!) {
      const spaceData = await setupApp(cma, { spaceId });
      spaces.push(spaceData);
    }

    return {
      ids: locations,
      primary: spaces.find(s => s.space.sys.id === sdk.ids.space),
      others: spaces.filter(s => s.space.sys.id !== sdk.ids.space),
    };
  });

  return {
    spacesData: data,
    isLoading,
  };
};

export default useSpaceData;
