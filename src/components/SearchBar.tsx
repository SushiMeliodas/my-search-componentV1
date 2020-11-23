import React from 'react';
import { TextField } from '@material-ui/core';
import useStyles from '../styles/AppStyles';

const SearchBar = (props: any) => {
  const classes = useStyles();

  return (
    <TextField
      label="Type to Search"
      onInput={props.onInput}
      placeholder="search"
      className={classes.searchBar}
      // color="secondary"
    />
  );
};

export default SearchBar;
