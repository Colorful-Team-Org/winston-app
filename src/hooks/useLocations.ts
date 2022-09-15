import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { AppInstallationProps } from 'contentful-management';
import { AppInstallationsForOrganizationProps } from 'contentful-management/dist/typings/entities/app-definition';
import { useState, useEffect } from 'react';

const uniqueSpaces = (locs: AppInstallationProps[]): string[] =>
  Array.from(new Set(locs.map(loc => loc.sys.space.sys.id)));

const useLocations = () => {
  const cma = useCMA();
  const sdk = useSDK();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [spaceIds, setSpaceIds] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);

    cma.appDefinition
      .getInstallationsForOrg({
        organizationId: sdk.ids.organization,
        appDefinitionId: sdk.ids.app!,
      })
      .then((locs: AppInstallationsForOrganizationProps) => locs.items)
      .then((spaces: AppInstallationProps[]) =>
        uniqueSpaces(spaces).filter(s => s !== sdk.ids.space)
      )
      .then((ids: string[]) => {
        setIsLoading(false);
        setSpaceIds(ids);
      });
  }, [sdk.ids.organization, sdk.ids.app, cma, sdk.ids.space]);

  return { isLoading, spaceIds };
};

export default useLocations;
