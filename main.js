const express = require("express");
const app = express();
const migrationhelper = require("./migrationhelper");
const port = 3000; // "Radiofrekvens"
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize, Applications } = require("./models");
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.get("/applications", async (req, res) => {
  let foundApplications = await Applications.findAll();
  let mappedApplications = foundApplications.map((p) => ({
    companyName: p.companyName,
    applicationStatus: p.applicationStatus,
    response: p.response,
    id: p.id,
  }));
  res.json(mappedApplications);
});

app.post("/applications", async (req, res) => {
  const createdData = await Applications.create(req.body);

  res.status(201).json({ message: "Application data created successfully" });
});

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`Example app listening2 on port ${port}`);
});
