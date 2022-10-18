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
    minHeight: 'auto',
    border: 'solid 1px',
    borderColor: tokens.gray400,
    borderRadius: tokens.borderRadiusSmall,

    '& button': {
      border: 'none',
      padding: 0,
      flex: 1,
      display: 'block',
      maxWidth: 'initial',
      background: 'transparent',
    },
  }),
  'button[data-state="on"]': css({
    background: 'transparent',
  }),
  contentTypeContainer: css({
    padding: tokens.spacingM,
    background: tokens.gray100,
    border: `solid 1px ${tokens.gray300}`,
    borderRadius: tokens.borderRadiusSmall,
  }),
};

export default styles;
