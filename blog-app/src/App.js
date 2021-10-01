import "./App.css";
import React, { Component } from "react";
import BlogCard from "./components/BlogCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "remixicon/fonts/remixicon.css";

export default class App extends Component {
  //it works first - do not forget :d
  constructor() {
    super();
    this.timeout = null;
    this.state = {
      list: [],
      data: [],
      offset: 0,
      maxSize: 10,
      totalPage: 0,
      showModal: false,
      showSuccess: false,
      showError: false,
      unChangedData: [],
      title: "",
      body: "",
      id: "",
    };
  }

  //We fetch our data here as it is the first place to work after loading render
  //To limit the data, we equalize the data returned from the function.
  //We only want to see undeleted data
  componentDidMount() {
    fetch("https://615224e54a5f22001701d661.mockapi.io/posts")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.delete === false);

        this.setState(
          {
            data: filteredData,
            totalPage: filteredData.length,
            unChangedData: filteredData,
          },
          () => {
            this.setState({
              list: this.getItems(this.state.offset, this.state.maxSize),
              offset: this.state.offset + 10,
              maxSize: this.state.maxSize + 10,
            });
          }
        );
      });
  }
  //delete data from blog cards with id
  deleteData = (id) => {
    //const list = this.state.list.filter((item) => item.id !== id);
    //After 3 seconds a pop up will show on the screen

    fetch("https://615224e54a5f22001701d661.mockapi.io/posts/" + id, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delete: true }),
    })
      .then((res) => res.json())
      .then((res) =>
        res !== undefined
          ? this.setState({ showSuccess: true })
          : this.setState({ showError: true })
      );
    this.timeout = setTimeout(() => {
      this.setState({
        showSuccess: false,
        showError: false,
        list: this.state.list.filter((item) => item.id !== id),
        data: this.state.data.filter((item) => item.id !== id),
        unChangedData: this.state.unChangedData.filter(
          (item) => item.id !== id
        ),
        totalPage:
          this.state.list.length !== 0 ? this.state.list.length - 1 : 0,
      });
    }, 3000);
    return () => {
      // clean
      clearTimeout(this.timeout);
    };
  };
  //We replace the title and body fields with the incoming data
  editPost = (data) => {
    this.setState(
      {
        title: data.title,
        body: data.body,
        id: data.id,
      },
      () => {
        this.setState({ showModal: true });
      }
    );
  };
  //We send the new title and body of the data using id with the put operation
  savePost = () => {
    fetch(
      "https://615224e54a5f22001701d661.mockapi.io/posts/" + this.state.id,
      {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.state.title,
          body: this.state.body,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        let indexOfList = this.state.list.indexOf(
          this.state.list.find((l) => l.id === this.state.id)
        );
        const list = this.state.list;
        list[indexOfList] = res;

        let indexOfData = this.state.data.indexOf(
          this.state.data.find((l) => l.id === this.state.id)
        );
        const data = this.state.data;
        data[indexOfData] = res;
        let indexOfUnChangedData = this.state.unChangedData.indexOf(
          this.state.unChangedData.find((l) => l.id === this.state.id)
        );
        const unChangedData = this.state.unChangedData;
        unChangedData[indexOfUnChangedData] = res;
        this.setState({
          data: data,
          list: list,
          unChangedData: unChangedData,
          showModal: false,
        });
      });
  };
  //As we enter data from the keyboard, we synchronize the data to the title if it is title, and to the body if it is body.
  editItems = (event) => {
    switch (event.target.name) {
      case "title":
        this.setState({
          title: event.target.value,
        });
        break;
      case "body":
        this.setState({
          body: event.target.value,
        });
        break;
      default:
        break;
    }
  };

  //Clicking the button for load more increases the maxsize and offset
  // increases the list in the state without resetting it.
  loadMore = () => {
    this.setState(
      {
        list: [
          ...this.state.list,
          ...this.getItems(this.state.offset, this.state.maxSize),
        ],
      },
      () => {
        this.setState({
          offset: this.state.offset + 10,
          maxSize: this.state.maxSize + 10,
        });
      }
    );
  };
  //Gets offset and maxsize for getItems function.
  //If length is not increasing by 10, we piped it to a function to increase the total data by length
  getItems = (min, max) => {
    let tempList = [];
    for (var i = min; i < this.getMin(max, this.state.totalPage); i++) {
      tempList.push(this.state.data[i]);
    }
    return tempList;
  };
  getMin = (num1, num2) => {
    return Math.min(num1, num2);
  };
  searchBlog = (searchKey) => {
    this.setState(
      {
        offset: 0,
        maxSize: 10,
      },
      () => {
        const searchedData = this.state.unChangedData.filter((item) =>
          item.title.includes(searchKey)
        );
        this.setState(
          {
            data: !!searchKey ? searchedData : this.state.unChangedData,
            totalPage: !!searchKey
              ? searchedData.length
              : this.state.unChangedData.length,
          },
          () => {
            this.setState({
              list: this.getItems(this.state.offset, this.state.maxSize),
              offset: this.state.offset + 10,
              maxSize: this.state.maxSize + 10,
            });
          }
        );
      }
    );
  };

  render() {
    return (
      <div className="wrapper">
        <Header searchBlog={this.searchBlog} />
        <main>
          {this.state.showModal && (
            <div className="modalWrapper">
              <div className="modal">
                <div className="modalHeader">
                  <div className="close">
                    <span onClick={() => this.setState({ showModal: false })}>
                      <i className="ri-close-line" />
                    </span>
                  </div>
                  <h3>EDIT POST</h3>
                </div>

                <div>
                  <div>
                    <div className="label">Title</div>
                    <input
                      name="title"
                      defaultValue={this.state.title}
                      onChange={this.editItems}
                    />
                  </div>
                  <div>
                    <div className="label">Content</div>
                    <textarea
                      rows="7"
                      name="body"
                      defaultValue={this.state.body}
                      onChange={this.editItems}
                    />
                  </div>
                  <button onClick={this.savePost}>SAVE</button>
                </div>
              </div>
            </div>
          )}

          <div className="blog">
            {this.state.list.map((data) => (
              //sent the data to the component and set the unique id
              <BlogCard
                data={data}
                totalPage={this.state.totalPage}
                key={data.id}
                deleteData={this.deleteData}
                editPost={this.editPost}
              />
            ))}
          </div>
          {this.state.showSuccess && (
            <div className="popupSuccess">
              <div className="modalWrapper">
                <div className="modal">
                  <span
                    className="close-icon"
                    onClick={() => {
                      this.setState({ showSuccess: false });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {this.state.showError && (
            <div className="popupError">
              <div className="modalWrapper">
                <div className="modal">
                  <span
                    className="close-icon"
                    onClick={() => {
                      this.setState({ showError: false });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {this.state.totalPage > this.state.offset && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-4em",
              }}
            >
              {
                <button
                  className="loadMore"
                  onClick={() => {
                    this.loadMore();
                  }}
                >
                  Load More
                </button>
              }
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}
