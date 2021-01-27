import { makeStyles } from "@material-ui/core";

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
  form: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'auto 100px',
    gap: theme.spacing(2)
  },
  currency: {
    height: '53px',
    alignSelf: 'end',
    marginRight: theme.spacing(7)
  },
  VATBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  VATValue: {    
    minWidth: 70,
    maxWidth: 120,
    marginBottom: theme.spacing(.5)
  },
  result: {
    margin: `${theme.spacing(6)}px 0`,
    fontSize: theme.spacing(2.2),
    userSelect: 'none',
    cursor: 'pointer'
  },
  addButton: {
    position: 'absolute',    
    top: '50%',
    right: 0,
    transform: 'translateY(-30%)',
    color: theme.palette.grey[500],
    zIndex: theme.zIndex.drawer + 1,
  },
  parsedItem: {
    paddingLeft: theme.spacing(1),    
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(11)
    }
  },
  parsedItemGroupButtons: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    }
  }
}));

export default useStyles;