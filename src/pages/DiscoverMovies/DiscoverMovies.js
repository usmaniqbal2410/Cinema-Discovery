// @flow
import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Spinner from 'components/Spinner/Spinner';
import Attribution from 'components/Attribution/Attribution';
import discoverActions from 'store/discover/discover.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import configActions from 'store/config/config.actions';

import CinemaPage from '../common/CinemaPage';
import PageHeading from '../common/PageHeading';
import { cinema } from '../common/cinemaTheme';
import { pageContainer, centeredSpinner } from '../common/layout';

import DiscoverMoviesList from './List/DiscoverMoviesList';
import DiscoverMoviesFilters from './Filters/DiscoverMoviesFilters';

type Props = {
  isLoadingConfig: boolean,
  onFetchAllGenres: () => void,
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
  layout: {
    display: 'grid',
    gridTemplateColumns: '300px minmax(0, 1fr)',
    columnGap: theme.spacing(8),
    alignItems: 'start',
    [theme.breakpoints.down('md')]: {
      columnGap: theme.spacing(5),
      gridTemplateColumns: '260px minmax(0, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
  filtersToggle: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex',
      marginBottom: theme.spacing(3),
    },
  },
  filters: {
    position: 'sticky',
    top: theme.spacing(11),
    borderTop: `1px solid ${cinema.gold}`,
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      position: 'static',
      marginBottom: theme.spacing(5),
    },
  },
  filtersOpen: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  filtersLabel: {
    display: 'block',
    color: cinema.gold,
    marginBottom: theme.spacing(3),
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
  },
  results: {
    minWidth: 0,
  },
  spinnerContainer: centeredSpinner(theme),
}));

export const DiscoverMovies = (props: Props) => {
  const { isLoadingConfig, onFetchAllGenres, onFetchMovies } = props;

  const classes = useStyles();
  const [filtersOpen, setFiltersOpen] = useState(false);

  useLayoutEffect(() => {
    onFetchAllGenres();
    onFetchMovies();
  }, [onFetchAllGenres, onFetchMovies]);

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
        eyebrow="01 — Browse"
        title="Discover"
        emphasis="great cinema"
        subtitle="Refine by genre, release window and sort order to find the film you were meant to watch tonight."
      >
        <Attribution />
      </PageHeading>
      <div className={classes.container}>
        <Button
          className={classes.filtersToggle}
          variant="outlined"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          {filtersOpen ? 'Hide filters' : 'Show filters'}
        </Button>
        <div className={classes.layout}>
          <aside className={`${classes.filters} ${filtersOpen ? classes.filtersOpen : ''}`}>
            <span className={classes.filtersLabel}>Refine</span>
            <DiscoverMoviesFilters />
          </aside>
          <main className={classes.results}>
            <DiscoverMoviesList />
          </main>
        </div>
      </div>
    </CinemaPage>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingConfig: loadingSelectors.createIsLoadingSelector([
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
    ConfigActionTypes.FETCH_ALL_GENRES,
  ]),
});

const mapDispatchToProps = {
  onFetchAllGenres: configActions.fetchAllGenres,
  onFetchMovies: discoverActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies);
