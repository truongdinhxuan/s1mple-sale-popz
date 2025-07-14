// components/common/SkeletonLayout.jsx
import React from 'react';
import {SkeletonPage, SkeletonDisplayText, SkeletonBodyText, Card, Layout} from '@shopify/polaris';

/**
 * @param {{
 *  title?: string,
 *  hasSidebar?: boolean,
 *  sidebarLines?: number,
 *  mainLines?: number,
 *  primaryAction?: boolean
 * }} props
 */
const SkeletonLayout = ({
  title = 'Loading...',
  hasSidebar = false,
  sidebarLines = 3,
  mainLines = 6,
  primaryAction = false
}) => {
  return (
    <SkeletonPage title={title} primaryAction={primaryAction}>
      <Layout>
        {hasSidebar && (
          <Layout.Section variant="oneThird">
            <SkeletonDisplayText size="small" />
            <br />
            <SkeletonBodyText lines={sidebarLines} />
          </Layout.Section>
        )}
        <Layout.Section>
          <Card sectioned>
            <SkeletonDisplayText size="medium" />
            <br />
            <SkeletonBodyText lines={mainLines} />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};

export default SkeletonLayout;
