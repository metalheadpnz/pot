import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { levelNames, screen } from '../constants/constants.ts';
import { getRndIndex, removeElementFromArray } from '../helpers/helpers.ts';

type WordsStoreType = {
  allWords: Array<string>;
  saucepanWords: Array<string>;
  redTeamWords: Array<string>;
  blueTeamWords: Array<string>;
  currentWord: string;
  currentStepWords: Array<string>;

  currentLevel: keyof typeof levelNames;
  currentScreen: screen;
  currentTeam: 'BLUE' | 'RED';

  addWords: (words: Array<string>) => void;
  reset: () => void;
  startGame: () => void;
  setCurrentScreen: (screen: screen) => void;
  setCurrentLevel: (lvl: keyof typeof levelNames) => void;
  nextStep: (matchWords: Array<string>, reverseWords: Array<string>) => void;
  nextLevel: () => void;

  getRandomWord: () => void;
  catchWord: () => void;
  startNextLevel: (nextLevel: keyof typeof levelNames) => void;
};

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
      currentTeam: 'RED',
      saucepanWords: [],
      redTeamWords: [],
      blueTeamWords: [],
      currentWord: '',
      currentStepWords: [],

      addWords: (words) =>
        set((state) => ({
          allWords: [...state.allWords, ...words],
        })),
      reset: () => {
        localStorage.clear();
        set({
          allWords: [],
          currentLevel: 0,
          currentScreen: screen.AddWords,
          currentWord: '',
          currentTeam: 'RED',
          blueTeamWords: [],
          redTeamWords: [],
          saucepanWords: [],
          currentStepWords: [],
        });
      },
      startGame: () => {
        set((state) => ({
          currentLevel: 1,
          currentScreen: screen.Game,
          saucepanWords: [...state.allWords],
          redTeamWords: [],
          blueTeamWords: [],
        }));
      },
      startNextLevel: (nextLevel: keyof typeof levelNames) => {
        set((state) => {
          return {
            currentLevel: nextLevel,
            currentScreen: screen.Game,
            saucepanWords: [...state.saucepanWords],
            redTeamWords: [],
            blueTeamWords: [],
          };
        });
      },

      setCurrentScreen: (screen) => {
        set({ currentScreen: screen });
      },
      nextStep: (matchWords, reverseWords) => {
        set((state) => {
          const teamKey =
            state.currentTeam === 'RED' ? 'redTeamWords' : 'blueTeamWords';
          return {
            [teamKey]: [...state[teamKey], ...matchWords],
            saucepanWords: [...state.saucepanWords, ...reverseWords],
            currentWord: '',
            currentStepWords: [],
            currentTeam: state.currentTeam === 'RED' ? 'BLUE' : 'RED',
            currentScreen: [...state.saucepanWords, ...reverseWords].length
              ? screen.Game
              : screen.Info,
          };
        });
      },
      getRandomWord: () => {
        set((state) => {
          return {
            currentWord: state.saucepanWords[getRndIndex(state.saucepanWords)],
          };
        });
      },
      catchWord: () => {
        set((state) => {
          const filteredSaucepanWords = removeElementFromArray(
            state.currentWord,
            [...state.saucepanWords],
          );

          return {
            saucepanWords: [...filteredSaucepanWords],
            currentStepWords: [...state.currentStepWords, state.currentWord],
            currentWord: filteredSaucepanWords.length
              ? filteredSaucepanWords[getRndIndex(filteredSaucepanWords)]
              : '',
            currentScreen: filteredSaucepanWords.length
              ? screen.Game
              : screen.Confirm,
          };
        });
      },
      nextLevel: () => {
        set((state) => {
          const nextLevel =
            state.currentLevel <= 3
              ? state.currentLevel + 1
              : state.currentLevel;
          return {
            currentLevel: nextLevel as keyof typeof levelNames,
            currentScreen: nextLevel < 4 ? screen.Game : screen.Info,
            saucepanWords: nextLevel < 4 ? [...state.allWords] : [],
          };
        });
      },
      setCurrentLevel: (lvl) => set({ currentLevel: lvl }),
    }),
    {
      name: 'words-storage',
    },
  ),
);
