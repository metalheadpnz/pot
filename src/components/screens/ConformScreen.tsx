import React, { useEffect, useState } from 'react';
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useTimer } from '../../store/timer.ts';
import { useWordsStore } from '../../store/words.ts';

type WordsToBeConformedType = {
  label: string;
  checked: boolean;
};

export const ConformScreen = () => {
  const setTimer = useTimer((state) => state.setTimer);
  const intervalId = useTimer((state) => state.intervalId);
  const test = useWordsStore((state) => state.currentStepWords);
  const nextStep = useWordsStore((state) => state.nextStep);
  const isRedTeam = useWordsStore((state) => state.currentTeam === 'RED');
  const [wordsToBeConformed, setWordsToBeConformed] = useState<
    Array<WordsToBeConformedType>
  >(test.map((w) => ({ label: w, checked: true })));

  useEffect(() => {
    setTimer(0);
    intervalId && clearInterval(intervalId);
  }, []);

  const handleCheckboxChange = (index: number) => {
    setWordsToBeConformed((prevWords) =>
      prevWords.map((word, i) =>
        i === index ? { ...word, checked: !word.checked } : word,
      ),
    );
  };

  const getMatchedWordsCount = () => {
    return wordsToBeConformed.reduce(
      (acc, word) => (word.checked ? acc + 1 : acc),
      0,
    );
  };

  const nextTeamBtnHandler = () => {
    const matchedWords = wordsToBeConformed
      .filter((w) => w.checked)
      .map((w) => w.label);
    const reverseWords = wordsToBeConformed
      .filter((w) => !w.checked)
      .map((w) => w.label);
    nextStep(matchedWords, reverseWords);
  };

  return (
    <Stack gap={1}>
      <Card elevation={3} sx={{ padding: 2 }}>
        <Typography variant={'h6'}>Подтверди угаданные слова:</Typography>
        <Stack>
          <FormGroup>
            {wordsToBeConformed.map((word, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={word.checked}
                    color={isRedTeam ? 'error' : 'primary'}
                  />
                }
                label={word.label}
                onChange={() => handleCheckboxChange(index)}
              />
            ))}
          </FormGroup>
        </Stack>
        <Typography variant="h6">Угадано:{getMatchedWordsCount()}</Typography>
      </Card>
      <Button
        variant={'contained'}
        onClick={nextTeamBtnHandler}
        color={isRedTeam ? 'error' : 'primary'}
      >
        Следующий ход
      </Button>
    </Stack>
  );
};
