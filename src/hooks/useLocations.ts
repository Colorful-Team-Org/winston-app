import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { AppInstallationProps } from 'contentful-management';
import { useQuery } from '@tanstack/react-query';

const uniqueSpaces = (locs: AppInstallationProps[]): string[] =>
  Array.from(new Set(locs.map(loc => loc.sys.space.sys.id)));

const useLocations = () => {
  const cma = useCMA();
  const sdk = useSDK();

  const { data: locations } = useQuery(['locations'], () =>
    cma.appDefinition
      .getInstallationsForOrg({
        organizationId: sdk.ids.organization,
        appDefinitionId: sdk.ids.app!,
      })
      .then(locs => uniqueSpaces(locs.items))
  );

  return {
    locations,
  };
};

export default useLocations;
