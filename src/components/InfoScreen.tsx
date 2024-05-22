import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';

type ResultType = {
  team: 'red' | 'blue';
  points: number;
};

export function InfoScreen() {
  const result: Array<ResultType> = [
    {
      team: 'red',
      points: 18,
    },
    {
      team: 'blue',
      points: 12,
    },
  ];

  const isEnd: boolean = false;

  return (
    <Stack>
      <Typography variant="h4" marginBottom={2}>
        Результаты игры:
      </Typography>

      {result.map((card) => (
        <Card elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography sx={{ fontSize: '1rem' }} color={card.team} gutterBottom>
            Команда {card.team === 'red' ? 'Красных' : 'Синих'}
          </Typography>

          <Typography color="text.secondary">Всего слов:</Typography>
          <Typography variant="h3" component="div">
            {card.points}
          </Typography>
        </Card>
      ))}
      <Button variant={'contained'} color={isEnd ? 'error' : 'primary'}>
        {isEnd ? 'Конец игры' : 'Следующий уровень'}
      </Button>
    </Stack>
  );
}
