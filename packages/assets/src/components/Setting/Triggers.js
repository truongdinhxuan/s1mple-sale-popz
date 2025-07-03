import {BlockStack, Select, TextField, Text, LegacyCard} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';
import {options} from '../../const/setting';
/**
 * Trigger setting
 * @returns {JSX.Element}
 * @constructor
 */
/* eslint-disable react/prop-types */
const Triggers = ({handleChange, settings}) => {
  const [selected, setSelected] = useState('all-page');
  const [includedValue, setIncludedValue] = useState(settings.includedUrls);
  const [excludedValue, setExcludedValue] = useState(settings.excludedUrls);

  const handleSelectChange = useCallback(value => setSelected(value), []);
  const handleIncludedChange = useCallback(
    val => {
      setIncludedValue(val);
      handleChange('includedUrls', val);
    },
    [handleChange]
  );

  const handleExcludedChange = useCallback(
    val => {
      setExcludedValue(val);
      handleChange('excludedUrls', val);
    },
    [handleChange]
  );

  return (
    <LegacyCard.Section>
      <BlockStack>
        <Select
          label={
            <Text as="span" fontWeight="bold">
              PAGE RESTRICTION
            </Text>
          }
          options={options}
          onChange={handleSelectChange}
          value={selected}
        />
        {selected === 'specific-page' ? (
          <>
            <TextField
              label="Included page"
              value={includedValue}
              onChange={handleIncludedChange}
              autoComplete="off"
              multiline
              helpText="Page URLs to show the pop-up (separated by new lines)"
            />
            <TextField
              label="Excluded pages"
              value={excludedValue}
              onChange={handleExcludedChange}
              autoComplete="off"
              multiline
              helpText="Page URLs NOT to show the pop-up (separated by new lines)"
            />
          </>
        ) : (
          <TextField
            label="Excluded pages"
            value={excludedValue}
            onChange={handleExcludedChange}
            autoComplete="off"
            multiline
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          />
        )}
      </BlockStack>
    </LegacyCard.Section>
  );
};
export default Triggers;
