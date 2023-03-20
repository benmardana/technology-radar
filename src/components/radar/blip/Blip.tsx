import { useDraggable } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/core/dist/types';
import React, { CSSProperties } from 'react';

interface DND {
  children: React.ReactNode;
  id: string | number;
  onClick?: () => void;
  className?: string;
  position?: Coordinates;
  styles?: CSSProperties;
}

export const DraggableBlip = ({
  id,
  children,
  className,
  position,
  styles,
  onClick,
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
    <button
      ref={setNodeRef}
      className={className}
      style={{ ...liveStyle, ...staticStyle, ...styles }}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
};
