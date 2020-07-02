import { ISODateString, makeURLParams } from './eventUtils';

async function getEvents(accessToken, email) {
  const now = new Date();
  const date = ISODateString(now);
  const url = makeURLParams(
    `https://www.googleapis.com/calendar/v3/calendars/${email}/events`,
    {
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
      timeMin: date,
    }
  );

  return fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((jsonRes) => {
        //console.log(jsonRes['items']);
        return jsonRes['items'];
      });
    } else {
      return `Error ${res.status} \n${res.statusText}`;
    }
  });
}

export { getEvents };
