import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useAppStore } from '../store/app.ts';
import { AddWords } from './AddWords.tsx';

export const GameContainer = () => {
  const setCurrentLevel = useAppStore((state) => state.setCurrentLevel);
  return (
    <Box padding={'1rem'} height={'100%'}>
      {/*<Button*/}
      {/*  variant={'contained'}*/}
      {/*  onClick={() => {*/}
      {/*    setCurrentLevel(Math.ceil(Math.random() * 3));*/}
      {/*  }}*/}
      {/*>*/}
      {/*  rnd*/}
      {/*</Button>*/}
      <AddWords />
    </Box>
  );
};
