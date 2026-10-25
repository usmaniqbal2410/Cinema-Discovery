// @flow
import React from 'react';
import type { Node } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { cinema } from '../../../common/cinemaTheme';

type Props = {
  title: string,
  index?: string,
  children: Node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '240px minmax(0, 1fr)',
    columnGap: theme.spacing(8),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(10),
    borderTop: `1px solid ${cinema.border}`,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      rowGap: theme.spacing(4),
      paddingBottom: theme.spacing(7),
    },
  },
  side: {
    alignSelf: 'start',
    position: 'sticky',
    top: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      position: 'static',
    },
  },
  index: {
    display: 'block',
    marginBottom: theme.spacing(1.5),
    color: cinema.gold,
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.28em',
  },
  title: {
    color: cinema.text,
    fontSize: '2rem',
    lineHeight: 1.1,
  },
  content: {
    minWidth: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const MovieOverviewBodySection = (props: Props) => {
  const { title, index, children } = props;

  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.side}>
        {index && <span className={classes.index}>{index}</span>}
        <Typography className={classes.title} variant="h5" component="h2">
          {title}
        </Typography>
      </div>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

export default MovieOverviewBodySection;
