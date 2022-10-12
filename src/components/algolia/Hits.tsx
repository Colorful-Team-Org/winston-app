import { SpaceProps } from 'contentful-management';
import { getSpace } from 'app.service';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { Badge, Box, Heading, Paragraph } from '@contentful/f36-components';
import { useHits, useInstantSearch } from 'react-instantsearch-hooks-web';
import clsx from 'clsx';

import styles from './styles';

const findSpace = (spaceData: any, spaceId: string) => {
  return (
    (spaceData.find((s: any) => s.data.sys.id === spaceId) as UseQueryResult<SpaceProps>) ??
    undefined
  );
};

function NoResultsBoundary({ children, fallback }: any) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

const NoResults = (props: any) => (
  <Box className={clsx(props.className, { show: true })}>
    <Paragraph marginBottom="none">
      We could not find any results matching <strong>{props.searchterm}</strong> in connected
      spaces.
    </Paragraph>
  </Box>
);

const Hits = (props: any) => {
  const { hits, results } = useHits();
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
    <NoResultsBoundary
      fallback={
        <NoResults
          className={clsx(styles.searchResults, styles.noResults)}
          searchterm={results?.query}
        />
      }
    >
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
            <Badge variant="secondary" size="small" className={styles.subheading}>
              {findSpace(spaceData, hit.space) ? (
                findSpace(spaceData, hit.space)!.data!.name
              ) : (
                <>Unknown</>
              )}
            </Badge>
            <Heading as="h3">{hit.entry.title}</Heading>
            <Paragraph marginBottom="none" className={styles.resultBody}>
              {hit.entry.body}
            </Paragraph>
          </Box>
        ))}
      </Box>
    </NoResultsBoundary>
  ) : (
    <></>
  );
};

export default Hits;
