import {
  Card,
  Checkbox,
  DragHandle,
  Heading,
  Flex,
  Collapse,
  Button,
} from '@contentful/f36-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SpaceProps, ContentTypeProps } from 'contentful-management';
import { useState } from 'react';
import * as icons from '@contentful/f36-icons';

import style from './SortableCard.styles';
import { getContentTypes } from 'app.service';
import { useQuery } from '@tanstack/react-query';

type SortableCardProps = SpaceProps & {
  id: string;
  toggleCt: (ct: ContentTypeProps) => void;
};

type SpaceStateProps = {
  contentTypes: ContentTypeProps[];
};

const SortableDragHandle = (props: any) => (
  <DragHandle as="button" style={{ alignSelf: 'stretch' }} label="Move card" {...props} />
);

const SortableCard = (props: SortableCardProps) => {
  const { id, sys, name, toggleCt } = props;

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: contentTypes, isLoading: ctLoading } = useQuery(
    ['contentTypes', sys.id],
    () => getContentTypes(sys.id),
    {
      suspense: false,
      staleTime: Infinity,
    }
  );

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    cursor: 'default',
  };

  return (
    <Card
      ref={setNodeRef}
      style={cardStyle}
      dragHandleRender={() => <SortableDragHandle {...listeners} {...attributes} />}
      withDragHandle
      padding="none"
    >
      <Flex flexDirection="column">
        <Button
          variant="transparent"
          isFullWidth={true}
          className={style.sortableHeader}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Flex alignItems="center" fullWidth={true} as="div">
            <Heading as="h2" marginBottom="none" isTruncated>
              {name}
            </Heading>
            {!isExpanded ? (
              <icons.ChevronRightTrimmedIcon style={{ marginLeft: 'auto' }} size="large" />
            ) : (
              <icons.ChevronDownTrimmedIcon style={{ marginLeft: 'auto' }} size="large" />
            )}
          </Flex>
        </Button>
        <Collapse isExpanded={isExpanded}>
          <Flex flexDirection="column" gap="spacingXs" padding="spacingM" paddingTop="none">
            {contentTypes?.items.map((ct: ContentTypeProps) => (
              <Checkbox
                id={ct.sys.id}
                value={ct.sys.id}
                key={`${ct.sys.space.sys.id}-${ct.sys.id}`}
                onChange={() => toggleCt(ct)}
              >
                {ct.name}
              </Checkbox>
            ))}
          </Flex>
        </Collapse>
      </Flex>
    </Card>
  );
};

export default SortableCard;
