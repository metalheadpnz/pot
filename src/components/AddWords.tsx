import React from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { defaultWordsCountCard } from '../constants/constants.ts';

export const AddWords = () => {
  const words = [
    'Слово',
    'Жопа',
    'Длинноесловаона',
    'Флюгегентхаймент',
    // 'алло',
  ];
  return (
    <Stack gap={1}>
      <Card elevation={3} sx={{ padding: 2 }}>
        <Stack gap={2}>
          <TextField label="Добавь слово" variant="outlined" fullWidth />
          <Button variant={'contained'}>Добавить</Button>
        </Stack>
      </Card>
      <Card elevation={3} sx={{ padding: 2 }}>
        <Typography paragraph variant={'h6'}>
          Осталось добавить слов: {defaultWordsCountCard - words.length}
        </Typography>
        <Stack spacing={1}>
          {words.map((w) => (
            <Chip
              label={w}
              variant="outlined"
              onDelete={() => {}}
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
        >
          Дальше
        </Button>
      </Card>
      <Card elevation={3} sx={{ padding: 2, marginTop: 'auto', flex: 1 }}>
        <Stack gap={2}>
          <Typography textAlign={'center'}>
            Количество участников: {5}
          </Typography>
          <Button>Начать игру</Button>
        </Stack>
      </Card>
    </Stack>
  );
};
