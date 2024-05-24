import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useWordsStore } from '../store/words.ts';

type ResultType = {
  team: 'red' | 'blue';
  points: number;
};

export function InfoScreen() {
  const redTeamWords = useWordsStore((state) => state.redTeamWords);
  const blueTeamWords = useWordsStore((state) => state.blueTeamWords);
  const currentLevel = useWordsStore((state) => state.currentLevel);
  const nextLevel = useWordsStore((state) => state.nextLevel);

  const result: Array<ResultType> = [
    {
      team: 'red',
      points: redTeamWords.length,
    },
    {
      team: 'blue',
      points: blueTeamWords.length,
    },
  ];

  const nextLevelBtnHandler = () => {
    nextLevel();
  };

  const isEnd: boolean = currentLevel === 4;

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
      <Button
        disabled={isEnd}
        variant={'contained'}
        color={isEnd ? 'error' : 'primary'}
        onClick={nextLevelBtnHandler}
      >
        {isEnd ? 'Конец игры' : 'Следующий уровень'}
      </Button>
    </Stack>
  );
}
