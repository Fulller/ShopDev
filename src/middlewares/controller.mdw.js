function controller(fnController) {
  return (req, res, next) => {
    fnController(req, res, next).catch(next);
  };
}
export default controller;
