import {
  Checkbox,
  DragHandle,
  Flex,
  Collapse,
  ToggleButton,
  Text,
  Grid,
} from '@contentful/f36-components';
import { SpaceProps, ContentTypeProps } from 'contentful-management';
import { useCallback } from 'react';

import style from './SortableCard.styles';
import { getContentTypes } from 'app.service';
import { useQuery } from '@tanstack/react-query';
import useConfigStore from '../../core/stores/config.store';
import { Draggable } from 'react-beautiful-dnd';

type SortableCardProps = SpaceProps & {
  id: string;
  index: number;
};

const SortableDragHandle = (props: any) => (
  <DragHandle as="div" style={{ alignSelf: 'stretch' }} label="Move card" {...props} />
);

const SortableCard = (props: SortableCardProps) => {
  const { id, sys, name, index } = props;
  const {
    selectedContentTypes,
    selectedSpaces,
    addContentType,
    removeContentType,
    toggleSpaceIds,
  } = useConfigStore();

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

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <Flex
          as="div"
          flexDirection="column"
          className={style.toggleBtn}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
        >
          <ToggleButton
            isActive={selectedSpaces.includes(sys.id)}
            onToggle={() => toggleSpaceIds(id)}
            className={style.toggleBtn}
          >
            <Flex gap="spacingS" alignItems="center">
              <SortableDragHandle {...provided.dragHandleProps} />
              <Checkbox
                id={sys.id}
                value={sys.id}
                key={`${sys.id}`}
                isChecked={selectedSpaces.includes(sys.id)}
                onChange={() => {}}
              />
              <strong>{name}</strong>
              <Text fontColor="gray600">({sys.id})</Text>
            </Flex>
          </ToggleButton>
          {!ctLoading && (
            <Collapse isExpanded={selectedSpaces.includes(sys.id)}>
              <Grid
                columnGap="spacingS"
                rowGap="spacingS"
                padding="spacingM"
                paddingTop="none"
                className={style.contentTypeContainer}
                columns="1fr 1fr 1fr"
              >
                {contentTypes?.items.map((ct: ContentTypeProps) => (
                  <Grid.Item key={`${ct.sys.space.sys.id}-${ct.sys.id}`}>
                    <Checkbox
                      id={`${ct.sys.space.sys.id}-${ct.sys.id}`}
                      value={ct.sys.id}
                      onChange={() => toggleCt(ct)}
                      isChecked={
                        selectedContentTypes.findIndex(
                          selectedCt =>
                            selectedCt.sys.id === ct.sys.id &&
                            selectedCt.sys.space.sys.id === ct.sys.space.sys.id
                        ) > -1
                      }
                    >
                      {ct.name}
                    </Checkbox>
                  </Grid.Item>
                ))}
              </Grid>
            </Collapse>
          )}
        </Flex>
      )}
    </Draggable>
  );
};

export default SortableCard;
