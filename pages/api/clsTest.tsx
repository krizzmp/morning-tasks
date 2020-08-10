class Controller {
  get() {}
  post() {}
  put() {}
  delete() {}
}
function f(clazz: typeof Controller) {
  return (req, res) => {
    let controller = new clazz();
    switch (req.method) {
      case "POST":
        return res.status(200).json(controller.post());
      case "GET":
        return res.status(200).json(controller.get());
      case "PUT":
        return res.status(200).json(controller.put());
      case "DELETE":
        return res.status(200).json(controller.delete());
    }
  };
}
export default f(class ClsTest extends Controller {
    get(){
        return {test:2}
    }
});
