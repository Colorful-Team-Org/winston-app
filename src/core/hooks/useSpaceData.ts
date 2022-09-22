import { useQuery } from '@tanstack/react-query';
import { useSDK } from '@contentful/react-apps-toolkit';
import { setupApp } from 'app.service';
import useLocations from 'core/hooks/useLocations';

const useSpaceData = (useInstallLocations: boolean = false) => {
  const sdk = useSDK();
  const { locations: installLocations } = useLocations();

  const { data, isLoading } = useQuery(['spaces'], async () => {
    const spaces = [];
    const locations = useInstallLocations
      ? installLocations
      : [sdk.ids.space, ...(sdk.parameters.installation.selectedSpaces ?? [])];

    for (const spaceId of locations!) {
      const spaceData = await setupApp({ spaceId });
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
