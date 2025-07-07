import {
  BlockStack,
  Box,
  Checkbox,
  InlineGrid,
  InlineStack,
  LegacyCard,
  RangeSlider,
  TextField,
  Text,
  Button
} from '@shopify/polaris';
import React, {useCallback} from 'react';
import {useRenderBox} from '../../hooks/setting/useRenderBox';
import {displaySettings} from '../../const/setting';

/**
 * Display setting
 * @returns {JSX.Element}
 */
/* eslint-disable react/prop-types */
const Display = ({handleChange, settings}) => {
  // console.log(data);
  const {renderBox} = useRenderBox(settings.position);

  const handleRangeChange = useCallback(
    (key, value) => {
      const numericValue = typeof value === 'string' ? parseInt(value, 10) : value;
      handleChange(key, numericValue);
    },
    [handleChange]
  );

  return (
    <LegacyCard.Section>
      <Box as="div" width="290" minHeight="760">
        <BlockStack gap="500">
          <Text variant="headingXs" as="span" color="subdued">
            APPEARANCE
          </Text>
          <Box>
            <Text as="span" color="subdued">
              Desktop Position
            </Text>
            <InlineStack gap="200" wrap>
              {['bottom-left', 'bottom-right', 'top-left', 'top-right'].map(pos =>
                renderBox(pos, {
                  bottom: pos.includes('bottom') ? '4px' : undefined,
                  top: pos.includes('top') ? '4px' : undefined,
                  left: pos.includes('left') ? '4px' : undefined,
                  right: pos.includes('right') ? '4px' : undefined,
                  selected: settings.position === pos,
                  onClick: () => handleChange('position', pos)
                })
              )}
            </InlineStack>
            <Text as="span" tone="disabled">
              The display position of the pop on your website.
            </Text>
          </Box>
          {/* Options select */}
          <BlockStack>
            <Checkbox
              label="Hide time ago"
              checked={settings.hideTimeAgo}
              onChange={val => handleChange('hideTimeAgo', val)}
            />
            <Checkbox
              label="Truncate context text"
              checked={settings.truncateProductName}
              onChange={val => handleChange('truncateProductName', val)}
              helpText="If the product name is long for one line, it will be  truncated to 'Product na...'"
            />
          </BlockStack>
          {/* Timing */}
          <Text variant="headingXs" as="span" color="subdued">
            TIMING
          </Text>
          <InlineGrid columns={2} gap={400}>
            {displaySettings.map(setting => (
              <Box key={setting.key}>
                <Text>{setting.displayName}</Text>
                <RangeSlider
                  helpText={setting.helpText}
                  output
                  value={String(settings[setting.key] ?? '')}
                  min={0}
                  max={setting.max}
                  onChange={value => handleRangeChange(setting.key, value)}
                  suffix={
                    <TextField
                      label=""
                      labelHidden
                      type="number"
                      value={String(settings[setting.key] ?? '')}
                      onChange={value => handleRangeChange(setting.key, value)}
                      autoComplete="off"
                      min={0}
                      max={setting.max}
                    />
                  }
                />
              </Box>
            ))}
          </InlineGrid>
        </BlockStack>
      </Box>
    </LegacyCard.Section>
  );
};

export default Display;
