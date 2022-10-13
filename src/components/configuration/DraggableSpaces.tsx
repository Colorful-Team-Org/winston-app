import {
  DndContext,
  DragEndEvent,
  useDroppable,
  PointerSensor,
  useSensors,
  useSensor,
  closestCenter,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';
import { SpaceProps } from 'contentful-management';
import { Flex } from '@contentful/f36-components';
import { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type DraggableSpacesProps = {
  spaces: UseQueryResult<SpaceProps>[];
};

const DraggableSpaces = (props: DraggableSpacesProps) => {
  const { setNodeRef } = useDroppable({ id: 'spaces' });
  const sensors = useSensors(useSensor(PointerSensor));
  const [spaces, setSpaces] = useState<any[]>([]);

  useEffect(() => {
    setSpaces(
      props.spaces.reduce((acc: any, curr: UseQueryResult<SpaceProps>) => {
        return (acc = [...acc, ...[curr.data]]);
      }, [])
    );
  }, [props.spaces]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSpaces(s => {
        const activeIndex = s.findIndex(s => s.sys.id === active.id);
        const swapIndex = s.findIndex(s => s.sys.id === over.id);

        return arrayMove(s, activeIndex, swapIndex);
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
      <SortableContext items={spaces} strategy={rectSortingStrategy}>
        <Flex flexDirection="column" gap="spacingS" ref={setNodeRef}>
          {spaces.map((space: SpaceProps) => (
            <SortableCard id={space.sys.id} {...space} key={space.sys.id} />
          ))}
        </Flex>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableSpaces;
