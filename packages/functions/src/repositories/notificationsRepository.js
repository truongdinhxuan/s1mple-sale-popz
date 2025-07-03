import {Firestore} from '@google-cloud/firestore';
import {formatDateFields} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

async function getNotifications() {
  const noti = await collection.get();
  return noti.docs.map(doc => ({id: doc.id, ...formatDateFields(doc.data())}));
}

const getNotificationsByShopDomain = async shopDomain => {
  const notifications = await collection.where('shopDomain', '==', shopDomain).get();
  if (notifications.empty) {
    return [];
  }
  return notifications.docs.map(notification => {
    return {...notification.data(), id: notification.id};
  });
};

async function createNotification(data) {
  const created = await collection.add({...data});
  return created.id;
}

module.exports = {getNotifications, getNotificationsByShopDomain, createNotification};
