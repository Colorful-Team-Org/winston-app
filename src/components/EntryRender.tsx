import { QueryParams } from 'contentful-management';
type EntryProps = {
  spaceId: string;
  currentSpace: boolean;
};
type FetchOptions = QueryParams & {
  spaceId: string;
};

const EntryRender = () => {};

// const fetchEntities = async (cma: PlainClientAPI, options: FetchOptions) => {
//   const entries = await cma.entry.getMany({
//     spaceId: options.spaceId,
//   });
//   const contentType = await cma.contentType.get({
//     contentTypeId: 'landingPage',
//     spaceId: options.spaceId,
//   });

//   console.log(contentType);
// };

export default EntryRender;
