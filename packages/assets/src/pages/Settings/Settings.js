import React, {useState, useCallback, useEffect} from 'react';
// import {tabs} from '../../const/setting';
import {
  Button,
  Card,
  Layout,
  Page,
  LegacyTabs,
  LegacyCard,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import Display from '../../components/Setting/Display';
import Triggers from '../../components/Setting/Triggers';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import {defaultSettings} from '../../const/setting';
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSkeleton';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {data, loading, updateDataField} = useFetchApi({url: '/settings', defaultSettings});
  const {handleEdit} = useEditApi({url: '/settings'});
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);
  // const [settings, setSettings] = useState(defaultSettings);

  // useEffect(() => {
  //   if (data) setSettings(data);
  // }, [data]);

  const handleChange = useCallback(
    (key, value) => {
      updateDataField(key, value);
    },
    [updateDataField]
  );
  const tabs = [
    {
      id: 'display',
      content: 'Display',
      accessibilityLabel: 'Display setting',
      panelID: 'displayPanel',
      body: <Display handleChange={handleChange} settings={data} />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      panelID: 'triggers-panel',
      body: <Triggers handleChange={handleChange} settings={data} />
    }
  ];
  const saveData = async () => {
    await handleEdit(data);
  };

  if (loading) {
    return (
      <LoadingSkeleton title="Settings" hasSidebar sidebarLines={3} mainLines={6} primaryAction />
    );
  }

  return (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={
        <Button tone="success" variant="primary" onClick={saveData}>
          Save
        </Button>
      }
    >
      {/* Main */}
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup settings={data} />
        </Layout.Section>
        {/* Layout display */}
        <Layout.Section>
          <LegacyCard>
            <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              {tabs[selected].body}
            </LegacyTabs>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
