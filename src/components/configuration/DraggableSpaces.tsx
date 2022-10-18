import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SortableCard from './SortableCard';
import { SpaceProps } from 'contentful-management';
import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import useConfigStore from 'core/stores/config.store';
import sortSpacesByArray from 'core/utils/sorting';
import { Flex } from '@contentful/f36-components';

type DraggableSpacesProps = {
  spaces: UseQueryResult<SpaceProps>[];
};

const DraggableSpaces = (props: DraggableSpacesProps) => {
  const { spaceOrder, setSpaceOrder } = useConfigStore();
  const [spaces, setSpaces] = useState<any[]>(() => {
    const reducedSpaces = props.spaces.reduce((acc: any, curr: UseQueryResult<SpaceProps>) => {
      return (acc = [...acc, ...[curr.data]]);
    }, []);

    return sortSpacesByArray(reducedSpaces, spaceOrder);
  });

  const reorder = (list: SpaceProps[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedSpaces: SpaceProps[] = reorder(
      spaces,
      result.source.index,
      result.destination.index
    );

    setSpaces(s => {
      setSpaceOrder(reorderedSpaces.map((s: SpaceProps) => s.sys.id));
      return reorderedSpaces;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="spaces">
        {provided => (
          <Flex
            flexDirection="column"
            gap="spacingS"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {spaces.map((space: SpaceProps, i: number) => (
              <SortableCard id={space.sys.id} {...space} key={space.sys.id} index={i} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableSpaces;
