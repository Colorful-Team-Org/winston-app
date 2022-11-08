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
  toggleBtnContainer: css({
    width: '100%',
    maxWidth: 'none',
    textAlign: 'left',
    minHeight: 'auto',
    border: 'solid 1px',
    borderColor: tokens.gray400,
    borderRadius: tokens.borderRadiusSmall,
    transitionDuration: tokens.transitionDurationDefault,

    '&:hover': {
      background: tokens.blue100,
    },
  }),
  toggleBtn: css({
    background: 'transparent',
    border: 0,
    flex: '1',
    maxWidth: '100%',
    minHeight: 0,
    justifyContent: 'flex-start',
    paddingLeft: 0,

    '&:hover': {
      background: 'transparent',
    },
  }),
  contentTypeContainer: css({
    padding: tokens.spacingM,
    background: tokens.gray100,
    border: `solid 1px ${tokens.gray300}`,
    borderRadius: tokens.borderRadiusSmall,
  }),
};

export default styles;
