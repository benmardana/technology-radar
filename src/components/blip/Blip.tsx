import { renderToStaticMarkup } from 'react-dom/server';
import { useDraggable } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/core/dist/types';
import { BlipType, QuadrantLabel } from '@types';
import { Moved, New, Unchanged } from './Icons';
import { useMemo } from 'react';

interface BlipProps {
  id: string | number;
  position: Coordinates;
  status: BlipType;
  label: QuadrantLabel;
  name: string;
  touched?: boolean;
  onClick?: () => void;
}

const BLIP_ICON_MAP = {
  new: New,
  unchanged: Unchanged,
  movedIn: Moved,
  movedOut: Moved,
};

const initialPositionMap = {
  techniques: { top: '17.5%', left: '22%', bottom: 'auto', right: 'auto' },
  tools: { top: '17.5%', left: 'auto', bottom: 'auto', right: '22%' },
  platforms: { top: 'auto', left: '22%', bottom: '17.5%', right: 'auto' },
  frameworks: { top: 'auto', left: 'auto', bottom: '17.5%', right: '22%' },
};

const colorMap = {
  techniques: '#47A1AD',
  tools: '#6b9e78',
  platforms: '#CC850A',
  frameworks: '#F2617A',
};

export const Blip = ({
  id,
  position,
  status,
  label,
  name,
  touched,
  onClick,
}: BlipProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
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

  const initialStyle = touched ? undefined : initialPositionMap[label];

  const BlipIcon = BLIP_ICON_MAP[status];

  return (
    <button
      className="blip"
      ref={setNodeRef}
      style={{
        ...liveStyle,
        ...staticStyle,
        ...initialStyle,
        color: colorMap[label],
      }}
      onClick={onClick}
      data-tooltip-id="tooltip"
      data-tooltip-html={renderToStaticMarkup(
        <div data-transform={JSON.stringify(transform)}>{name}</div>
      )}
      {...listeners}
      {...attributes}
    >
      <BlipIcon quadrant={label} out={status === 'movedOut'}>
        {id}
      </BlipIcon>
    </button>
  );
};
