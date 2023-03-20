import { Droppable } from '../DnD';
import quadrant from '/quadrant.svg';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { BLIP_ICON_MAP, BLIP_STATUS, useBlips } from './blip/useBlips';
import { DraggableBlip } from './blip/Blip';

export type QuadrantLabel = 'tl' | 'tr' | 'bl' | 'br';

const initialPositionMap = {
  tl: { top: '40px', left: '5px', bottom: 'auto', right: 'auto' },
  tr: { top: '40px', left: 'auto', bottom: 'auto', right: '5px' },
  bl: { top: 'auto', left: '5px', bottom: '40px', right: 'auto' },
  br: { top: 'auto', left: 'auto', bottom: '40px', right: '5px' },
};

const getX = (element: EventTarget) =>
  (element as HTMLElement).parentElement?.parentElement?.offsetLeft ?? 0;
const getY = (element: EventTarget) =>
  (element as HTMLElement).parentElement?.parentElement?.offsetTop ?? 0;

export const Quadrant = ({ label }: { label: QuadrantLabel }) => {
  const { blips, addBlip, updateBlip } = useBlips(label);

  const handleOnDragEnd = (event: DragEndEvent) => {
    updateBlip(event.active.id, (blip) => ({
      touched: true,
      position: {
        x:
          (blip.touched
            ? blip.position.x
            : getX(event.activatorEvent.target!)) + event.delta.x,
        y:
          (blip.touched
            ? blip.position.y
            : getY(event.activatorEvent.target!)) + event.delta.y,
      },
    }));
  };

  const handleOnClick = (id: UniqueIdentifier) => {
    updateBlip(id, (blip) => ({
      status: BLIP_STATUS[(BLIP_STATUS.indexOf(blip.status) + 1) % 4],
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 100,
      },
    })
  );

  return (
    <DndContext
      onDragEnd={handleOnDragEnd}
      modifiers={[restrictToParentElement]}
      sensors={sensors}
    >
      <Droppable id={label} className="quadrant">
        <img src={quadrant} alt="" className={`backdrop ${label}`} />
        <button onClick={addBlip} className={`addBlip ${label}`}>
          Add blip
        </button>
        {blips.length
          ? blips.map(({ id, position, touched, status }) => {
              const Element = BLIP_ICON_MAP[status];
              return (
                <DraggableBlip
                  key={id}
                  id={id}
                  className="blip"
                  position={position}
                  styles={!touched ? initialPositionMap[label] : undefined}
                  onClick={() => handleOnClick(id)}
                >
                  <Element quadrant={label} out={status === 'movedOut'}>
                    {id}
                  </Element>
                </DraggableBlip>
              );
            })
          : null}
      </Droppable>
    </DndContext>
  );
};
