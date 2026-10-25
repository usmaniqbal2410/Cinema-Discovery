// @flow
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';
import type { Movie } from 'types';

import { pageContainer, centeredSpinner } from '../../common/layout';

type Props = {
  movies: Movie[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMovies: () => void,
  onFetchMoreMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  container: {
    ...pageContainer(theme),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(8),
    },
  },
  spinnerContainer: centeredSpinner(theme),
}));

export const ProfileMovieList = (props: Props) => {
  const { movies, isLoading, isLoadingMore, onFetchMovies, onFetchMoreMovies } = props;

  const [showView, setShowView] = useState(false);
  const classes = useStyles();

  // Show the view after some timeout, because of lagging tab switch when view is shown instantly
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFetchMovies();
      setShowView(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, [onFetchMovies]);

  if (!showView) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={classes.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <MovieList movies={movies} onLoadMore={onFetchMoreMovies} />
      {isLoadingMore && <Spinner />}
    </div>
  );
};

export default ProfileMovieList;
