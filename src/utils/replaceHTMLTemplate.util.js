function replaceHTMLTemplate(htmlTemplate, args) {
  Object.keys(args).forEach((key) => {
    htmlTemplate = htmlTemplate.replace(
      new RegExp(`{{${key}}}`, "g"),
      args[key]
    );
  });
  return htmlTemplate;
}
export default replaceHTMLTemplate;
