import {delay} from './firstDelayHelper';

export async function displayDuration(notifications, settings, display, fadeOut) {
  const {displayDuration, popsInterval} = settings;

  for (let i = 0; i < notifications.length; i++) {
    display(notifications[i]);

    if (displayDuration && !isNaN(displayDuration)) {
      await delay(displayDuration * 1000);
    }
    fadeOut();

    if (popsInterval && !isNaN(popsInterval) && i < notifications.length - 1) {
      await delay(popsInterval * 1000);
    }
  }
}
