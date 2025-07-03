export const options = [
  {label: 'All pages', value: 'all-page'},
  {label: 'Specific page', value: 'specific-page'}
];
export const tabs = [
  {
    id: 'display',
    content: 'Display',
    accessibilityLabel: 'Display setting',
    panelID: 'displayPanel'
  },
  {
    id: 'triggers',
    content: 'Triggers',
    panelID: 'triggers-panel'
  }
];
export const defaultSettings = {
  position: 'bottom-left',
  hideTimeAgo: true,
  truncateProductName: false,
  displayDuration: 3,
  firstDelay: 5,
  popsInterval: 2,
  maxPopsDisplay: 10,
  includedUrls: '',
  excludedUrls: '',
  allowShow: 'all'
};
export const displaySettings = [
  {
    displayName: 'Desktop duration',
    key: 'displayDuration',
    helpText: 'How long each pop will display on your page.',
    max: 100
  },
  {
    displayName: 'Gap time between two pops',
    key: 'popsInterval',
    helpText: 'The time interval between two popup notification.',
    max: 100
  },
  {
    displayName: 'Time before the first pop',
    key: 'firstDelay',
    helpText: 'The delay time before the first notification.',
    max: 100
  },
  {
    displayName: 'Maximium of popups',
    key: 'maxPopsDisplay',
    helpText:
      'The maximium number of popups are allowed to show after page loading. Maximum number is 80.',
    max: 80
  }
];
