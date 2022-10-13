import tokens from '@contentful/f36-tokens';
import { css } from 'emotion';

const styles = {
  sortableHeader: css({
    textAlign: 'left',

    '& span': {
      display: 'block',
      width: '100%',
    },
  }),
  toggleBtn: css({
    width: '100%',
    maxWidth: 'none',
    textAlign: 'left',
    display: 'block',
    padding: tokens.spacingXs,
    minHeight: 'auto',
  }),
  contentTypeContainer: css({
    padding: tokens.spacingM,
    background: tokens.gray100,
    border: `solid 1px ${tokens.gray300}`,
    borderRadius: tokens.borderRadiusSmall,
  }),
};

export default styles;
