export default function photo(url) {
  if( url.indexOf("http") == 0 ) {
    // use proxy if it begins with http
    return `${window.location.protocol}//${window.location.host}/photo?url=${encodeURIComponent(url)}`;
  } else {
    return url;
  }
}
