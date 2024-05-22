import React, { useState } from 'react';
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

type WordsToBeConformedType = {
  label: string;
  checked: boolean;
};

export const ConformScreen = () => {
  const [wordsToBeConformed, setWordsToBeConformed] = useState<
    Array<WordsToBeConformedType>
  >([
    { label: 'Слово', checked: true },
    { label: 'Жопа', checked: true },
    { label: 'Длинноесловаона', checked: true },
    { label: 'Флюгегентхаймент', checked: true },
    { label: 'алло', checked: true },
  ]);

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

  const nextTeamBtnHandler = () => {};

  return (
    <Stack gap={1}>
      <Card elevation={3} sx={{ padding: 2 }}>
        <Typography variant={'h6'}>Подтверди угаданные слова:</Typography>
        <Stack>
          <FormGroup>
            {wordsToBeConformed.map((word, index) => (
              <FormControlLabel
                control={<Checkbox checked={word.checked} />}
                label={word.label}
                onChange={() => handleCheckboxChange(index)}
              />
            ))}
          </FormGroup>
        </Stack>
        <Typography variant="h6">Угадано:{getMatchedWordsCount()}</Typography>
      </Card>
      <Button variant={'contained'} onClick={nextTeamBtnHandler}>
        Следующий ход
      </Button>
    </Stack>
  );
};
