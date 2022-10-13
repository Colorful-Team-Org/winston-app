import {
  Checkbox,
  DragHandle,
  Flex,
  Collapse,
  ToggleButton,
  Text,
  Grid,
} from '@contentful/f36-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SpaceProps, ContentTypeProps } from 'contentful-management';
import { useCallback, useState } from 'react';

import style from './SortableCard.styles';
import { getContentTypes } from 'app.service';
import { useQuery } from '@tanstack/react-query';
import useConfigStore from '../../locations/configuration/config.store';

type SortableCardProps = SpaceProps & {
  id: string;
};

const SortableDragHandle = (props: any) => (
  <DragHandle as="button" style={{ alignSelf: 'stretch' }} label="Move card" {...props} />
);

const SortableCard = (props: SortableCardProps) => {
  const { id, sys, name } = props;
  const { selectedContentTypes, addContentType, removeContentType, toggleSpaceIds } =
    useConfigStore();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
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

  const toggleCt = useCallback(
    (ct: ContentTypeProps) => {
      const foundIndex = selectedContentTypes.findIndex(
        (selected: ContentTypeProps) =>
          selected.sys.space.sys.id === ct.sys.space.sys.id && selected.sys.id === ct.sys.id
      );

      if (foundIndex > -1) {
        removeContentType(foundIndex);
      } else {
        addContentType(ct);
      }
    },
    [selectedContentTypes, addContentType, removeContentType]
  );

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
  };

  return (
    <Flex
      as="div"
      flexDirection="column"
      className={style.toggleBtn}
      style={cardStyle}
      ref={setNodeRef}
    >
      <ToggleButton
        isActive={isExpanded}
        onToggle={() => toggleSpaceIds(id)}
        className={style.toggleBtn}
      >
        <Flex gap="spacingS" alignItems="center">
          <SortableDragHandle {...attributes} {...listeners} />
          <Checkbox id={sys.id} value={sys.id} key={`${sys.id}`} />
          <strong>{name}</strong>
          <Text fontColor="gray600">({sys.id})</Text>
        </Flex>
      </ToggleButton>
      {!ctLoading && (
        <Collapse isExpanded={true}>
          <Grid
            columnGap="spacingS"
            rowGap="spacingS"
            padding="spacingM"
            paddingTop="none"
            className={style.contentTypeContainer}
            columns="1fr 1fr 1fr"
          >
            {contentTypes?.items.map((ct: ContentTypeProps) => (
              <Grid.Item>
                <Checkbox
                  id={ct.sys.id}
                  value={ct.sys.id}
                  key={`${ct.sys.space.sys.id}-${ct.sys.id}`}
                  onChange={() => toggleCt(ct)}
                >
                  {ct.name}
                </Checkbox>
              </Grid.Item>
            ))}
          </Grid>
        </Collapse>
      )}
    </Flex>
  );
};

export default SortableCard;
