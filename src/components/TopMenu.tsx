import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { defaultWordsCountCard, levelNames } from '../constants/constants.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useWordsStore } from '../store/words.ts';
import { Modal } from './Modal.tsx';
import { useTimer } from '../store/timer.ts';

export const TopMenu = () => {
  const currentLevel = useWordsStore((state) => state.currentLevel);
  const playersCount =
    useWordsStore((state) => state.allWords).length / defaultWordsCountCard;
  const reset = useWordsStore((state) => state.reset);
  const startGame = useWordsStore((state) => state.startGame);
  const saucepanWordsCount = useWordsStore(
    (state) => state.saucepanWords.length,
  );

  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const playHandler = () => {
    setIsStartModalOpen(true);
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  const startBtnHandler = () => {
    if (playersCount) {
      startGame();
    } else {
      alert('Нужно добавить игроков');
    }
  };

  const timer = useTimer((state) => state.timer);

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
              {timer}
            </Typography>
            <Typography variant="h6" component="div">
              в кастрюле: {saucepanWordsCount}
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
        onAgree={startBtnHandler}
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
