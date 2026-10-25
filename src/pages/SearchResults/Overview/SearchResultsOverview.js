import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import searchSelectors from 'store/search/search.selectors';

import { cinema } from '../../common/cinemaTheme';

type Props = {
  searchQuery: string,
  totalResults: number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  copy: {
    minWidth: 0,
    marginRight: theme.spacing(4),
  },
  label: {
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
  query: {
    color: cinema.text,
    fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
    lineHeight: 1.05,
    wordBreak: 'break-word',
    '& em': {
      fontStyle: 'italic',
      color: cinema.goldBright,
    },
  },
  stat: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      marginTop: theme.spacing(3),
    },
  },
  count: {
    display: 'block',
    fontFamily: cinema.fontSerif,
    fontSize: '3.2rem',
    fontWeight: 300,
    lineHeight: 1,
    color: cinema.gold,
  },
  countLabel: {
    display: 'block',
    marginTop: theme.spacing(1),
    color: cinema.muted,
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
  },
}));

export const SearchResultsOverview = (props: Props) => {
  const { searchQuery, totalResults } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.copy}>
        <Typography className={classes.label} variant="overline" component="div">
          Search results
        </Typography>
        <Typography className={classes.query} variant="h2" component="h1">
          <em>{`“${searchQuery}”`}</em>
        </Typography>
      </div>
      <div className={classes.stat}>
        <span className={classes.count}>{totalResults}</span>
        <span className={classes.countLabel}>{totalResults === 1 ? 'Result' : 'Results'}</span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchQuery: searchSelectors.selectQuery,
  totalResults: searchSelectors.selectTotalResults,
});

export default connect(mapStateToProps)(SearchResultsOverview);
