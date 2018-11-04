import React, { Component } from "react";
import "../styling/SearchResults.css";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.match.params.searchTerm,
      searchResults: []
    };
  }

  componentDidMount() {
    fetch("https://localhost:5001/api/search?q=" + this.state.searchTerm)
      .then(resp => resp.json())
      .then(resultData => {
        console.log(resultData);
        this.setState({
          searchResults: resultData
        });
      });
  }

  //   //   // handle event for search bar
  //   //   handleSearch = e => {
  //   //     e.preventDefault();
  //   //   };

  //   // handle event for search input
  //   handleChange = e => {
  //     this.setState({
  //       [e.target.name]: e.target.value
  //     });
  //   };

  render() {
    return (
      <div>
        <section className="page-body">
          <header>Your search for "{this.state.searchTerm}"</header>
          {this.state.searchResults.map((question, i) => {
            return (
              <section key={i} className="details-container">
                <section className="detail-pane">
                  <section className="vote-buttons">
                    <button
                      className="vote-count"
                      name="upVote"
                      //   onClick={() => {
                      //     this.handleUpVoteQuestion(question.id);
                      //   }}
                    >
                      {question.upVoteQuestion}
                    </button>
                    <button
                      className="vote-count"
                      name="downVote"
                      //   onClick={() => {
                      //     this.handleDownVoteQuestion(question.id);
                      //   }}
                    >
                      {question.downVoteQuestion}
                    </button>
                  </section>
                  <section className="question-container">
                    <Link
                      to={`/questions/${question.id}/${
                        question.titleOfQuestion
                      }`}
                    >
                      <header className="question-header">
                        {question.titleOfQuestion}
                      </header>
                    </Link>
                    <section className="user-details">
                      <header>Asked {question.dateOfQuestion}</header>
                      <header>by {question.user}</header>
                    </section>
                  </section>
                </section>
              </section>
            );
          })}
        </section>
      </div>
    );
  }
}

export default SearchResults;
