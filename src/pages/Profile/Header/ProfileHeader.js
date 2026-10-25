// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import profileSelectors from 'store/user/profile/profile.selectors';

import { cinema } from '../../common/cinemaTheme';
import { pageContainer } from '../../common/layout';

type Props = {
  userName: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${cinema.border}`,
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    background: `radial-gradient(900px 320px at 12% 0%, ${cinema.goldSoft}, transparent 70%)`,
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(5),
    },
  },
  container: {
    ...pageContainer(theme),
    display: 'flex',
    alignItems: 'center',
    color: cinema.text,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  avatar: {
    fontFamily: cinema.fontSerif,
    fontSize: 64,
    fontWeight: 300,
    width: theme.spacing(17),
    height: theme.spacing(17),
    borderRadius: 3,
    color: cinema.goldBright,
    backgroundColor: cinema.surface,
    border: `1px solid ${cinema.gold}`,
    boxShadow: `0 0 0 8px ${cinema.bg}, 0 0 0 9px ${cinema.border}`,
    textTransform: 'uppercase',
    marginRight: theme.spacing(7),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      fontSize: 44,
      marginRight: 0,
      marginBottom: theme.spacing(4),
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    color: cinema.gold,
    marginBottom: theme.spacing(2),
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
  userName: {
    color: cinema.text,
    fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
    lineHeight: 1.02,
    wordBreak: 'break-word',
  },
  caption: {
    margin: theme.spacing(2, 0, 0),
    color: cinema.muted,
    fontSize: '1rem',
  },
}));

export const ProfileHeader = (props: Props) => {
  const { userName } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Avatar className={classes.avatar} variant="rounded" color="primary">
          {userName?.length > 0 ? userName.charAt(0) : ''}
        </Avatar>
        <div>
          <span className={classes.label}>Member profile</span>
          <Typography className={classes.userName} variant="h2" component="h1">
            {userName}
          </Typography>
          <p className={classes.caption}>Your personal cinema library — favourites and films to watch.</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userName: profileSelectors.selectUserName,
});

export default connect(mapStateToProps)(ProfileHeader);
