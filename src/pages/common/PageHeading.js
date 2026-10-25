// @flow
import React from 'react';
import type { Node } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { cinema } from './cinemaTheme';
import { pageContainer } from './layout';

type Props = {
  eyebrow?: string,
  title: string,
  emphasis?: string,
  subtitle?: string,
  children?: Node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderBottom: `1px solid ${cinema.border}`,
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(5),
    },
  },
  inner: {
    ...pageContainer(theme),
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  copy: {
    maxWidth: 760,
    marginRight: theme.spacing(4),
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    color: cinema.gold,
    marginBottom: theme.spacing(3),
    '&::before': {
      content: '""',
      width: 44,
      height: 1,
      marginRight: theme.spacing(2),
      backgroundColor: cinema.gold,
    },
  },
  title: {
    color: cinema.text,
    fontSize: 'clamp(2.8rem, 7vw, 5.6rem)',
    lineHeight: 1.0,
    '& em': {
      fontStyle: 'italic',
      fontWeight: 300,
      color: cinema.goldBright,
    },
  },
  subtitle: {
    color: cinema.muted,
    marginTop: theme.spacing(3),
    maxWidth: 520,
    fontSize: '1.02rem',
    lineHeight: 1.7,
  },
  aside: {
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
}));

const PageHeading = (props: Props) => {
  const { eyebrow, title, emphasis, subtitle, children } = props;

  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.copy}>
          {eyebrow && (
            <Typography className={classes.eyebrow} variant="overline" component="div">
              {eyebrow}
            </Typography>
          )}
          <Typography className={classes.title} variant="h2" component="h1">
            {title}
            {emphasis && <em>{` ${emphasis}`}</em>}
          </Typography>
          {subtitle && (
            <Typography className={classes.subtitle} variant="body1">
              {subtitle}
            </Typography>
          )}
        </div>
        {children && <div className={classes.aside}>{children}</div>}
      </div>
    </header>
  );
};

export default PageHeading;
