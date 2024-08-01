function replaceString(originalString, args) {
  Object.keys(args).forEach((key) => {
    originalString = originalString.replace(
      new RegExp(`{{${key}}}`, "g"),
      args[key]
    );
  });
  return originalString;
}
export default replaceString;
