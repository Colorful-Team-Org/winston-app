import tokens from '@contentful/f36-tokens';
import { css } from 'emotion';

const styles = {
  entry: css({
    background: '#fff',
    border: `solid 1px ${tokens.gray300}`,
    borderRadius: '8px',
    transition: 'background 0.2s ease-in-out',
    textDecoration: 'none',
    color: tokens.gray600,
    gap: '0.6rem',

    '&:hover': {
      background: tokens.gray100,
    },
  }),
  title: css({
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
  }),
  footer: css({
    borderTop: `solid 1px ${tokens.gray300}`,
  }),
  icon: css({
    flex: '0 0 20px',

    svg: css({
      width: '100%',
    }),
  }),
};

export default styles;
