import _ from "lodash";

const data = {
  status: {
    code: 200,
    reason: "OK",
    success: true,
  },
  message:
    "Deleted file http://localhost:9000/shopdev/1720508855543_dac3indepthguide_sqlbestpractices.pdf successfuly",
  metadata: {
    fileUrl:
      "http://localhost:9000/shopdev/1720508855543_dac3indepthguide_sqlbestpractices.pdf",
  },
};

console.log(_.flatMap(_.pick(data, ["status", "metadata"])));
