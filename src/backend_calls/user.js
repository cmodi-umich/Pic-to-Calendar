import * as Google from 'expo-google-app-auth';
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, SCOPES } from '../../config';

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      scopes: SCOPES,
    });

    if (result.type === 'success') {
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e);
    return { error: true };
  }
}

export { signInWithGoogleAsync };
