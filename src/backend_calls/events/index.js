import { ISODateString, makeURLParams } from './eventUtils';
import { scrapeImageOCR } from './imageScraping';

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
        return jsonRes['items'];
      });
    } else {
      return `Error ${res.status} \n${res.statusText}`;
    }
  });
}

function addNewEvent(accessToken, email, jsonObject, date) {
  const dateOptions = date.split('/');
  const dateOfEventStart = new Date(
    dateOptions[2],
    dateOptions[0],
    dateOptions[1],
    jsonObject.start_time.slice(0, 1),
    jsonObject.start_time.slice(2, 4)
  );
  const dateOfEventEnd = new Date(
    dateOptions[2],
    dateOptions[0],
    dateOptions[1],
    jsonObject.start_time.slice(0, 1),
    jsonObject.start_time.slice(2, 4)
  );
  const googleDateStart = ISODateString(dateOfEventStart);
  const googleDateEnd = ISODateString(dateOfEventEnd);
  const url = `https://www.googleapis.com/calendar/v3/calendars/${email}/events`;
  return fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: {
      start: {
        dateTime: googleDateStart,
      },
      end: {
        dateTime: googleDateEnd,
      },
      summary: jsonObject.title,
      location: jsonObject.location,
    },
  }).then((res) => {
    console.log(res);
  });
}

export { getEvents, scrapeImageOCR, addNewEvent };
