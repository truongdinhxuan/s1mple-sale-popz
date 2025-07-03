import {SettingsIcon, NotificationFilledIcon} from '@shopify/polaris-icons';

const menuIcons = [
  {
    icon: NotificationFilledIcon,
    destination: '/notifications'
  },
  {
    icon: SettingsIcon,
    destination: '/settings'
  }
  // {
  //   icon: SettingsIcon,
  //   destination: '/optional-scopes'
  // }
];

export const getMenuIcon = url => menuIcons.find(x => x.destination === url)?.icon || SettingsIcon;
