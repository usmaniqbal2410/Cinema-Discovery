// @flow
import React, { useEffect } from 'react';
import type { Node } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import cinemaTheme, { cinema } from './cinemaTheme';

type Props = {
  children: Node,
  className?: string,
};

const FONT_LINK_ID = 'cinema-discovery-fonts';
const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=Manrope:wght@400;500;600;700;800&display=swap';

// Subtle film-grain overlay (inline SVG noise, no network request)
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>\")";

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: 'calc(100vh - 64px)',
    color: cinema.text,
    fontFamily: cinema.fontSans,
    WebkitFontSmoothing: 'antialiased',
    background: `
      radial-gradient(1200px 560px at 82% -10%, ${cinema.goldSoft}, transparent 62%),
      radial-gradient(800px 600px at -10% 40%, rgba(201, 169, 106, 0.04), transparent 60%),
      ${cinema.bg}
    `,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundImage: GRAIN,
      opacity: 0.035,
      pointerEvents: 'none',
      zIndex: 2,
    },
    '& ::selection': {
      backgroundColor: cinema.gold,
      color: '#14100a',
    },
  },
});

/**
 * Wraps a page in the "noir editorial" theme so every nested component
 * (MovieList, Filters, Spinner, ...) picks up the new look automatically.
 * Also loads the display + body fonts once.
 */
const CinemaPage = (props: Props) => {
  const { children, className } = props;

  const classes = useStyles();

  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(FONT_LINK_ID)) {
      return;
    }
    const link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    document.head.appendChild(link);
  }, []);

  return (
    <ThemeProvider theme={cinemaTheme}>
      <div className={className ? `${classes.root} ${className}` : classes.root}>{children}</div>
    </ThemeProvider>
  );
};

export default CinemaPage;
