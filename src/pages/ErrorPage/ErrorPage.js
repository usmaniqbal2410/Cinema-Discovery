// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CinemaPage from '../common/CinemaPage';
import { cinema } from '../common/cinemaTheme';
import { pageContainer } from '../common/layout';

import brokenPage from './brokenPage.png';

type Props = {
  errorText: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...pageContainer(theme),
    minHeight: '80vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
    columnGap: theme.spacing(10),
    alignItems: 'center',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      rowGap: theme.spacing(6),
      textAlign: 'left',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    color: cinema.gold,
    marginBottom: theme.spacing(3),
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    '&::before': {
      content: '""',
      width: 44,
      height: 1,
      marginRight: theme.spacing(2),
      backgroundColor: cinema.gold,
    },
  },
  errorText: {
    color: cinema.text,
    fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
    lineHeight: 1.05,
    fontStyle: 'italic',
  },
  hint: {
    maxWidth: 440,
    margin: theme.spacing(3, 0, 5),
    color: cinema.muted,
    fontSize: '1.02rem',
    lineHeight: 1.7,
  },
  frame: {
    position: 'relative',
    justifySelf: 'center',
    padding: theme.spacing(5),
    border: `1px solid ${cinema.border}`,
    borderRadius: 3,
    background: `radial-gradient(circle at 50% 40%, ${cinema.goldSoft}, transparent 70%), ${cinema.surface}`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      border: `1px solid ${cinema.border}`,
      borderRadius: 2,
      pointerEvents: 'none',
    },
  },
  image: {
    display: 'block',
    width: 'min(34vh, 280px)',
    height: 'min(34vh, 280px)',
    objectFit: 'contain',
  },
}));

const ErrorPage = (props: Props) => {
  const { errorText } = props;

  const classes = useStyles();

  return (
    <CinemaPage>
      <div className={classes.root}>
        <div>
          <span className={classes.label}>Something went wrong</span>
          <Typography className={classes.errorText} variant="h2" component="h1">
            {errorText}
          </Typography>
          <p className={classes.hint}>
            This scene didn&apos;t make the final cut. Head back to the lobby and pick something else to watch.
          </p>
          <Button component={Link} to="/" variant="contained" color="primary" size="large">
            Back to home
          </Button>
        </div>
        <div className={classes.frame}>
          <img className={classes.image} src={brokenPage} alt="page broken" />
        </div>
      </div>
    </CinemaPage>
  );
};

export default ErrorPage;
