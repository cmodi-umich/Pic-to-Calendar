export function scrapeImageOCR(setJSONInformation, setPhotoAnalyzed, setError) {
  fetch('http://192.168.1.13:5000/api/scrape', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ base64: photo.base64 }),
  })
    .then((res) =>
      res.json().then((jsonObject) => {
        setJSONInformation(jsonObject);
        setPhotoAnalyzed(true);
      })
    )
    .catch((err) => {
      try {
        err.json().then((jsonObject) => {
          setError(jsonObject);
          setPhotoAnalyzed(true);
        });
      } catch (err) {
        setError(err);
      }
    });
}
