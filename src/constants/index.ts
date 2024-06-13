import { Horse } from '@/types';

const distances: number[] = [1200, 1400, 1600, 1800, 2000, 2200];

const lapSize: number = distances.length;

const horseCountPerLap: number = 10;

const horseList: Horse[] = [
  { id: 101, name: 'Mystic Shadow', condition: 55, color: 'blue' },
  { id: 102, name: 'Obsidian Heart', condition: 43, color: 'green' },
  { id: 103, name: 'Eclipse Moon', condition: 35, color: 'black' },
  { id: 104, name: 'Ruby Flame', condition: 34, color: 'purple' },
  { id: 105, name: 'Silver Arrow', condition: 54, color: 'orange' },
  { id: 106, name: 'Golden Blaze', condition: 45, color: 'pink' },
  { id: 107, name: 'Emerald Breeze', condition: 66, color: 'brown' },
  { id: 108, name: 'Midnight Runner', condition: 34, color: 'cyan' },
  { id: 109, name: 'Bronze Streak', condition: 53, color: 'magenta' },
  { id: 110, name: 'Ironhoof', condition: 42, color: 'lime' },
  { id: 111, name: 'Blazing Comet', condition: 47, color: 'maroon' },
  { id: 112, name: 'Dark Whisper', condition: 41, color: 'navy' },
  { id: 113, name: 'Rapid Strike', condition: 52, color: 'olive' },
  { id: 114, name: 'Crimson Flash', condition: 57, color: 'teal' },
  { id: 115, name: 'Ivory Thunder', condition: 28, color: 'aqua' },
  { id: 116, name: 'Frostfire', condition: 24, color: 'fuchsia' },
  { id: 117, name: 'Stormchaser', condition: 66, color: 'silver' },
  { id: 118, name: 'Thunderbolt', condition: 32, color: 'gold' },
  { id: 119, name: 'Sapphire Wind', condition: 38, color: 'coral' },
  { id: 120, name: 'Lightning Dash', condition: 53, color: 'red' },
];

export { distances, lapSize, horseList, horseCountPerLap, Horse };
