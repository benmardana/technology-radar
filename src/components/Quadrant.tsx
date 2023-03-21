import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { QuadrantLabel } from '@types';
import { useState } from 'react';
import { Blip, useBlips } from './blip';
import quadrant from '/quadrant.svg';

const getX = (element: EventTarget) =>
  (element as HTMLElement).parentElement?.parentElement?.offsetLeft ?? 0;
const getY = (element: EventTarget) =>
  (element as HTMLElement).parentElement?.parentElement?.offsetTop ?? 0;

export const Quadrant = ({ label }: { label: QuadrantLabel }) => {
  const { blips, addBlip, updateBlip, toggleBlipType } = useBlips(label);
  const [newBlipName, setNewBlipName] = useState('');

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

  const handleOnClickAddBlip = () => {
    addBlip(newBlipName);
    setNewBlipName('');
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
          <input
            type="text"
            placeholder="New blip name"
            value={newBlipName}
            onChange={(e) => setNewBlipName(e.target.value)}
          />
          <button
            className="fancy-button"
            disabled={!newBlipName}
            onClick={handleOnClickAddBlip}
          >
            Add blip
          </button>
        </div>
        {blips.length
          ? blips.map(({ id, position, touched, status, name }) => (
              <Blip
                key={id}
                id={id}
                label={label}
                position={position}
                touched={touched}
                status={status}
                name={name}
                onClick={() => toggleBlipType(id)}
              />
            ))
          : null}
      </div>
    </DndContext>
  );
};
