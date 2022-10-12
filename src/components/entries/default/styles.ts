import { css } from 'emotion';
import tokens from '@contentful/f36-tokens';

const styles = {
  spaceDot: css({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  }),
  entry: css({
    background: '#fff',
    width: '100%',
    border: `solid 1px ${tokens.gray300}`,
    borderRadius: '8px',
    transition: 'border 0.2s ease-in-out, background 0.2s ease-in-out',
    textDecoration: 'none',
    color: tokens.gray600,

    svg: {
      transition: 'fill 0.2s ease-in-out',
    },

    '&:hover': {
      borderColor: tokens.gray400,
      background: tokens.gray100,
      svg: {
        fill: tokens.colorPrimary,
      },
    },
  }),
  Published: css({
    background: tokens.green400,
    boxShadow: '0px 0px 6px 0px rgba(0, 133, 57, 0.9)',
  }),
  Draft: css({
    background: tokens.orange400,
    boxShadow: '0px 0px 6px 0px rgba(240, 127, 35, 0.9)',
  }),
  Archived: css({
    background: tokens.gray400,
    boxShadow: '0px 0px 6px 0px rgba(0,0,0, 0.4)',
  }),
  Changed: css({
    background: tokens.blue400,
    boxShadow: '0px 0px 6px 0px rgba(3, 111, 227, 0.9)',
  }),
};

export default styles;
