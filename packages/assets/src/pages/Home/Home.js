import React from 'react';
import {Page, LegacyStack, Button, Card, Text} from '@shopify/polaris';
import {MaxModalContext} from '@assets/contexts/maxModalContext';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  return (
    <Page title="Home">
      <Card>
        <LegacyStack alignment="center" spacing="tight" distribution="equalSpacing">
          <Text>
            App status is{' '}
            <Text as="span" variant="bodyMd" fontWeight="bold">
              disable
            </Text>
          </Text>
          <Button variant="primary" tone="success">
            Enable
          </Button>
        </LegacyStack>
      </Card>
    </Page>
  );
}
