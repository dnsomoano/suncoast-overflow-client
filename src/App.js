import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchResults from "./Components/SearchResults";
import InterestingQuestions from "./Components/InterestingQuestions";
import QuestionDetail from "./Components/QuestionDetail";
import AskQuestion from "./Components/AskQuestion";
import HotQuestions from "./Components/HotQuestions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  // // handle event for search bar
  // handleSearch = e => {
  //   e.preventDefault();
  //   //   fetch("https://localhost:5001/api/search?q=" + this.state.searchTerm)
  //   //     .then(resp => resp.json())
  //   //     .then(results => {
  //   //       console.log(results);
  //   //       this.setState({
  //   //         searchResults: results
  //   //       });
  //   //     });
  // };

  // handle event for search input
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Router>
        <div>
          <section className="App">
            <section className="search-bar">
              <img
                src="./images/stack-overflow.png"
                className="App-logo"
                alt="logo"
              />
              <section className="search-container">
                {/* TODO fix search results displaying */}
                {/* <form onSubmit={this.handleSearch}> */}
                <input
                  className="search-input"
                  name="searchTerm"
                  type="Search"
                  placeholder=" Search..."
                  onChange={this.handleChange}
                />
                <Link to={`/search/${this.state.searchTerm}`}>
                  <button className="submit-button">Submit</button>
                  {/* </form> */}
                </Link>
              </section>
            </section>
          </section>
          <section className="body">
            <section className="left-sidebar">
              <nav>
                <header>Home</header>
                <ul>
                  <header>Public</header>
                  <li>Stack Overflow</li>
                  <li>Tags</li>
                  <li>Users</li>
                  <li>Jobs</li>
                </ul>
              </nav>
            </section>
            <section className="content">
              <section className="mainbar">
                <section className="header-container">
                  <h1>Top Questions</h1>
                  <Link to="/questions/ask">
                    <button className="ask-question">Ask Question</button>
                  </Link>
                </section>
                <section className="Nav-bar">
                  <ul className="questions-breadcrumbs">
                    <li>
                      <Link to="/">
                        <button type="button">Interesting</button>
                      </Link>
                    </li>
                    <li>
                      <button type="button">Featured</button>
                    </li>
                    <li>
                      <Link to="/HotQuestions">
                        <button type="button">Hot</button>
                      </Link>
                    </li>
                  </ul>
                </section>
                <Switch>
                  <Route path="/" exact component={InterestingQuestions} />
                  <Route
                    path="/search/:searchTerm"
                    exact
                    // render={props => (
                    //   <SearchResults
                    //     {...props}
                    //     searchTerm={this.state.searchTerm}
                    //   />
                    // )}
                    component={SearchResults}
                  />
                  <Route
                    path="/questions/:id/:title"
                    exact
                    component={QuestionDetail}
                  />
                  <Route path="/questions/ask" exact component={AskQuestion} />
                  <Route path="/HotQuestions" exact component={HotQuestions} />
                </Switch>
              </section>
              <section className="right-sidebar">
                <header>Hot Network Questions</header>
              </section>
            </section>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
