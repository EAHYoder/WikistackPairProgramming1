const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    //defaultValue: "open"
  },
});

Page.beforeValidate((page) => {
  //helper function that transformat the title into somethng for the slug
  function slugger(title) {
    //the fist call to replace puts an underscore where the white space is.
    //the second call to replace removes any non alphanumeric characters,
    return title.replace(/\s+/g, "_").replace(/\W/g, "");
  }
  page.slug = slugger(page.title);
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    //unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

Page.belongsTo(User, { as: "author" }); //this will make the user key appear as a column in the page table, and that column will be called author.

module.exports = {
  db,
  Page,
  User,
};
