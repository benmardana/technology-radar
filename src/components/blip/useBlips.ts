import useLocalStorageState from 'use-local-storage-state';
import { Coordinates, UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { BlipType, BLIP_STATUS, QuadrantLabel } from '@types';

interface BlipData {
  id: UniqueIdentifier;
  position: Coordinates;
  touched: boolean;
  status: BlipType;
}

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

  const toggleBlipType = (id: UniqueIdentifier) =>
    updateBlip(id, (blip) => ({
      status: BLIP_STATUS[(BLIP_STATUS.indexOf(blip.status) + 1) % 4],
    }));

  return { blips, addBlip, updateBlip, toggleBlipType };
};
