const dboperations = require("./dboperations");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { request, response } = require("express");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/rolecrud", router);

router.use((request, response, next) => {
  //write authen here

  response.setHeader("Access-Control-Allow-Origin", "*"); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Credentials", true);

  // console.log('middleware');
  next();
});

router.route("/health").get((request, response) => {
  // console.log("health check");
  response.json({ status: 200 });
});

router.route("/addfield").post((request, response) => {
  let field = { ...request.body };

  dboperations
    .addField(field)
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/addfaction").post((request, response) => {
  let faction = { ...request.body };

  dboperations
    .addFaction(faction)
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/adddepartment").post((request, response) => {
  let department = { ...request.body };

  dboperations
    .addDepartment(department)
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/addposition").post((request, response) => {
  let position = { ...request.body };

  dboperations
    .addPosition(position)
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/updatefield").post((request, response) => {
  let field = { ...request.body };

  dboperations
    .updateField(field)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/updatefaction").post((request, response) => {
  let faction = { ...request.body };

  dboperations
    .updateFaction(faction)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/updatedepartment").post((request, response) => {
  let department = { ...request.body };

  dboperations
    .updateDepartment(department)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/updateposition").post((request, response) => {
  let position = { ...request.body };

  dboperations
    .updatePosition(position)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/setfieldactivate").post((request, response) => {
  let field = { ...request.body };

  dboperations
    .setFieldActivate(field)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/setfactionactivate").post((request, response) => {
  let faction = { ...request.body };

  dboperations
    .setFactionActivate(faction)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/setdepartmentactivate").post((request, response) => {
  let department = { ...request.body };

  dboperations
    .setDepartmentActivate(department)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/setpositionactivate").post((request, response) => {
  let position = { ...request.body };

  dboperations
    .setPositionActivate(position)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/deletefield/:field_id").delete((request, response) => {
  dboperations
    .deleteField(request.params.field_id)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/deletefaction/:faction_id").delete((request, response) => {
  dboperations
    .deleteFaction(request.params.faction_id)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/deletedepartment/:department_id").delete((request, response) => {
  dboperations
    .deleteDepartment(request.params.department_id)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

router.route("/deleteposition/:position_id").delete((request, response) => {
  dboperations
    .deletePosition(request.params.position_id)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(500);
    });
});

// router.route('/getsitesetting').get((request, response) => {

//     dboperations.getSiteSetting().then(result => {
//         response.json(result);
//     }).catch(err => {
//         console.error(err);
//         response.sendStatus(500);
//     });

// });

// router.route('/updatesitesetting').post((request, response) => {

//     let hospital_setting = { ...request.body };

//     dboperations.updateSiteSetting(hospital_setting).then(result => {
//         response.status(200).json(result);
//     }).catch(err => {
//         console.error(err);
//         response.sendStatus(500);
//     });

// });

var port = process.env.PORT;
app.listen(port);
console.log("role-crud API is running at " + port);
