import { SpaceProps } from 'contentful-management';

function sortSpacesByArray(arrayToSort: SpaceProps[], arrayToSortBy: string[]): SpaceProps[] {
  if (!arrayToSortBy) return arrayToSort;

  return arrayToSort.sort((a: SpaceProps, b: SpaceProps) => {
    const index1 = arrayToSortBy.indexOf(a.sys.id);
    const index2 = arrayToSortBy.indexOf(b.sys.id);

    return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
  });
}
export function sortStringsByArray(arrayToSort: string[], arrayToSortBy: string[]): string[] {
  if (!arrayToSortBy) return arrayToSort;

  return arrayToSort.sort((a: string, b: string) => {
    const index1 = arrayToSortBy.indexOf(a);
    const index2 = arrayToSortBy.indexOf(b);

    return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
  });
}

export default sortSpacesByArray;
