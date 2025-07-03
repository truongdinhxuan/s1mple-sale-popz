import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';

(async () => {
  console.log('This is the script tag');
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, settings} = await apiManager.getNotifications();
  displayManager.initialize({notifications, settings});
})();
