import React, { Component } from "react";
import "../styling/InterestingQuestions.css";
import { Link } from "react-router-dom";
import Axios from "axios";

class InterestingQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: 0,
      upVote: 0,
      downVote: 0
    };
  }
  componentDidMount() {
    this.getQuestions();
  }

  // GET latest questions from QuestionsTable
  getQuestions = () => {
    Axios.get("https://suncoast-overflow.herokuapp.com/api/questions")
      .then(questionData => {
        console.log(questionData.data);
        this.setState({
          data: questionData.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // TODO refactor into one function that takes another perimeter
  // PATCH up vote to question to QuestionsTable
  handleUpVoteQuestion = id => {
    // if () {

    // }
    const PATCH_UP_URL = `https://suncoast-overflow.herokuapp.com/api/questions/up/${id}`;
    Axios.patch(PATCH_UP_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        upVoteQuestion: this.state.upVote
      })
    })
      .then(_ => {
        this.getQuestions();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // PATCH down vote to question to QuestionsTable
  handleDownVoteQuestion = id => {
    const PATCH_DOWN_URL = `https://suncoast-overflow.herokuapp.com/api/questions/down/${id}`;
    Axios.patch(PATCH_DOWN_URL, {
      // mode: "no-cors",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upVoteQuestion: this.state.downVote
      })
    })
      .then(_ => {
        this.getQuestions();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <section>
        <section className="questions-container">
          {this.state.data.map((question, i) => {
            return (
              <section key={i} className="top-questions">
                <section className="vote-buttons">
                  <button
                    name="upVote"
                    onClick={() => {
                      this.handleUpVoteQuestion(question.id);
                    }}
                  >
                    {question.upVoteQuestion}
                  </button>
                  <button
                    name="downVote"
                    onClick={() => {
                      this.handleDownVoteQuestion(question.id);
                    }}
                  >
                    {question.downVoteQuestion}
                  </button>
                </section>
                <section className="question-container">
                  <Link
                    to={`/questions/${question.id}/${question.titleOfQuestion}`}
                  >
                    <header>{question.titleOfQuestion}</header>
                  </Link>
                  <section className="date-and-user">
                    <header>Asked {question.dateOfQuestion}</header>
                    <header>by {question.user}</header>
                  </section>
                </section>
              </section>
            );
          })}
        </section>
      </section>
    );
  }
}

export default InterestingQuestions;
