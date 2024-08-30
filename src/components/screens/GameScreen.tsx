import React, { useEffect, useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useWordsStore } from '../../store/words.ts';
import { useTimer } from '../../store/timer.ts';
import { levelsTime, screen } from '../../constants/constants.ts';
import radarSound from '../../assets/radarSound.mp3'

export const GameScreen = () => {
  const isRedTeam = useWordsStore((state) => state.currentTeam === 'RED');
  const timer = useTimer((state) => state.timer);
  const decrementTimer = useTimer((state) => state.decrementTimer);
  const setTimer = useTimer((state) => state.setTimer);
  const currentLevel = useWordsStore((state) => state.currentLevel);
  const getRandomWord = useWordsStore((state) => state.getRandomWord);
  const currentWord = useWordsStore((state) => state.currentWord);
  // const nextStep = useWordsStore((state) => state.nextStep);
  const catchWord = useWordsStore((state) => state.catchWord);
  const intervalId = useTimer((state) => state.intervalId);
  const setIntervalId = useTimer((state) => state.setIntervalId);
  const setCurrentScreen = useWordsStore((state) => state.setCurrentScreen);
  const radarSoundAudio = new Audio(radarSound)

  const [isActive, setIsActive] = useState(false);

  const startRoundBtnHandler = () => {
    setTimer(levelsTime[currentLevel]);
    const id = setInterval(decrementTimer, 1000);
    setIntervalId(id);
    setIsActive(true);
    getRandomWord();
  };

  const okBtnHandler = () => {
    catchWord();
  };

  useEffect(() => {
    if (timer <= 0) {
      intervalId && clearInterval(intervalId);
      isActive && setCurrentScreen(screen.Confirm);
      isActive &&  radarSoundAudio.play()
      setIsActive(false);
    }
  }, [timer]);

  return (
    <Stack gap={1}>
      {isActive ? (
        <>
          <Card
            elevation={3}
            sx={{
              padding: 2,
              marginY: '1rem',
            }}
          >
            <Stack gap={2} alignItems="center">
              <Typography variant="h6">{currentWord}</Typography>
            </Stack>
          </Card>
          <Button
            onClick={okBtnHandler}
            variant={'contained'}
            color={isRedTeam ? 'error' : 'primary'}
          >
            <Typography variant={'h5'}>ОК</Typography>
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: '1rem' }}
          color={isRedTeam ? 'error' : 'primary'}
          onClick={startRoundBtnHandler}
        >
          <Typography variant="h6">
            Команда {isRedTeam ? 'красных' : 'синих'} вперед
          </Typography>
        </Button>
      )}
    </Stack>
  );
};
