// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';

import Spinner from 'components/Spinner/Spinner';
import ProfileActionTypes from 'store/user/profile/profile.types';
import profileActions from 'store/user/profile/profile.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import loadedSelectors from 'store/api/loaded/loaded.selectors';
import ConfigActionTypes from 'store/config/config.types';

import CinemaPage from '../common/CinemaPage';
import { centeredSpinner } from '../common/layout';

import ProfileHeader from './Header/ProfileHeader';
import ProfileTabs from './Tabs/ProfileTabs';

type Props = {
  isLoading: boolean,
  isLoaded: boolean,
  onFetchProfile: () => void,
};

const useStyles = makeStyles((theme) => ({
  spinnerContainer: centeredSpinner(theme),
}));

export const Profile = (props: Props) => {
  const { isLoading, isLoaded, onFetchProfile } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    onFetchProfile();
  }, [onFetchProfile]);

  if (isLoading || !isLoaded) {
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
      <ProfileHeader />
      <ProfileTabs />
    </CinemaPage>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    ProfileActionTypes.FETCH_PROFILE,
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
  isLoaded: loadedSelectors.createIsLoadedSelector([ProfileActionTypes.FETCH_PROFILE]),
});

const mapDispatchToProps = {
  onFetchProfile: profileActions.fetchProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
