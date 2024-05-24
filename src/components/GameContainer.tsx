import React from 'react';
import { Box } from '@mui/material';
import { GameScreen } from './GameScreen.tsx';
import { AddWords } from './AddWords.tsx';
import { ConformScreen } from './ConformScreen.tsx';
import { InfoScreen } from './InfoScreen.tsx';
import { useWordsStore } from '../store/words.ts';
import { screen } from '../constants/constants.ts';

export const GameContainer = () => {
  const currentScreen = useWordsStore((state) => state.currentScreen);
  return (
    <Box padding={'1rem'} height={'100%'}>
      {currentScreen === screen.AddWords && <AddWords />}
      {currentScreen === screen.Game && <GameScreen />}
      {currentScreen === screen.Confirm && <ConformScreen />}
      {currentScreen === screen.Info && <InfoScreen />}
    </Box>
  );
};
