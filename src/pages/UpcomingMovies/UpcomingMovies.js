// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from 'components/Spinner/Spinner';
import upcomingActions from 'store/upcoming/upcoming.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';

import CinemaPage from '../common/CinemaPage';
import PageHeading from '../common/PageHeading';
import { pageContainer, centeredSpinner } from '../common/layout';

import UpcomingMoviesList from './List/UpcomingMoviesList';

type Props = {
  isLoadingConfig: boolean,
  onFetchMovies: () => void,
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

export const UpcomingMovies = (props: Props) => {
  const { isLoadingConfig, onFetchMovies } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    onFetchMovies();
  }, [onFetchMovies]);

  if (isLoadingConfig) {
    return (
      <CinemaPage>
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      </CinemaPage>
    );
  }

  return (
    <CinemaPage>
      <PageHeading
        eyebrow="02 — In cinemas soon"
        title="Upcoming"
        emphasis="releases"
        subtitle="A first look at the films about to reach the big screen — mark your calendar early."
      />
      <div className={classes.container}>
        <UpcomingMoviesList />
      </div>
    </CinemaPage>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingConfig: loadingSelectors.createIsLoadingSelector([
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
});

const mapDispatchToProps = {
  onFetchMovies: upcomingActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
