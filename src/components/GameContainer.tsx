import React from 'react';
import { Box } from '@mui/material';
import { GameScreen } from './GameScreen.tsx';
import { AddWords } from './AddWords.tsx';

export const GameContainer = () => {
  // const setCurrentLevel = useAppStore((state) => state.setCurrentLevel);
  return (
    <Box padding={'1rem'} height={'100%'}>
      {/*<GameScreen />*/}
      <AddWords />
    </Box>
  );
};
