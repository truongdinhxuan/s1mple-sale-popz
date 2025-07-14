// Notifications.jsx

import {
  Page,
  InlineStack,
  ResourceList,
  ResourceItem,
  Box,
  Text,
  LegacyCard
} from '@shopify/polaris';
import React, {useState, useCallback, useMemo} from 'react';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import {formatDateOnly} from '../../helpers/utils/formatFullTime';
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSkeleton';
import formatRelativeTime from '@functions/helpers/datetime/formatRelativeTime';

const Notifications = () => {
  const [sortValue, setSortValue] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const apiUrl = useMemo(() => `/notifications?sortBy=${sortValue}`, [sortValue]);

  const {data: items, loading} = useFetchApi({url: apiUrl});

  const handleSelectionChange = useCallback(selected => {
    setSelectedItems(selected);
  }, []);
  const renderItem = item => {
    if (!item) return null;
    const time = formatDateOnly(item.timestamp);
    // console.log(item.timestamp)
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
                timestamp={formatRelativeTime(item.timestamp)}
                productImage={item.productImage}
              />
            }
            accessibilityLabel={`View details for ${item.productName}`}
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
    return <LoadingSkeleton title="Notifications" hasSidebar={false} mainLines={6} />;
  }

  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      <LegacyCard>
        <ResourceList
          items={items || []}
          resourceName={{singular: 'notification', plural: 'notifications'}}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          selectable
          sortValue={sortValue}
          sortOptions={[
            {label: 'Newest update', value: 'desc'}, // NEWEST -> descending
            {label: 'Oldest update', value: 'asc'} // OLDEST -> ascending
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
