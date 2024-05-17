import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppStore } from '../store/app.ts';
import { defaultWordsCountCard, levelNames } from '../constants/constants.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ModalStartGame } from './ModalStartGame.tsx';
import { useWordsStore } from '../store/words.ts';

export const TopMenu = () => {
  const currentLevel = useAppStore(
    (state) => state.currentLevel,
  ) as keyof typeof levelNames;
  const playersCount =
    useWordsStore((state) => state.allWords).length / defaultWordsCountCard;
  const _words = useWordsStore((state) => state.allWords);
  const [isOpen, setIsOpen] = useState(false);

  const playHandler = () => {
    setIsOpen(true);
    console.log(_words);
  };
  return (
    <AppBar>
      <Toolbar sx={{ paddingX: 3 }}>
        {currentLevel ? (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {levelNames[currentLevel]}
            </Typography>
            <Typography variant="h6" component="div">
              Остаток: {5}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Игроков: {playersCount}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={playHandler}
            >
              <PlayArrowIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
      <ModalStartGame isOpen={isOpen} setIsOpen={setIsOpen} />
    </AppBar>
  );
};
