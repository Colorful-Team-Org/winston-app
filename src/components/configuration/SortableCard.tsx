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
import { useCallback, useState } from 'react';

import style from './SortableCard.styles';
import { getContentTypes } from 'app.service';
import { useQuery } from '@tanstack/react-query';
import useConfigStore from '../../core/stores/config.store';
import { Draggable } from 'react-beautiful-dnd';
import { SelectedContentType } from 'types';

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
  const [isExpanded, setIsExpanded] = useState(selectedSpaces.includes(id));

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
        (selected: SelectedContentType) =>
          selected.spaceId === ct.sys.space.sys.id && selected.id === ct.sys.id
      );

      if (foundIndex > -1) {
        removeContentType(foundIndex);
      } else {
        addContentType({
          spaceId: ct.sys.space.sys.id,
          id: ct.sys.id,
          name: ct.name,
          displayField: ct.displayField,
        });
      }
    },
    [selectedContentTypes, addContentType, removeContentType]
  );

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <Flex
          as="div"
          flexWrap="wrap"
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          alignItems="center"
        >
          <Flex alignItems="center" gap="spacingS" className={style.toggleBtn}>
            <SortableDragHandle {...provided.dragHandleProps} />
            <Checkbox
              id={sys.id}
              value={sys.id}
              key={`${sys.id}`}
              isChecked={selectedSpaces.includes(sys.id)}
              onChange={() => toggleSpaceIds(sys.id)}
            />
            <ToggleButton
              isActive={selectedSpaces.includes(sys.id)}
              onToggle={() => setIsExpanded(!isExpanded)}
            >
              <Flex gap="spacingS" alignItems="center">
                <strong>{name}</strong>
                <Text fontColor="gray600">({sys.id})</Text>
              </Flex>
            </ToggleButton>
          </Flex>
          {!ctLoading && (
            <Collapse isExpanded={isExpanded} style={{ width: '100%' }}>
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
                            selectedCt.id === ct.sys.id &&
                            selectedCt.spaceId === ct.sys.space.sys.id
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
