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
    transition: 'border 0.2s ease-in-out',
    textDecoration: 'none',
    color: tokens.gray600,

    svg: {
      transition: 'fill 0.2s ease-in-out',
    },

    '&:hover': {
      borderColor: tokens.gray400,
      svg: {
        fill: tokens.colorPrimary,
      },
    },
  }),
  published: css({
    background: tokens.green400,
  }),
  draft: css({
    background: tokens.orange400,
  }),
};

export default styles;
