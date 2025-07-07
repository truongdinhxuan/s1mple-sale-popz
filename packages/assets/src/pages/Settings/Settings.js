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

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {data, loading} = useFetchApi({url: '/settings', defaultSettings});
  const {handleEdit} = useEditApi({url: '/settings'});
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);

  const handleChange = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  const tabs = [
    {
      id: 'display',
      content: 'Display',
      accessibilityLabel: 'Display setting',
      panelID: 'displayPanel',
      body: <Display handleChange={handleChange} settings={settings} />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      panelID: 'triggers-panel',
      body: <Triggers handleChange={handleChange} settings={settings} />
    }
  ];
  const saveData = async () => {
    await handleEdit(settings);
  };

  if (loading) {
    return (
      <SkeletonPage primaryAction title="Settings">
        <Layout>
          <Layout.Section variant="oneThird">
            <SkeletonDisplayText size="small" />
            <br />
            <SkeletonBodyText lines={3} />
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <SkeletonDisplayText size="medium" />
              <br />
              <SkeletonBodyText lines={6} />
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
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
          <NotificationPopup settings={settings} />
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
