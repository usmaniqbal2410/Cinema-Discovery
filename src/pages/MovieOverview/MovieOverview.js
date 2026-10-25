// @flow
import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MovieActionTypes from 'store/movie/movie.types';
import movieActions from 'store/movie/movie.actions';
import movieSelectors from 'store/movie/movie.selectors';
import authSelectors from 'store/auth/auth.selectors';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import Spinner from 'components/Spinner/Spinner';
import type { Movie } from 'types';

import CinemaPage from '../common/CinemaPage';
import { cinema } from '../common/cinemaTheme';
import { centeredSpinner } from '../common/layout';

import MovieOverviewHeader from './Header/MovieOverviewHeader';
import MovieOverviewBody from './Body/MovieOverviewBody';

type Props = {
  isLoading: boolean,
  movie: Movie,
  isAuth: boolean,
  onFetchMovie: (id: string) => void,
  onUpdateMovieUserState: (id: string) => void,
};

const useStyles = makeStyles((theme) => ({
  spinnerContainer: centeredSpinner(theme),
  notFound: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: theme.spacing(5),
  },
  notFoundText: {
    textAlign: 'center',
    color: cinema.text,
    fontStyle: 'italic',
    fontWeight: 300,
  },
}));

export const MovieOverview = (props: Props) => {
  const { isLoading, movie, isAuth, onFetchMovie, onUpdateMovieUserState } = props;

  const isAuthRef = useRef(isAuth);
  const { id } = useParams();

  const classes = useStyles();

  useLayoutEffect(() => {
    if (id) {
      onFetchMovie(id);
    }
  }, [id, onFetchMovie]);

  useEffect(() => {
    if (isAuth !== isAuthRef.current) {
      isAuthRef.current = isAuth;
      if (id && isAuth) {
        onUpdateMovieUserState(id);
      }
    }
  }, [id, isAuth, onUpdateMovieUserState]);

  if (isLoading) {
    return (
      <CinemaPage>
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      </CinemaPage>
    );
  }

  if (!movie) {
    return (
      <CinemaPage>
        <div className={classes.notFound}>
          <Typography className={classes.notFoundText} variant="h3">
            Movie not found!
          </Typography>
        </div>
      </CinemaPage>
    );
  }

  return (
    <CinemaPage>
      <MovieOverviewHeader movie={movie} />
      <MovieOverviewBody movie={movie} />
    </CinemaPage>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    MovieActionTypes.FETCH_MOVIE,
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
  movie: movieSelectors.selectMovieDetails,
  isAuth: authSelectors.selectIsAuth,
});

const mapDispatchToProps = {
  onFetchMovie: movieActions.fetchMovie,
  onUpdateMovieUserState: movieActions.fetchMovieUserState,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview);
