import { Box } from '@contentful/f36-components';
import { ContentTypeProps, EntryProps } from 'contentful-management';

type CurrentEntryProps = {
  contentTypes: ContentTypeProps[];
  entry: EntryProps;
};

const CurrentEntry = (prop: CurrentEntryProps) => {
  const { contentTypes, entry } = prop;

  const selectedContentType = contentTypes.find(ct => ct.sys.id === entry.sys.contentType.sys.id);

  return entry && selectedContentType ? (
    <Box style={{ flex: '1 1 30%' }}>
      <div>{entry.fields[selectedContentType.displayField]['en-US']}</div>
    </Box>
  ) : (
    <>Something went wrong.</>
  );
};

export default CurrentEntry;
