import React, { useEffect, useState } from 'react';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import { useAppStore } from '../store/app.ts';
import { levelNames } from '../constants/constants.ts';

export const NavBar = () => {
  const currentLevel = useAppStore(
    (state) => state.currentLevel,
  ) as keyof typeof levelNames;

  const [time, setTime] = useState<string>();
  useEffect(() => {
    setInterval(() => {
      setTime(
        `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      );
    }, 1000);
  }, []);

  return (
    <AppBar>
      <Toolbar>
        <Stack
          width="100%"
          flexDirection={'row'}
          justifyContent={'space-between'}
          flexWrap={'nowrap'}
        >
          <Typography variant="h6" component="div">
            {levelNames[currentLevel]}
          </Typography>
          <Typography variant="h6" component="div">
            {time}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
