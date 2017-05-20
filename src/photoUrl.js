export default function photo(url) {
  return `${window.location.protocol}//${window.location.host}/photo?url=${encodeURIComponent(url)}`;
}
