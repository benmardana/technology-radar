import { Coordinates, UniqueIdentifier } from '@dnd-kit/core/dist/types';
import useLocalStorageState from 'use-local-storage-state';
import { QuadrantLabel } from '../Quadrant';
import { Fresh, Moved, Unchanged } from './Icons';

interface BlipData {
  id: UniqueIdentifier;
  position: Coordinates;
  touched: boolean;
  status: BlipType;
}

export const BLIP_STATUS = [
  'unchanged',
  'fresh',
  'movedIn',
  'movedOut',
] as const;
type BlipType = typeof BLIP_STATUS[number];

export const BLIP_ICON_MAP: Record<BlipType, Function> = {
  fresh: Fresh,
  unchanged: Unchanged,
  movedIn: Moved,
  movedOut: Moved,
};

const newBlip = (id: string) => ({
  id,
  position: { x: 0, y: 0 },
  touched: false,
  status: BLIP_STATUS[0],
});

export const useBlips = (key: QuadrantLabel) => {
  const [blips, setBlips] = useLocalStorageState<BlipData[]>(`blips-${key}`, {
    defaultValue: [],
  });

  const addBlip = () =>
    setBlips((blips) => [...blips, newBlip(`${blips.length + 1}`)]);

  const updateBlip = (
    id: UniqueIdentifier,
    updateFn: (blip: BlipData) => Partial<BlipData>
  ) =>
    setBlips((b) =>
      b.map((blip) => {
        if (blip.id === id) {
          return {
            ...blip,
            ...updateFn(blip),
          };
        }
        return blip;
      })
    );

  return { blips, addBlip, updateBlip };
};
