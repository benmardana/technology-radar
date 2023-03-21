import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { QuadrantLabel } from '@types';
import { Blip, useBlips } from './blip';
import quadrant from '/quadrant.svg';

const getX = (element: EventTarget) =>
  (element as HTMLElement).parentElement?.parentElement?.offsetLeft ?? 0;
const getY = (element: EventTarget) =>
  (element as HTMLElement).parentElement?.parentElement?.offsetTop ?? 0;

export const Quadrant = ({ label }: { label: QuadrantLabel }) => {
  const { blips, addBlip, updateBlip, toggleBlipType } = useBlips(label);

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
      <div id={label} className="quadrant">
        <img src={quadrant} alt="" className={`backdrop ${label}`} />
        <div className={`label ${label}`}>
          <h2>{label}</h2>
          <button className="fancy-button" onClick={addBlip}>
            Add blip
          </button>
        </div>
        {blips.length
          ? blips.map(({ id, position, touched, status }) => (
              <Blip
                key={id}
                id={id}
                label={label}
                position={position}
                touched={touched}
                status={status}
                onClick={() => toggleBlipType(id)}
              />
            ))
          : null}
      </div>
    </DndContext>
  );
};
