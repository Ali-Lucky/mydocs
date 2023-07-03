const express = require("express");

const app = express();

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn Nodejs",
    prife: 299,
  },
  {
    id: "22",
    name: "Learn Javascript",
    prife: 399,
  },
  {
    id: "33",
    name: "Learn Swagger",
    prife: 499,
  },
];

const PORT = 4000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/v1/lco", (req, res) => {
  res.send("Hello from LCO");
});

app.get("/api/v1/lcoobject", (req, res) => {
  res.send({ id: "55", name: "Learn Backend", price: 999 });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

app.get("/api/v1/courseQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post("/api/v1/courseUpload", (req, res) => {
  console.log(req.headers);
  const sampleFile = req.files.sampleFile;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  sampleFile.mv(path, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is running at PORT 4000");
});
