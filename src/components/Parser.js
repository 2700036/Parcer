import React, { useRef, useState } from 'react';
import {
  makeStyles,
  Container,
  Toolbar,
  TextField,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import numberToWordsRu from 'number-to-words-ru';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    margin: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    zIndex: theme.zIndex.drawer,
    height: 45
  },
  inputBox: {
    position: 'relative',
  },
  VATBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '& label': {
      alignSelf: 'end'
    }
  },
  VATValue: {    
    minWidth: 70,
    maxWidth: 120,
    marginBottom: theme.spacing(.5)
  },
  result: {
    margin: `${theme.spacing(6)}px 0`,
    fontSize: theme.spacing(2.2)
  },
  clearButton: {
    position: 'absolute',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-30%)',
    color: theme.palette.grey[500],
    zIndex: theme.zIndex.drawer + 1,
  },
}));
const Parser = () => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',    
  });
  const summInput = useRef();
  const [withVAT, setWithVAT] = useState(false);
  const [summ, setSumm] = useState('');
  const [VAT, setVAT] = useState(20);

  const handleInputChange = ({ target : { value} }) => {
    const numbersOnly = value.replace(/[^0-9.,]+/gm, '').slice(0,25)
    summInput.current.value = numbersOnly;
    setSumm(numbersOnly.replace(/,+/gm, '.'));
  };
  const handleCheckVAT = ({ target }) => {
    setWithVAT(target.checked);
  };
  const handleVAT = ({ target }) => {
    setVAT(target.value);
  };
  const parseSumm = (summ) => {
    const parsed = numberToWordsRu.convert(summ);
    return `(${parsed.split(' руб').join(') руб')}`
  }
  const format = (num) => num.replace(/(\.\d{2})\d*/, "$1").replace(/(\d)(?=(\d{3})+\b)/g, "$1 ")
  const finalizeResult = (summ) => {
    if(!summ)return
    const baseResult = `${format(summ)} ${parseSumm(summ)}`;
    const VATsumm = summ ? summ - (summ/(VAT/100+1)) : null;
    const isVATChecked = withVAT ? ` включая НДС (${VAT}%) в сумме ${format(VATsumm.toFixed(2))} ${parseSumm(VATsumm)}` : '';
    const joinedResult = [baseResult, isVATChecked].filter(Boolean).join().replace(/\./gm, ',')
    return `${joinedResult}.`;
  }
  const onSubmit = (data) => {
    console.log(finalizeResult(summ));
  }; 

  console.log(errors);
  return (
    <>
      <Container className={classes.container}>
        <Toolbar />
        <Box className={classes.inputBox}>
          <form onSubmit={handleSubmit(onSubmit)} style={{position: 'relative'}} noValidate>
          
          <TextField
            label='Введите сумму'
            name='summ'
            autoComplete='off'
            fullWidth
            autoFocus
            className={classes.input}
            InputProps={{ inputProps: { ref: summInput } }}
            onChange={handleInputChange}
            inputRef={register({
              pattern: {
                value: /^[\d.,]+$/,
                message: 'Только цифры',
              },              
              maxLength: {
                value: 20,
                message: 'Ну перестань!',
              },
            })}
            error={!!errors.summ}
                helperText={errors.summ ? errors.summ.message : null}
          />
           <IconButton type='submit' aria-label='close' className={classes.clearButton} >
           <Icon color="primary">add_circle</Icon>
          </IconButton>   
          </form>
          <Box className={classes.VATBox}>
           
            <FormControlLabel
              control={
                <Checkbox checked={withVAT} onChange={handleCheckVAT} name='withVAT' color='primary' />
              }
              label='с НДС'
            />
            <FormControl className={classes.VATValue} style={{visibility: `${withVAT ? 'visible' : 'hidden'}`}}>
              <InputLabel id='demo-simple-select-helper-label'>НДС, %</InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={VAT}
                onChange={handleVAT}
              >
                <MenuItem value={20}>20%</MenuItem>
                <MenuItem value={18}>18%</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {summ && <Typography className={classes.result}>{finalizeResult(summ)}</Typography>}
      </Container>
    </>
  );
};

export default Parser;
