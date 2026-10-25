import { createMuiTheme } from '@material-ui/core/styles';

// ─────────────────────────────────────────────────────────────
//  "Noir Editorial" design tokens
// ─────────────────────────────────────────────────────────────
export const cinema = {
  bg: '#07070a',
  bgElevated: '#0d0d12',
  surface: '#111116',
  surfaceAlt: '#17171e',
  border: 'rgba(236, 226, 208, 0.10)',
  borderStrong: 'rgba(236, 226, 208, 0.22)',
  gold: '#c9a96a',
  goldBright: '#e3c88f',
  goldSoft: 'rgba(201, 169, 106, 0.10)',
  goldGlow: 'rgba(201, 169, 106, 0.28)',
  text: '#f1ece2',
  muted: '#9a968b',
  maxWidth: 1360,
  fontSerif: '"Fraunces", "Playfair Display", Georgia, "Times New Roman", serif',
  fontSans: '"Manrope", "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const serif = { fontFamily: cinema.fontSerif };

const cinemaTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: cinema.gold, light: cinema.goldBright, contrastText: '#14100a' },
    secondary: { main: cinema.goldBright },
    background: { default: cinema.bg, paper: cinema.surface },
    text: { primary: cinema.text, secondary: cinema.muted },
    divider: cinema.border,
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: cinema.fontSans,
    h1: { ...serif, fontWeight: 300, letterSpacing: '-0.03em' },
    h2: { ...serif, fontWeight: 300, letterSpacing: '-0.03em' },
    h3: { ...serif, fontWeight: 300, letterSpacing: '-0.02em' },
    h4: { ...serif, fontWeight: 400, letterSpacing: '-0.02em' },
    h5: { ...serif, fontWeight: 400, letterSpacing: '-0.01em' },
    h6: { ...serif, fontWeight: 400 },
    overline: { fontWeight: 700, letterSpacing: '0.28em', fontSize: '0.7rem' },
    button: { fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.74rem' },
  },
  overrides: {
    MuiPaper: { root: { backgroundImage: 'none' } },
    MuiCard: {
      root: {
        backgroundColor: cinema.surface,
        border: `1px solid ${cinema.border}`,
        borderRadius: 4,
      },
    },
    MuiButton: {
      root: { borderRadius: 2, padding: '12px 28px' },
      containedPrimary: {
        boxShadow: 'none',
        '&:hover': { backgroundColor: cinema.goldBright, boxShadow: 'none' },
      },
      outlined: { borderColor: cinema.borderStrong },
    },
    MuiChip: {
      root: {
        borderRadius: 2,
        backgroundColor: 'transparent',
        border: `1px solid ${cinema.borderStrong}`,
      },
    },
    MuiTabs: {
      indicator: { height: 2 },
    },
    MuiTab: {
      root: { minWidth: 0, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 },
    },
    MuiOutlinedInput: {
      root: { borderRadius: 2, backgroundColor: 'transparent' },
      notchedOutline: { borderColor: cinema.borderStrong },
    },
    MuiDivider: { root: { backgroundColor: cinema.border } },
    MuiCircularProgress: { colorPrimary: { color: cinema.gold } },
  },
});

export default cinemaTheme;
