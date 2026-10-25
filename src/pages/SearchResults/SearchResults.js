// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from 'components/Spinner/Spinner';
import searchActions from 'store/search/search.actions';
import searchSelectors from 'store/search/search.selectors';
import SearchActionTypes from 'store/search/search.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';

import CinemaPage from '../common/CinemaPage';
import { cinema } from '../common/cinemaTheme';
import { pageContainer, centeredSpinner } from '../common/layout';

import SearchResultsOverview from './Overview/SearchResultsOverview';
import SearchResultsList from './List/SearchResultsList';

type Props = {
  isLoading: boolean,
  selectedSearchQuery: string,
  onFetchMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  masthead: {
    borderBottom: `1px solid ${cinema.border}`,
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(5),
    },
  },
  mastheadInner: pageContainer(theme),
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

export const SearchResults = (props: Props) => {
  const { isLoading, selectedSearchQuery, onFetchMovies } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    if (selectedSearchQuery) {
      onFetchMovies();
    }
  }, [onFetchMovies, selectedSearchQuery]);

  if (isLoading) {
    return (
      <CinemaPage>
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      </CinemaPage>
    );
  }

  if (!selectedSearchQuery) {
    return null;
  }

  return (
    <CinemaPage>
      <header className={classes.masthead}>
        <div className={classes.mastheadInner}>
          <SearchResultsOverview />
        </div>
      </header>
      <div className={classes.container}>
        <SearchResultsList />
      </div>
    </CinemaPage>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
    SearchActionTypes.FETCH_MOVIES,
  ]),
  selectedSearchQuery: searchSelectors.selectQuery,
});

const mapDispatchToProps = {
  onFetchMovies: searchActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
