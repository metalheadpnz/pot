import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { defaultWordsCountCard, levelNames } from '../constants/constants.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useWordsStore } from '../store/words.ts';
import { Modal } from './Modal.tsx';

export const TopMenu = () => {
  const currentLevel = useWordsStore((state) => state.currentLevel);
  const playersCount =
    useWordsStore((state) => state.allWords).length / defaultWordsCountCard;
  const reset = useWordsStore((state) => state.reset);
  const startGame = useWordsStore((state) => state.startGame);

  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const playHandler = () => {
    setIsStartModalOpen(true);
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  const timeRemaining = '42';

  return (
    <AppBar>
      <Toolbar sx={{ paddingX: 3 }}>
        {currentLevel ? (
          <>
            <Typography
              onClick={openResetModal}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <span onClick={openResetModal}>{levelNames[currentLevel]}</span>
            </Typography>

            <Typography variant="h6" component="div" marginRight="2rem">
              {timeRemaining}
            </Typography>
            <Typography variant="h6" component="div">
              Ос: {5}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Игроков:
              <span onClick={openResetModal}> {playersCount}</span>
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
      <Modal
        isOpen={isStartModalOpen}
        setIsOpen={setIsStartModalOpen}
        onAgree={startGame}
        label={'Все игроки написали слова?'}
        text={'Жми ДА и погнали играть!'}
      />
      <Modal
        isOpen={isResetModalOpen}
        setIsOpen={setIsResetModalOpen}
        onAgree={reset}
        label={'Сбросить все данные?'}
        text={'Все игровые данные будут стерты'}
      />
    </AppBar>
  );
};
