import { HomeExtensionSDK } from '@contentful/app-sdk';
import { Button, Flex, Paragraph } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import { Component, ReactNode } from 'react';

class SpaceErrorBoundary extends Component<
  { children: ReactNode; sdk: HomeExtensionSDK },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Flex
          flexDirection="column"
          padding="spacingM"
          justifyContent="center"
          alignItems="center"
          style={{
            background: '#fff',
            border: `solid 1px ${tokens.gray300}`,
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Paragraph>
            Something went wrong displaying this space. Please make sure it is configured correctly.
          </Paragraph>
          <Button
            as="a"
            href={`${process.env.REACT_APP_CONTENTFUL_URL}/spaces/${this.props.sdk.ids.space}/apps/${this.props.sdk.ids.app}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Configure Spaces
          </Button>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default SpaceErrorBoundary;
