import React from "react";
import "../App.css";
// got the data and other props
//control the delete and edit buttons here
function BlogCard({ data, totalPage, deleteData, editPost }) {
  return (
    <div className="posts">
      <div className="card">
        <div className="img-container">
          <img src={data.image} alt="Posts" />
        </div>
        <div className="card-content">
          <h2>{data.title}</h2>
          <p className="excerpt">{data.body}</p>
          <div className="btnSet">
            <button className="editButton" onClick={() => editPost(data)}>
              <i className="ri-edit-2-fill" />
            </button>
            <button
              className="deleteButton"
              onClick={() => deleteData(data.id)}
            >
              <i className="ri-delete-bin-fill" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
