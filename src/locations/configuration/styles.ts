import { css } from 'emotion';
import tokens from '@contentful/f36-tokens';

const styles = {
  body: css({
    height: 'auto',
    margin: '0 auto',
    marginTop: tokens.spacingXl,
    padding: `${tokens.spacingXl} ${tokens.spacing2Xl}`,
    maxWidth: '960px',
    backgroundColor: tokens.colorWhite,
    zIndex: 2,
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    position: 'relative',
  }),
  background: css({
    display: 'block',
    position: 'absolute',
    zIndex: 1,
    top: '0',
    width: '100%',
    height: '300px',
    backgroundColor: '#FDAD83',
  }),
  splitter: css({
    marginTop: tokens.spacingL,
    marginBottom: tokens.spacingL,
    border: 0,
    height: '1px',
    backgroundColor: tokens.gray300,
  }),
  selectedCt: css({
    backgroundColor: tokens.blue100,
    border: `1px solid ${tokens.gray400}`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    minWidth: 0,
    width: '100%',
    flexWrap: 'wrap',
  }),
};

export default styles;
