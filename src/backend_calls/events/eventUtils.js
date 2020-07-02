function pad(n) {
  return n < 10 ? '0' + n : n;
}

export function ISODateString(d) {
  return (
    d.getUTCFullYear() +
    '-' +
    pad(d.getUTCMonth() + 1) +
    '-' +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    ':' +
    pad(d.getUTCMinutes()) +
    ':' +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

// Adds Params to URL
export function makeURLParams(url, params) {
  var tempURL = new URL(url, params);
  Object.keys(params).forEach((key) =>
    tempURL.searchParams.append(key, params[key])
  );
  return tempURL;
}
