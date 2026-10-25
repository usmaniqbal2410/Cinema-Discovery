// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from 'components/TabPanel/TabPanel';

import { cinema } from '../../common/cinemaTheme';
import { pageContainer } from '../../common/layout';

import FavortiesTab from './Favorites/ProfileFavoritesTab';
import WatchlistTab from './Watchlist/ProfileWatchlistTab';

const useStyles = makeStyles((theme) => ({
  bar: {
    borderBottom: `1px solid ${cinema.border}`,
  },
  barInner: pageContainer(theme),
  tab: {
    fontSize: '0.78rem',
    padding: theme.spacing(3, 0),
    marginRight: theme.spacing(6),
    color: cinema.muted,
    opacity: 1,
    '&.Mui-selected': {
      color: cinema.goldBright,
    },
  },
}));

const ProfileTabs = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const classes = useStyles();

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <>
      <div className={classes.bar}>
        <div className={classes.barInner}>
          <Tabs
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
          >
            <Tab className={classes.tab} label="Favorites" disableRipple />
            <Tab className={classes.tab} label="Watchlist" disableRipple />
          </Tabs>
        </div>
      </div>
      <TabPanel value={currentTab} index={0}>
        <FavortiesTab />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <WatchlistTab />
      </TabPanel>
    </>
  );
};

export default ProfileTabs;
