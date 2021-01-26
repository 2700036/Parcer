import './App.css';
import { makeStyles } from '@material-ui/core';
import Header from './components/Header';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from './components/Main';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
     <Header userEmail={'user@test.ru'} />       
        <Main />      
    </div>
  );
}

export default App;
