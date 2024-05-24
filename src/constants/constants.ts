export const levelNames = {
  0: 'Интро',
  1: 'Alias',
  2: 'Крокодил',
  3: 'Одним словом',
  4: 'Конец игры!',
} as const;

export const defaultWordsCountCard = 5;

export const startGameCaptcha: string = 'СЛ';

export const wordLength = 23;

export enum screen {
  AddWords = 'ADDWORDS',
  Game = 'GAME',
  Confirm = 'Confirm',
  Info = 'Info',
}

export const levelsTime = {
  0: 0,
  1: 40,
  2: 70,
  3: 15,
  4: 0,
} as const;
