import React from "react";
import "../App";

// got the data and other props
//send the keys here for the search process
function Header({ searchBlog }) {
  return (
    <header className="wrapper">
      <nav>
        <ul>
          <li className="logo">
            <h4>Ayşegül Topyürek</h4>
            <h5>Blog</h5>
          </li>
          <li>
            <div className="search">
              <input
                onChange={(event) => searchBlog(event.target.value)}
                type="search"
                placeholder="Search"
              />
              <i className="ri-search-line" style={{ border: "none" }} />
            </div>
          </li>
          <li>
            <div className="socialMedia">
              <a
                href="https://github.com/AysegulTopyurek"
                target={"_blank"}
                rel={"noReferrer"}
              >
                <i className="ri-github-line" />
              </a>
              <a
                href={"https://www.linkedin.com/in/aysegultopyurek/"}
                target={"_blank"}
                rel={"noReferrer"}
              >
                <i className="ri-linkedin-box-fill" />
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div className="hi">
        <h1>
          I'am
          <br />
          Ayşegül
        </h1>
      </div>
    </header>
  );
}

export default Header;
