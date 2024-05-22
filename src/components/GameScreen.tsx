import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export const GameScreen = () => {
  const isActive = false;
  const isRedTeam = false;
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
              <Typography variant="h6">СУПЕРДЛИННОЕСЛОВОААА1</Typography>
            </Stack>
          </Card>
          <Button variant={'contained'} color={isRedTeam ? 'error' : 'primary'}>
            <Typography variant={'h5'}>ОК</Typography>
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: '1rem' }}
          color={isRedTeam ? 'error' : 'primary'}
        >
          <Typography variant="h6">
            Команда {isRedTeam ? 'красных' : 'синих'} вперед
          </Typography>
        </Button>
      )}
    </Stack>
  );
};
