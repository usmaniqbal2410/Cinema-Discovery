// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import MovieBackdrop from 'components/Movie/Backdrop/MovieBackdrop';
import MoviePoster from 'components/Movie/Poster/MoviePoster';
import MovieSummary from 'components/Movie/Summary/MovieSummary';
import MovieActions from 'components/Movie/Actions/MovieActions';
import type { Movie } from 'types';

import { cinema } from '../../common/cinemaTheme';
import { pageContainer } from '../../common/layout';

type Props = {
  movie: Movie,
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    // legibility vignette (left) + fade into the page (bottom)
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      pointerEvents: 'none',
      background: `
        linear-gradient(90deg, rgba(7, 7, 10, 0.92) 0%, rgba(7, 7, 10, 0.55) 55%, rgba(7, 7, 10, 0.25) 100%),
        linear-gradient(to bottom, transparent 55%, ${cinema.bg} 100%)
      `,
    },
  },
  root: {
    ...pageContainer(theme),
    position: 'relative',
    zIndex: 3,
    color: theme.palette.common.white,
    display: 'grid',
    gridTemplateColumns: '300px minmax(0, 1fr)',
    columnGap: theme.spacing(9),
    alignItems: 'end',
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      columnGap: theme.spacing(5),
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      justifyItems: 'center',
      rowGap: theme.spacing(4),
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  poster: {
    width: 300,
    minWidth: 300,
    height: 450,
    overflow: 'hidden',
    borderRadius: 3,
    border: `1px solid ${cinema.borderStrong}`,
    boxShadow: `0 40px 80px rgba(0, 0, 0, 0.7), 0 0 0 8px rgba(7, 7, 10, 0.55)`,
  },
  infoContainer: {
    minWidth: 0,
    textShadow: '0 2px 18px rgba(0, 0, 0, 0.7)',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  actionsContainer: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${cinema.border}`,
    textShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const MovieOverviewHeader = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <MovieBackdrop backdropPath={movie.backdropPath}>
        <div className={classes.root}>
          <Card className={classes.poster} elevation={0}>
            <MoviePoster posterPath={movie.posterPath} height={450} width={300} />
          </Card>
          <div className={classes.infoContainer}>
            <MovieSummary movie={movie} />
            <div className={classes.actionsContainer}>
              <MovieActions movie={movie} />
            </div>
          </div>
        </div>
      </MovieBackdrop>
    </div>
  );
};

export default MovieOverviewHeader;
