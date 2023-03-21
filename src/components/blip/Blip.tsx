import { useDraggable } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/core/dist/types';
import { BlipType, QuadrantLabel } from '@types';
import { Moved, New, Unchanged } from './Icons';

interface BlipProps {
  id: string | number;
  position: Coordinates;
  status: BlipType;
  label: QuadrantLabel;
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
  tl: { top: '40px', left: '5px', bottom: 'auto', right: 'auto' },
  tr: { top: '40px', left: 'auto', bottom: 'auto', right: '5px' },
  bl: { top: 'auto', left: '5px', bottom: '40px', right: 'auto' },
  br: { top: 'auto', left: 'auto', bottom: '40px', right: '5px' },
};

export const Blip = ({
  id,
  position,
  status,
  label,
  touched,
  onClick,
}: BlipProps) => {
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

  const initialStyle = touched ? undefined : initialPositionMap[label];

  const BlipIcon = BLIP_ICON_MAP[status];

  return (
    <button
      ref={setNodeRef}
      className="blip"
      style={{ ...liveStyle, ...staticStyle, ...initialStyle }}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      <BlipIcon quadrant={label} out={status === 'movedOut'}>
        {id}
      </BlipIcon>
    </button>
  );
};
