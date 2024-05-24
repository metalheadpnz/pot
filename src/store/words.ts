import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { levelNames, screen } from '../constants/constants.ts';

type WordsStoreType = {
  allWords: Array<string>;
  currentLevel: keyof typeof levelNames;
  currentScreen: screen;

  addWords: (words: Array<string>) => void;
  reset: () => void;
  startGame: () => void;
  setCurrentLevel: (lvl: keyof typeof levelNames) => void;
};

const wordsExaple = [
  'СЛОВО',
  'БЛАБЛАБЛА',
  'ДЛИННОЕСЛОВАОАВПФВЫАПВА',
  'ФЛЮГЕГЕХАЙМЕН',
  'СОСИ ЖОПУ',
  'АПАВПСЧМОААВЫАВАВЫАЫФВА',
  'АЫВАВЫ',
  'ВВВ',
  'АК',
  'П',
  'АВЫТА',
  'СЛОВО',
  'СЛОВОЙ',
  'КУСАЙ',
  'ЗА',
  'НОС',
  'ПРИЕХЗАЛИ',
  'СЛИШКОМ',
  'МНОГО',
  'МАЛО',
];

// export const useWordsStore = create<WordsStoreType>((set) => ({
//   allWords: [],
//   addWords: (words) =>
//     set((state) => ({
//       allWords: [...state.allWords, ...words],
//     })),
// }));

export const useWordsStore = create<WordsStoreType>(
  (
    persist as (
      config: StateCreator<WordsStoreType>,
      options: PersistOptions<WordsStoreType>,
    ) => StateCreator<WordsStoreType>
  )(
    (set) => ({
      allWords: [],
      currentLevel: 0,
      currentScreen: screen.AddWords,

      addWords: (words) =>
        set((state) => ({
          allWords: [...state.allWords, ...words],
        })),
      reset: () => {
        // localStorage.removeItem('words-storage');
        localStorage.clear();
        set({ allWords: [], currentLevel: 0, currentScreen: screen.AddWords });
      },
      startGame: () => {
        set({ currentLevel: 1, currentScreen: screen.Game });
      },
      setCurrentLevel: (lvl) => set({ currentLevel: lvl }),
    }),
    {
      name: 'words-storage',
      // getStorage: () => localStorage,
    },
  ),
);
