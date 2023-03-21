export type QuadrantLabel = 'tl' | 'tr' | 'bl' | 'br';

export const BLIP_STATUS = ['unchanged', 'new', 'movedIn', 'movedOut'] as const;

export type BlipType = typeof BLIP_STATUS[number];
