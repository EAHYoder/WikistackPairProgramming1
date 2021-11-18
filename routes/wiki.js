const express = require("express");
const { Page, main } = require("../models");
const router = express.Router();
const { addPage } = require("../views");

router.get("/", async (req, res, next) => {
  //	retrieve all wiki pages
  try {
    res.send(main());
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  //submit a new page to the database
  try {
    console.log("req.body", req.body);

    //add a new page to the homepage when someone adds one through the /add
    const newPage = await Page.create({
      title: req.body.title,
      content: req.body.pageContent,
      status: req.body.pageStatus,
      slug: "dsfsf",
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.get("/add", async (req, res, next) => {
  //retrieve the "add a page" form
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
