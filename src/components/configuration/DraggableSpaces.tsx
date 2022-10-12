import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';
import { SpaceProps } from 'contentful-management';
import { Flex } from '@contentful/f36-components';

const DraggableSpaces = (props: any) => {
  const { setNodeRef } = useDroppable({ id: 'spaces' });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={props.spaces} strategy={rectSortingStrategy}>
        <Flex flexDirection="column" gap="spacingS" ref={setNodeRef}>
          {props.spaces.map((space: SpaceProps) => (
            <SortableCard id={space.sys.id} {...space} toggleCt={props.toggleCt} />
          ))}
        </Flex>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableSpaces;
