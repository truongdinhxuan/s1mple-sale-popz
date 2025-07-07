// Notifications.jsx
import {
  Page,
  InlineStack,
  ResourceList,
  ResourceItem,
  Box,
  Text,
  LegacyCard,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';
import React, {useCallback, useState, useMemo} from 'react';
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
  const [sortValue, setSortValue] = useState('NEWEST_UPDATE');

  const handleSelectionChange = useCallback(selected => {
    setSelectedItems(selected);
  }, []);

  const sortedItems = useMemo(() => {
    if (!data) return [];
    const items = [...data];
    if (sortValue === 'NEWEST_UPDATE') {
      return items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    if (sortValue === 'OLDEST_UPDATE') {
      return items.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }
    return items;
  }, [data, sortValue]);

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
          items={sortedItems}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          selectable
          sortValue={sortValue}
          sortOptions={[
            {label: 'Newest update', value: 'NEWEST_UPDATE'},
            {label: 'Oldest update', value: 'OLDEST_UPDATE'}
          ]}
          onSortChange={selected => {
            setSortValue(selected);
          }}
        />
      </LegacyCard>
    </Page>
  );
};
export default Notifications;
