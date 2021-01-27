import React from 'react';
import useStyles from './styles';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default function ParsedSumm({ text, deleteItem }) {
  const classes = useStyles();

  return (
    <ListItem disableGutters divider={true}  classes={{
      secondaryAction: classes.parsedItem,
    }}>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
      <CopyToClipboard  text={text}>
        <IconButton edge='end' aria-label='copy'>
          <FileCopyIcon />
        </IconButton>            
          </CopyToClipboard>
        <IconButton onClick={deleteItem} edge='end' aria-label='delete'>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
