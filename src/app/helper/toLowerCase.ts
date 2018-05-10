export function toCamelCase(str) {
  // Lower cases the string
  return str.toLowerCase()
    // Replaces any - or _ characters with a space
    .replace( /[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace( /[^\w\s]/g, '')
    .replace(/(^| )(\w)/g, (x) => x.toUpperCase() );
}
export function CamelCaseToNormalString(str) {
  const result =  str.replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); });
  return result.trim();
  // return str.replace(/([A-Z]+)/g, "$1").replace(/([A-Z][a-z])/g, "$1").trim();
}
