import { css } from 'emotion';
import tokens from '@contentful/f36-tokens';

const OtherSpaceStyles = {
  empty: css({
    background: '#fff',
    border: `solid 1px ${tokens.gray300}`,
    textAlign: 'center',
    color: tokens.gray600,
    borderRadius: '8px',
  }),
};

export default OtherSpaceStyles;
