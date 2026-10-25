// @flow
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ActorList from 'components/Actor/List/ActorList';
import ReviewList from 'components/Review/List/ReviewList';
import MovieList from 'components/Movie/List/MovieList';
import type { Movie } from 'types';

import { pageContainer } from '../../common/layout';

import MovieOverviewBodySection from './Section/MovieOverviewBodySection';

type Props = {
  movie: Movie,
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...pageContainer(theme),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(16),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(8),
    },
  },
}));

const MAX_NUMBER_OF_ACTORS = 7;
const MAX_NUMBER_OF_REVIEWS = 4;
const MAX_NUMBER_OF_RECOMMENDATIONS = 10;

const MovieOverviewBody = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();
  const theme = useTheme();
  const centerRecommendations = useMediaQuery(theme.breakpoints.down('xs'));

  const actors = movie.actors?.slice(0, MAX_NUMBER_OF_ACTORS) ?? [];
  const reviews = movie.reviews?.slice(0, MAX_NUMBER_OF_REVIEWS) ?? [];
  const recommendations = movie.recommendations?.slice(0, MAX_NUMBER_OF_RECOMMENDATIONS) ?? [];

  return (
    <div className={classes.root}>
      <MovieOverviewBodySection index="01" title="Top Cast">
        <ActorList actors={actors} />
      </MovieOverviewBodySection>
      <MovieOverviewBodySection index="02" title="Top Reviews">
        <ReviewList reviews={reviews} />
      </MovieOverviewBodySection>
      <MovieOverviewBodySection index="03" title="Recommendations">
        <MovieList movies={recommendations} center={centerRecommendations} />
      </MovieOverviewBodySection>
    </div>
  );
};

export default MovieOverviewBody;
