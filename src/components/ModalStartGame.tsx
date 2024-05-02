import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { startGameCaptcha } from '../constants/constants.ts';

type PropsType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const ModalStartGame: React.FC<PropsType> = ({ isOpen, setIsOpen }) => {
  const [captchaValue, setCaptchaValue] = useState<string>('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAgree = () => {
    if (startGameCaptcha === captchaValue) {
      setCaptchaValue('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Все игроки написали слова?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Все игроки добавили свои слова, Флюгегехаймен не забыли написать?
          </DialogContentText>
          <TextField
            value={captchaValue}
            onChange={(e) => setCaptchaValue(e.target.value)}
            autoFocus
            required
            margin="dense"
            label="Капча"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={'error'}>
            ой, блин
          </Button>
          <Button onClick={handleAgree}>ПОГНАЛИ!</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
