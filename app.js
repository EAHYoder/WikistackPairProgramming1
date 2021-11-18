const express = require("express");
const app = express();
const morgan = require("morgan");
const views = require("./views");
const { db, Page, User } = require("./models");

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev")); //middleware for loggin messages
app.use(express.static(__dirname + "/public")); //making routes for all files in the public directory
app.use(express.urlencoded({ extended: false })); //body parser

//plugging in routers
app.use("/wiki", require("./routes/wiki"));
app.use("/user", require("./routes/users"));

//routing for visting the homepage
app.get("/", (req, res) => {
  res.redirect("/wiki");
});

//catch all 404
app.use((req, res) => {
  res.status(404).send("<h1>I do not have mapping for that</h1>");
});

//error handler
app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});

const PORT = 1337;
const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
