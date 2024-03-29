import tokens from '@contentful/f36-tokens';
import { css } from 'emotion';

const styles = {
  searchContainer: css({
    position: 'relative',
  }),
  searchBox: css({
    marginBottom: tokens.spacingXs,

    '& input': {
      boxShadow: tokens.boxShadowPositive,
      borderColor: tokens.gray300,

      '&:focus': {
        boxShadow: tokens.glowPrimary,
        borderColor: tokens.gray300,
      },
    },
  }),
  searchResults: css({
    background: '#fff',
    boxShadow: tokens.boxShadowHeavy,
    borderRadius: tokens.borderRadiusMedium,
    position: 'absolute',
    width: '100%',
    padding: tokens.spacingM,
    top: `calc(100% + ${tokens.spacingM} + ${tokens.spacing2Xl})`,
    transition: `top ${tokens.transitionDurationLong} ${tokens.transitionEasingCubicBezier}, opacity ${tokens.transitionDurationLong} ${tokens.transitionEasingCubicBezier}`,
    pointerEvents: 'none',
    opacity: 0,

    '& > a': {
      display: 'block',
      textDecoration: 'none',
      paddingBottom: tokens.spacingM,
      marginBottom: tokens.spacingM,
      borderBottom: `1px solid ${tokens.gray200}`,

      '& h3': {
        transition: `color ${tokens.transitionDurationLong} ${tokens.transitionEasingCubicBezier}`,
        color: tokens.gray900,
      },
      '&:hover h3': {
        color: tokens.gray400,
      },

      '&:last-of-type': {
        paddingBottom: 0,
        marginBottom: 0,
        border: 0,
      },
    },

    '&.show': {
      top: '90%',
      pointerEvents: 'inherit',
      opacity: 1,
    },
  }),
  resultBody: css({
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }),
  subheading: css({
    marginBottom: tokens.spacingXs,
  }),
  noResults: css({
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      fontSize: tokens.fontSizeL,
    },
  }),
};

export default styles;
