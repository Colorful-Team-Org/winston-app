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
  }),
};

export default styles;
