import { Quadrant } from './Quadrant';
import './radar.css';

export const Radar = () => {
  return (
    <div className="radar">
      <div className="quadrantRow">
        <Quadrant label="tl" />
        <Quadrant label="tr" />
      </div>
      <div className="quadrantRow">
        <Quadrant label="bl" />
        <Quadrant label="br" />
      </div>
    </div>
  );
};
