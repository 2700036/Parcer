import React, {useContext, useEffect} from 'react';
import {Link, Route} from 'react-router-dom'
import {  
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,  
  Toolbar,
} from '@material-ui/core';

import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import Dashboard from './Dashboard';
import Parser from './Parser/Parser';



const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: 50,
      overflow: 'hidden'
    },
  },
  drawer: {
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: 50,
    },
  },
  listItem: {
    textDecoration: 'none',
    color: 'inherit',
  }
}));

const Main = () => {
  const classes = useStyles();  

  return (
    <>
      <Drawer
        variant='permanent'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
            <Link to='/parser' className={classes.listItem}>
          <ListItem button>
            <ListItemIcon>
              <TextRotationNoneIcon />
            </ListItemIcon>
            <ListItemText >Парсер</ListItemText>
          </ListItem>
            </Link>
        </List>
      </Drawer>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/parser" component={Parser}/>
      
      
    </>
  );  
};

export default Main;

