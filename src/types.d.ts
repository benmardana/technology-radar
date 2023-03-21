export type QuadrantLabel = 'techniques' | 'tools' | 'platforms' | 'frameworks';

export const BLIP_STATUS = ['unchanged', 'new', 'movedIn', 'movedOut'] as const;

export type BlipType = typeof BLIP_STATUS[number];
