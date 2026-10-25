import { cinema } from './cinemaTheme';

/**
 * Shared page container: one consistent max-width and gutter system
 * (6 / 3 / 2 spacing units) so every page aligns to the same grid.
 * Only horizontal padding is set here, so pages can add their own vertical spacing.
 */
export const pageContainer = (theme) => ({
  width: '100%',
  maxWidth: cinema.maxWidth,
  margin: '0 auto',
  boxSizing: 'border-box',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

export const centeredSpinner = (theme) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(14, 0),
});
