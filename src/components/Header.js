import React from 'react';
import { AppBar, Button, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 5,
  },
}));

export const Header = ({ userEmail }) => {
  const classes = useStyles();
  
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Container fixed>
        <Toolbar>         
            <Typography variant='h6' className={classes.title}>
              {userEmail}
            </Typography>
         
          
            <Button
              edge='end'
              color='inherit'
              variant='outlined'
              className={classes.menuButton}              
            >
              ВЫЙТИ
            </Button>
        
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};



export default Header;
