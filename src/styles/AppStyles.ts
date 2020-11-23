import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    tableCard: {
      margin: 'auto',
      height: '100%',
      minHeight: '600px',
      maxHeight: '800px',
      width: '100%',
      minWidth: '450px',
      maxWidth: '600px',
      borderRadius: '15px',
    },
    counter: {
      height: '2.5rem',
      margin: '0 .5rem',
      textAlign: 'center',
      background: '#CF4434',
    },
    type: {
      lineHeight: '2.5rem',
      fontWeight: 'normal',
      color: 'whitesmoke',
    },
    //Search Bar CSS
    searchBar: {
      width: '100%',
      padding: '0.5em',
      margin: '0.5em',
    },
    itemContainer: {
      overflowY: 'scroll',
      height: '600px',
    },
    //Items CSS
    itemCard: {
      margin: '0.8rem 0',
      borderRadius: '15px',
    }
  });