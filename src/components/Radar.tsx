import { Quadrant } from '@components/Quadrant';

export const Radar = () => (
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
