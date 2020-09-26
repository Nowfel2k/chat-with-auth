import React, { useContext } from 'react';
import {
  TextField,
  makeStyles,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { AuthContext } from '../../context/Auth';
import useForm from '../../hooks/useForm';
import validate from '../../validation/nicknameValidation';

const useStyles = makeStyles((theme) => {
  return {
    nicknameWrapper: {
      margin: 'auto',
      paddingBottom: theme.measures.header.height,
      display: 'flex',
      flexDirection: 'column',
    },
    nickname: {
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  };
});

const EnterNickname = () => {
  const classes = useStyles();
  const history = useHistory();
  const { authenticate } = useContext(AuthContext);

  const { values, handleFormSubmit, handleFormChange, errors } = useForm(() => {
    authenticate();
    history.push({
      pathname: '/chats',
      state: {
        userId: nanoid(),
        userNickname: values.nickname,
      },
    });
  }, validate);

  return (
    <form
      noValidate
      className={classes.nicknameWrapper}
      onSubmit={handleFormSubmit}
    >
      <TextField
        autoFocus
        required
        error={!!errors.nickname}
        helperText={errors.nickname}
        label="Nickname"
        color="primary"
        name="nickname"
        className={classes.nickname}
        onChange={handleFormChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EditOutlined color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        LET'S GO
      </Button>
    </form>
  );
};

export default EnterNickname;
