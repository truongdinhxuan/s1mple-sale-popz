// Notifications.jsx
import {
  Page,
  InlineStack,
  ResourceList,
  Card,
  ResourceItem,
  Box,
  Text,
  LegacyCard,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import {formatDateOnly} from '../../helpers/utils/formatFullTime';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Notifications component
 * @returns {React.ReactElement}
 * @constructor
 */

const Notifications = () => {
  const {data, loading} = useFetchApi({url: '/notifications'});
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = useCallback(selected => {
    setSelectedItems(selected);
  }, []);
  /*
   * Render item
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = item => {
    const time = formatDateOnly(item.timestamp);
    const timeAgo = dayjs(item.timestamp).fromNow();

    // moment
    return (
      <InlineStack align="space-between" blockAlign="center">
        <Box>
          <ResourceItem
            id={item.id}
            media={
              <NotificationPopup
                firstName={item.firstName}
                city={item.city}
                country={item.country}
                productName={item.productName}
                timestamp={timeAgo}
                productImage={item.productImage}
              />
            }
            accessibilityLabel={`View details for ${item}`}
          />
        </Box>
        <Box paddingInlineEnd="400">
          <Text as="p" variant="bodyMd" alignment="end">
            From {time}
          </Text>
        </Box>
      </InlineStack>
    );
  };

  if (loading) {
    return (
      <SkeletonPage title="Notifications">
        <SkeletonDisplayText size="medium" />
        <br />
        <SkeletonBodyText lines={6} />
      </SkeletonPage>
    );
  }
  /*
   * Render component
   * @returns {JSX.Element}
   * @constructor
   */
  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      <LegacyCard>
        <ResourceList
          resourceName={{singular: 'notification', plural: 'notifications'}}
          items={data}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          selectable
        />
      </LegacyCard>
    </Page>
  );
};
export default Notifications;
