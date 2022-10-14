import { SpaceProps } from 'contentful-management';

function sortSpacesByArray(arrayToSort: SpaceProps[], arrayToSortBy: string[]): SpaceProps[] {
  return arrayToSort.sort((a: SpaceProps, b: SpaceProps) => {
    const index1 = arrayToSortBy.indexOf(a.sys.id);
    const index2 = arrayToSortBy.indexOf(b.sys.id);

    return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
  });
}

export default sortSpacesByArray;
