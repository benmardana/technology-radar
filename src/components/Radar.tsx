import { Quadrant } from '@components/Quadrant';
import { useState } from 'react';

export const Radar = () => {
  const [, updateState] = useState<any>();
  const handleOnClickClearAll = () => {
    localStorage.clear();
    updateState({});
  };
  return (
    <>
      <span>Short press individual blips to cycle their type.</span>
      &nbsp;&nbsp;&nbsp;
      <span>Click here to clear all blips: </span>
      <button className="fancy-button" onClick={handleOnClickClearAll}>
        Clear all
      </button>
      <div className="radar">
        <div className="quadrantRow">
          <Quadrant label="techniques" />
          <Quadrant label="tools" />
        </div>
        <div className="quadrantRow">
          <Quadrant label="platforms" />
          <Quadrant label="frameworks" />
        </div>
      </div>
    </>
  );
};
