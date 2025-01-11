import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  defaultWordsCountCard,
  wordLength,
} from '../../constants/constants.ts';
import { useWordsStore } from '../../store/words.ts';
import radarSound from '../../assets/radarSound.mp3';

export const AddWords = () => {
  const addWords = useWordsStore((state) => state.addWords);
  const radarSoundAudio = new Audio(radarSound)

  const [words, setWords] = useState<Array<string>>([]);
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

  const soundTest = () => {
    radarSoundAudio.play()
  }


  return (
    <>
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
        <Button
          variant="contained"
          onClick={soundTest}
        >
          тест звука
        </Button>
      </Stack>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          padding: 0,
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ padding: '1rem' }}
        >
          v 1.1 dev. by Schumacher
        </Typography>
      </Box>
    </>
  );
};
