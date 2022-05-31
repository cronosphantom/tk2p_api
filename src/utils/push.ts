import * as OneSignal from 'onesignal-node';  
import { ProgramItem, Subscription } from '../models';

const client = new OneSignal.Client(process.env.ONESIGNAL_APPID || "", process.env.ONESIGNAL_APIKEY || "");

export default async function sendPush(programItem: ProgramItem, subscription: Subscription ) {
  const notification = {
    included_segments: ["Active Users"],
    data: {programItemId: programItem.id, subscriptionId: subscription.id},
    contents: {
      'en': programItem.text,
    },
  };
  
  // using async/await
  try {
    const response = await client.createNotification(notification);
    console.log(response.body.id);
    return response.body
  } catch (e) {
    if (e instanceof OneSignal.HTTPError) {
      // When status code of HTTP response is not 2xx, HTTPError is thrown.
      console.log(e.statusCode);
      console.log(e.body);
    }
    return e
  }
  
  // or you can use promise style:

}