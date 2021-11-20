const html = require("html-template-tag");
const layout = require("./layout");
//pages is an array of object.  each object would be a page.
module.exports = (pages) =>
  layout(html` <h3>Pages</h3>
    <hr />
    <form method="GET" action="/wiki/search">
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </form>
    <hr />
    <ul class="list-unstyled">
      <ul>
        ${pages.map(
          (page) => html`
            <li>
              <h4><a href="/wiki/${page.slug}">${page.title}</a></h4>
            </li>
          `
        )}
      </ul>
    </ul>`);
