import {Firestore} from '@google-cloud/firestore';
import {formatDateFields} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

async function getNotifications({shopDomain, shopId, sortBy}) {
  let query = collection;
  console.log({shopDomain, shopId, sortBy});
  if (shopDomain) {
    query = query.where('shopDomain', '==', shopDomain);
  } else if (shopId) {
    query = query.where('shopId', '==', shopId);
  }
  if (sortBy) {
    const orderDirection = sortBy.toLowerCase() === 'asc' ? 'asc' : 'desc';
    query = query.orderBy('timestamp', orderDirection);
  }
  // console.log('query : ', sortBy);
  const snapshot = await query.get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => {
    const data = {id: doc.id, ...formatDateFields(doc.data())};
    console.log(data);
    return data;
  });
}

async function createNotification(data) {
  const created = await collection.add({...data});
  return created.id;
}

module.exports = {
  getNotifications,
  createNotification
};
