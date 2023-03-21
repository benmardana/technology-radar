import { QuadrantLabel } from '@types';

export const New = ({ children }: { children: React.ReactNode }) => (
  <svg
    width={33}
    height={33}
    viewBox="-16.5 -16.5 33 33"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle style={{ fill: 'currentColor' }} rx="11" cy="0" cx="0" r="11" />
    <text
      x="0"
      y="1"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="12px"
      color="white"
      fontWeight="bold"
    >
      {children}
    </text>
    <circle
      style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '3px' }}
      cx="0"
      cy="0"
      rx="16.15"
      r="15"
    />
  </svg>
);

export const Unchanged = ({ children }: { children: React.ReactNode }) => (
  <svg
    width={33}
    height={33}
    viewBox="-16.5 -16.5 33 33"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle style={{ fill: 'currentColor' }} rx="11" cy="0" cx="0" r="11" />
    <text
      x="0"
      y="1"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="12px"
      color="white"
      fontWeight="bold"
    >
      {children}
    </text>
  </svg>
);

const rotationMap = {
  techniques: (out?: boolean) => (out ? 180 : 0),
  tools: (out?: boolean) => (out ? 270 : 90),
  platforms: (out?: boolean) => (out ? 90 : 270),
  frameworks: (out?: boolean) => (out ? 0 : 180),
};

export const Moved = ({
  children,
  quadrant,
  out,
}: {
  quadrant: QuadrantLabel;
  out?: boolean;
  children: React.ReactNode;
}) => (
  <svg
    width={33}
    height={33}
    viewBox="-16.5 -16.5 33 33"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle style={{ fill: 'currentColor' }} rx="11" cy="0" cx="0" r="11" />
    <text
      x="0"
      y="1"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="12px"
      color="white"
      fontWeight="bold"
    >
      {children}
    </text>
    <path
      style={{
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '3px',
        strokeLinecap: 'round',
        rotate: `${rotationMap[quadrant](out)}deg`,
      }}
      d="M 15 1 A 15 15 3 0 1 1 15"
    />
  </svg>
);
