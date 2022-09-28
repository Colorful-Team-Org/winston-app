import { SpaceProps } from 'contentful-management';
import { getSpace } from 'app.service';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { Box, Heading, Paragraph, SectionHeading } from '@contentful/f36-components';
import { useHits, useInstantSearch } from 'react-instantsearch-hooks-web';
import clsx from 'clsx';

import styles from './styles';

const findSpace = (spaceData: any, spaceId: string) => {
  return (
    (spaceData.find((s: any) => s.data.sys.id === spaceId) as UseQueryResult<SpaceProps>) ??
    undefined
  );
};

export const NoResults = (props: any) => (
  <Box className={clsx(props.className, { show: true })}>
    <Paragraph marginBottom="none">No results found</Paragraph>
  </Box>
);

const Hits = (props: any) => {
  const { hits } = useHits();
  const { indexUiState } = useInstantSearch();

  const spaces = Array.from(new Set(hits.map(hit => hit.space))) as string[];
  const spaceData = useQueries({
    queries: spaces.map(sId => ({
      queryKey: ['space', sId],
      queryFn: () => getSpace(sId),
      staleTime: Infinity,
    })),
  });

  return !spaceData.some(s => s.isLoading) ? (
    <Box className={clsx(props.className, { show: indexUiState.query })}>
      {hits.map((hit: any, i: number) => (
        <Box
          as="a"
          href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${
            findSpace(spaceData, hit.space).data!.sys.id
          }/entries/${hit.entry.id}`}
          key={hit.entry.id + '_' + i}
          target="_blank"
        >
          <SectionHeading marginBottom="none" className={styles.subheading}>
            {findSpace(spaceData, hit.space) ? (
              findSpace(spaceData, hit.space)!.data!.name
            ) : (
              <>Unknown</>
            )}
          </SectionHeading>
          <Heading as="h3">{hit.entry.title}</Heading>
          <Paragraph marginBottom="none" isTruncated={true}>
            {hit.entry.body}
          </Paragraph>
        </Box>
      ))}
    </Box>
  ) : (
    <>Loading...</>
  );
};

export default Hits;
