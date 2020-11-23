import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../styles/AppStyles';
import { ItemData } from '../types/Tstypes';

const Item = (props: ItemData) => {
  const classes = useStyles();

  const createMarkup = (html: any) => {
    return { __html: html };
  };

  return (
    <Card className={classes.itemCard}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          dangerouslySetInnerHTML={createMarkup(props.title)}
        />
        <Typography color="textSecondary" gutterBottom>
          User: {props.user}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={createMarkup(props.body)}
          gutterBottom
        />
        <Typography color="textSecondary">
          Similarity: {props.similarity}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;
