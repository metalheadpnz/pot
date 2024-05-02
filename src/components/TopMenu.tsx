import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppStore } from '../store/app.ts';
import { levelNames } from '../constants/constants.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ModalStartGame } from './ModalStartGame.tsx';

export const TopMenu = () => {
  const currentLevel = useAppStore(
    (state) => state.currentLevel,
  ) as keyof typeof levelNames;

  const [isOpen, setIsOpen] = useState(false);

  const playHandler = () => {
    setIsOpen(true);
  };
  return (
    <AppBar>
      <Toolbar>
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
              Игроков: 5
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
