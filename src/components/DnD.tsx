import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/core/dist/types';
import { CSSProperties } from 'react';

interface DND {
  children: React.ReactNode;
  id: string | number;
  className?: string;
  position?: Coordinates;
  styles?: CSSProperties;
}

export const Draggable = ({
  id,
  children,
  className,
  position,
  styles,
}: DND) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const liveStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const staticStyle = position
    ? { top: `${position.y}px`, left: `${position.x}px` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={className}
      style={{ ...liveStyle, ...staticStyle, ...styles }}
    >
      {children}
    </div>
  );
};

export const Droppable = ({ id, children, className }: DND) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
};
