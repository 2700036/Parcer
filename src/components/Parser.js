import React, { useState } from 'react';
import { makeStyles, Container, Toolbar, TextField, Box } from '@material-ui/core';
import deepOrange from '@material-ui/core/colors/deepOrange';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    zIndex: theme.zIndex.drawer,
  },
  inputBox: {
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-60%)',
    color: theme.palette.grey[500],
    zIndex: theme.zIndex.drawer + 1,
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
    backgroundColor: deepOrange[500],
    color: 'white',
    '&:hover': {
      backgroundColor: deepOrange[300],
    },
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  },
}));
const Parser = () => {
  const classes = useStyles();  
  const [searchWord, setSearchWord] = useState('');  

  return (
    <>
      <Container className={classes.container}>
        <Toolbar />
        <Box className={classes.inputBox}>
          <TextField
            label='Введите сумму'
            fullWidth
            autoFocus
            className={classes.input}
            value={searchWord}
            onChange={(e) => ''}
          />          
        </Box>        
      </Container>     
    </>
  );
};

export default Parser;
