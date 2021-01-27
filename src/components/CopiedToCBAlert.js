import React from 'react';
import {  
  Snackbar,  
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function CopiedToCBAlert({open, onClose, ...props}) {
  return (
    <Snackbar open={open} autoHideDuration={props.autoHideDuration} onClose={onClose} elevation>
        <MuiAlert onClose={onClose} elevation={props.elevation} variant={props.variant} severity={props.severity}>
          Скопировано в буфер обмена.
        </MuiAlert>
      </Snackbar>
  )
}
