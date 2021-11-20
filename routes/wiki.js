const express = require("express");
const { Page, User } = require("../models");
const router = express.Router();
const { addPage, main, wikiPage } = require("../views");
//const Sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  //	retrieve all wiki pages
  try {
    let pages = await Page.findAll();

    res.send(main(pages));
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
    });

    //The method findOrCreate will create an entry in the table unless it can find one fulfilling the query options.
    let user = await User.findOrCreate({
      where: {
        [Op.and]: [
          { name: req.body.authorName },
          { email: req.body.authorEmail },
        ],
      },
    });

    //redirect to the new page
    res.redirect(`/wiki/${newPage.slug}`);
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

router.get("/:slug", async (req, res, next) => {
  //retrieve the page for a specific article.
  let page = await Page.findOne({
    where: {
      slug: req.params.slug,
    },
  });

  try {
    res.send(wikiPage(page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
