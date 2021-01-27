import React, { useRef, useState } from 'react';
import {
  Container,
  Toolbar,
  TextField,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Switch,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  List,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import numberToWordsRu from 'number-to-words-ru';
import { useForm } from 'react-hook-form';
import useStyles from './styles';
import ParsedSumm from './ParsedSumm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopiedToCBAlert from '../CopiedToCBAlert';

const splitters = {
  rub: ' руб',
  usd: ' дол',
  eur: ' евр',
};

const Parser = () => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });
  const summInput = useRef();
  const [withVAT, setWithVAT] = useState(false);
  const [summ, setSumm] = useState('');
  const [VAT, setVAT] = useState(20);
  const [currency, setCurrency] = useState('rub');
  const [parsedList, setParsedList] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = ({ target: { value } }) => {
    let numbersOnly = value.replace(/[^0-9.,]+/gm, '');
    if (numbersOnly) {
      numbersOnly = numbersOnly.match(/^\d+([\.,]?\d?\d?)/gm)[0].slice(0, 25);
      setSumm(numbersOnly.replace(/,+/gm, '.'));
    } else {
      setSumm(numbersOnly);
    }
    summInput.current.value = numbersOnly;
  };
  const handleCheckVAT = ({ target }) => {
    setWithVAT(target.checked);
  };
  const handleVAT = ({ target }) => {
    setVAT(target.value);
  };
  const handleCurrency = ({ target }) => {
    setCurrency(target.value);
  };
  const parseSumm = (summ) => {
    const parsed = numberToWordsRu.convert(summ, { currency });
    const splitter = splitters[currency];
    return `(${parsed.split(splitter).join(`)${splitter}`)}`;
  };
  const format = (num) => num.replace(/(\.\d{2})\d*/, '$1').replace(/(\d)(?=(\d{3})+\b)/g, '$1 ');
  const finalizeResult = (summ) => {
    if (!summ) return;
    const baseResult = `${format(summ)} ${parseSumm(summ)}`;
    const VATsumm = summ ? summ - summ / (VAT / 100 + 1) : null;
    const isVATChecked = withVAT
      ? ` включая НДС (${VAT}%) в сумме ${format(VATsumm.toFixed(2))} ${parseSumm(VATsumm)}`
      : '';
    const joinedResult = [baseResult, isVATChecked].filter(Boolean).join().replace(/\./gm, ',');
    return `${joinedResult}.`;
  };
  const onSubmit = (data) => {
    const parsed = finalizeResult(summ);
    setParsedList([...parsedList, parsed]);
  };
  const deleteParsedItem = (i) => {
    setParsedList((state) => {
      return state.filter((el, ind) => ind !== i);
    });
  };

  return (
    <>
      <Container className={classes.container}>
        <Toolbar />
        <Box className={classes.inputBox}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
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
            <IconButton type='submit' aria-label='close' className={classes.addButton}>
              <Icon color='primary'>add_circle</Icon>
            </IconButton>
            <FormControl className={classes.currency}>
              <InputLabel id='demo-simple-select-helper-label'>Валюта</InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={currency}
                onChange={handleCurrency}
              >
                <MenuItem value={'rub'}>₽</MenuItem>
                <MenuItem value={'usd'}>$</MenuItem>
                <MenuItem value={'eur'}>€</MenuItem>
              </Select>
            </FormControl>
          </form>
          <Box className={classes.VATBox}>
            <FormControlLabel
              control={
                // <Checkbox checked={withVAT} onChange={handleCheckVAT} name='withVAT' color='primary' />
                <Switch checked={withVAT} onChange={handleCheckVAT} name='withVAT' color='primary' />
              }
              label='с НДС'
            />
            <FormControl
              className={classes.VATValue}
              style={{ visibility: `${withVAT ? 'visible' : 'hidden'}` }}
            >
              <InputLabel id='demo-simple-select-helper-label'>НДС, %</InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={VAT}
                onChange={handleVAT}
              >
                {/* {Array(20).fill(0).map((el,i) => <MenuItem key={i} value={++i}>{`${++i}%`}</MenuItem>)} */}
                <MenuItem value={20}>20%</MenuItem>
                <MenuItem value={18}>18%</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {summ && (
          <CopyToClipboard text={finalizeResult(summ)} onCopy={() => setIsCopied(true)}>
            <Typography className={classes.result}>{finalizeResult(summ)}</Typography>
          </CopyToClipboard>
        )}

        {parsedList.length > 0 && (
          <List>
            {parsedList.map((s, i) => (
              <ParsedSumm key={i} text={s} deleteItem={() => deleteParsedItem(i)} />
            ))}
          </List>
        )}
      </Container>
      <CopiedToCBAlert open={isCopied} 
      onClose={() => setIsCopied(false)} 
      autoHideDuration={2000} 
      elevation={6}
      variant="filled" 
      severity='success'
      />
    </>
  );
};

export default Parser;
