export const levelNames = {
  0: 'Интро',
  1: 'Alias',
  2: 'Крокодил',
  3: 'Одним словом',
} as const;

export const defaultWordsCountCard = 5;

export const startGameCaptcha: string = '111';

export const wordLength = 23;

export enum screen {
  AddWords = 'ADDWORDS',
  Game = 'GAME',
  Confirm = 'Confirm',
  Info = 'Info',
}
