import React from 'react'
import { makeStyles, Container, Typography} from '@material-ui/core';



const useStyles = makeStyles((theme)=>({
  container: { 
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',   
  }, 
  
}))
const Dashboard = () => {
  const classes = useStyles(); 
  
  return (
    
    <Container className={classes.container}>
       <Typography variant="body1" align="center">Тут может быть дашборд с информацией обо всех модулях.</Typography>
       <Typography variant="body1" align="center" paragraph>Сейчас реализован только модуль парсера чисел в текст.</Typography>
       <Typography variant="body1" align="center">Выберите его</Typography>
    </Container>   
   
  )
}



export default Dashboard;
