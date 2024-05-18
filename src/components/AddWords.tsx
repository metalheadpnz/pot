import React, { useState } from 'react';
import {
  Button,
  Card,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { defaultWordsCountCard, wordLength } from '../constants/constants.ts';
import { useWordsStore } from '../store/words.ts';

export const AddWords = () => {
  const addWords = useWordsStore((state) => state.addWords);

  const [words, setWords] = useState<Array<string>>([
    // 'Слово',
    // 'Жопа',
    // 'Длинноесловаона',
    // 'Флюгегентхаймент',
    // 'алло',
  ]);
  const [currentWord, setCurrentWord] = useState('');

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/; // регулярное выражение для русских, латинских символов и пробелов
    if (e.target.value.length > wordLength) {
      alert('может хватит?');
    } else if (regex.test(e.target.value)) {
      setCurrentWord(e.target.value.toUpperCase());
    }
  };

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedCurrentWord = currentWord.trim();
    if (!trimmedCurrentWord) {
      alert('Пусто!');
    }
    if (words.includes(trimmedCurrentWord)) {
      alert('Не повторяйся!');
    } else {
      setWords((prev) => [...prev, currentWord]);
      setCurrentWord('');
    }
  };

  const onDeleteHandler = (index: number) => {
    const newWords = words.filter((_, i) => i !== index);
    setWords(newWords);
  };

  const nextBtnHandler = () => {
    addWords(words);
    setWords([]);
  };

  return (
    <Stack gap={1}>
      <Card elevation={3} sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <TextField
              disabled={words.length >= defaultWordsCountCard}
              label="Добавь слово"
              variant="outlined"
              fullWidth
              value={currentWord}
              onChange={onInputChangeHandler}
            />
            <Button
              variant={'contained'}
              type="submit"
              disabled={!currentWord || words.length >= defaultWordsCountCard}
            >
              Добавить
            </Button>
          </Stack>
        </form>
      </Card>
      <Card elevation={3} sx={{ padding: 2 }}>
        <Typography paragraph variant={'h6'}>
          Осталось добавить слов: {defaultWordsCountCard - words.length}
        </Typography>
        <Stack spacing={1}>
          {words.map((w, index) => (
            <Chip
              label={w}
              variant="outlined"
              onDelete={() => {
                onDeleteHandler(index);
              }}
              sx={{ justifyContent: 'space-between' }}
            />
          ))}
        </Stack>
        <Button
          sx={{ marginTop: '1rem' }}
          variant={'contained'}
          color="success"
          fullWidth
          disabled={words.length !== defaultWordsCountCard}
          onClick={nextBtnHandler}
        >
          Дальше
        </Button>
      </Card>
    </Stack>
  );
};
