import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('settings');

async function getSettings(shopID) {
  if (!shopID) {
    throw new Error('shopId is required and cannot be undefined');
  }
  const settingDocs = await collection
    .where('shopId', '==', shopID)
    .limit(1)
    .get();

  const settingDoc = settingDocs.docs[0];
  if (settingDocs.empty) {
    return null;
  }
  return {
    id: settingDoc.id,
    ...settingDoc.data()
  };
}

async function getSettingsByShopDomain(shopDomain) {
  const settings = await collection.where('shopDomain', '==', shopDomain).get();
  if (!settings.empty) {
    return settings.docs[0].data();
  }
  return null;
}

async function createSettings(shopId, data) {
  const snapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    console.log(`Settings already exist for shopId: ${shopId}`);
    return;
  }

  return await collection.add({
    ...data,
    shopId: shopId
  });
}

async function updateSettings(shopID, data) {
  const snapshot = await collection
    .where('shopId', '==', shopID)
    .limit(1)
    .get();
  const [doc] = snapshot.docs;
  return await doc.ref.update({...data});
}

module.exports = {getSettings, getSettingsByShopDomain, createSettings, updateSettings};
