import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import {handleFirstDelay, delay} from '../helpers/firstDelayHelper';
import {displayDuration} from '../helpers/displayDurationHelper';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  /*
   * initialize
   */
  async initialize({notifications, settings}) {
    this.notifications = notifications.slice(0, settings.maxPopsDisplay);
    this.settings = settings;
    await handleFirstDelay(this.settings.firstDelay);
    await this.handleDisplayDuration();
  }

  async handleDisplayDuration() {
    await displayDuration(
      this.notifications,
      this.settings,
      notification => this.display({notification}),
      () => this.fadeOut()
    );
  }

  display({notification}) {
    this.insertContainer();
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup settings={this.settings} {...notification} />, container);
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}
