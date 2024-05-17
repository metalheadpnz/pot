import { create } from 'zustand';

type WordsStoreType = {
  allWords: Array<string>;
  addWords: (words: Array<string>) => void;
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

export const useWordsStore = create<WordsStoreType>((set) => ({
  allWords: [],
  addWords: (words) =>
    set((state) => ({
      allWords: [...state.allWords, ...words],
    })),
}));
