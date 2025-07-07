import {BlockStack, Select, TextField, Text, LegacyCard} from '@shopify/polaris';
import React, {useState, useCallback, useEffect} from 'react';
import {options} from '../../const/setting';

/**
 * Validate helper function.
 * @param {string} text
 * @returns {string|null}
 */
const validateUrls = text => {
  if (!text) {
    return null;
  }

  const urls = text.split('\n');
  // Using set to record all URLs display
  const seenUrls = new Set();

  for (const url of urls) {
    const trimmedUrl = url.trim();
    if (trimmedUrl === '') {
      continue;
    }
    // validate if its Url or not
    const isValidFormat = /^(https?:\/\/|\/|\*)/.test(trimmedUrl);
    if (!isValidFormat) {
      return `Line "${trimmedUrl}" is not an URL. Must start with http://, https://, / or *.`;
    }

    // validate if its repeated
    if (seenUrls.has(trimmedUrl)) {
      return `Line "${trimmedUrl}" is repeated.`;
    }

    // Add new Url if its new
    seenUrls.add(trimmedUrl);
  }

  return null;
};

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

  const [includedError, setIncludedError] = useState(null);
  const [excludedError, setExcludedError] = useState(null);

  useEffect(() => {
    setIncludedError(validateUrls(settings.includedUrls));
    setExcludedError(validateUrls(settings.excludedUrls));
  }, [settings.includedUrls, settings.excludedUrls]);

  const handleSelectChange = useCallback(value => setSelected(value), []);

  const handleIncludedChange = useCallback(
    val => {
      setIncludedValue(val);
      handleChange('includedUrls', val);
      setIncludedError(validateUrls(val));
    },
    [handleChange]
  );

  const handleExcludedChange = useCallback(
    val => {
      setExcludedValue(val);
      handleChange('excludedUrls', val);
      setExcludedError(validateUrls(val));
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
              multiline={5}
              helpText="Page URLs to show the pop-up (separated by new lines)"
              error={includedError}
            />
            <TextField
              label="Excluded pages"
              value={excludedValue}
              onChange={handleExcludedChange}
              autoComplete="off"
              multiline={5}
              helpText="Page URLs NOT to show the pop-up (separated by new lines)"
              error={excludedError}
            />
          </>
        ) : (
          <TextField
            label="Excluded pages"
            value={excludedValue}
            onChange={handleExcludedChange}
            autoComplete="off"
            multiline={5}
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
            error={excludedError}
          />
        )}
      </BlockStack>
    </LegacyCard.Section>
  );
};
export default Triggers;
