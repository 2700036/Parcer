import React, { useState } from 'react';
import useStyles from './styles';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopiedToCBAlert from '../CopiedToCBAlert';

export default function ParsedSumm({ text, deleteItem }) {
  const classes = useStyles();
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
    <ListItem disableGutters divider={true}  classes={{
      secondaryAction: classes.parsedItem,
    }}>
      <ListItemText primary={text} />
      <ListItemSecondaryAction className={classes.parsedItemGroupButtons}>
      <CopyToClipboard  text={text} onCopy={() => setIsCopied(true)}>
        <IconButton edge='end' aria-label='copy'>
          <FileCopyIcon />
        </IconButton>            
          </CopyToClipboard>
        <IconButton onClick={deleteItem} edge='end' aria-label='delete'>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <CopiedToCBAlert open={isCopied} 
    onClose={() => setIsCopied(false)} 
    autoHideDuration={2000} 
    elevation={6}
    variant="filled" 
    severity='success'
    />
    </>
  );
}
