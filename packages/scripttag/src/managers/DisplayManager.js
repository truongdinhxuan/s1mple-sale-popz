import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  // -- Start method --
  /**
   * Convert string to array of patterns.
   * @param {string} urlString
   * @returns {string[]}
   */
  _parseUrlPatterns(urlString) {
    if (!urlString || typeof urlString !== 'string') {
      return [];
    }
    return urlString
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
  }

  /**
   * Check if string matches a pattern.
   * @param {string} str
   * @param {string} pattern
   * @returns {boolean}
   */
  _isMatch(str, pattern) {
    // Convert the wildcard rule into a regular expression (Regex).
    // 1. Escape regex special characters in `pattern`.
    // 2. Replace the wildcard character '*' with '.*' (matches any character).
    // 3. Add '^' and '$' to ensure the entire string matches the rule.
    const regex = new RegExp(
      '^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*') + '$'
    );
    return regex.test(str);
  }

  /**
   * Check if current page is allowed to display popup.
   * @returns {boolean} - true if allowed, false otherwise.
   */
  isPageAllowed() {
    const {includedUrls, excludedUrls} = this.settings;
    const currentHref = window.location.href; // e.g., https://shop.com/products/1
    const currentPath = window.location.pathname; // e.g., /products/1
    console.log('includedURL: ', includedUrls);
    console.log('excludedURL: ', excludedUrls);

    const includedPatterns = this._parseUrlPatterns(includedUrls);
    const excludedPatterns = this._parseUrlPatterns(excludedUrls);
    console.log('includedPatterns: ', includedPatterns);
    console.log('excludedPatterns: ', excludedPatterns);
    const isExcluded = excludedPatterns.some(
      pattern => this._isMatch(currentHref, pattern) || this._isMatch(currentPath, pattern)
    );

    // Rule 1: If the page is excluded, always return false.
    if (isExcluded) {
      return false;
    }

    const hasInclusionRules = includedPatterns.length > 0;
    // Rule 2: If inclusion rules exist, the page must match at least one.
    if (hasInclusionRules) {
      const isIncluded = includedPatterns.some(
        pattern => this._isMatch(currentHref, pattern) || this._isMatch(currentPath, pattern)
      );
      return isIncluded;
    }

    // Rule 3: By default, if not excluded and no inclusion rules exist, allow display.
    return true;
  }

  // --- END OF NEW METHODS ---

  /*
   * initialize
   */
  async initialize({notifications, settings}) {
    this.settings = settings;

    // CHANGE: Add page check step
    if (!this.isPageAllowed()) {
      console.log('Avada-SalePop: Page is restricted by URL settings. Not displaying.');
      return; // Stop execution if the page is not allowed
    }
    // --- END CHANGE ---

    this.notifications = notifications.slice(0, settings.maxPopsDisplay);
    await this.handleFirstDelay(this.settings.firstDelay);
    await this.handleDisplayDuration();
  }

  async handleDisplayDuration() {
    const {displayDuration, popsInterval} = this.settings;

    for (let i = 0; i < this.notifications.length; i++) {
      this.display({notification: this.notifications[i]});

      if (displayDuration && !isNaN(displayDuration)) {
        await this.delay(displayDuration * 1000);
      }

      this.fadeOut();

      if (popsInterval && !isNaN(popsInterval) && i < this.notifications.length - 1) {
        await this.delay(popsInterval * 1000);
      }
    }
  }

  display({notification}) {
    this.insertContainer();
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup settings={this.settings} {...notification} />, container);
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    if (container) container.innerHTML = '';
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

  handleFirstDelay(firstDelay) {
    if (firstDelay && !isNaN(firstDelay)) {
      return new Promise(resolve => setTimeout(resolve, firstDelay * 1000));
    }
    return Promise.resolve();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
