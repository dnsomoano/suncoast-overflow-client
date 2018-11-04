import React, { Component } from "react";
import "../styling/QuestionDetail.css";
class QuestionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: this.props.match.params.id,
      title: this.props.match.params.title,
      user: "",
      body: "",
      upVote: 0,
      downVote: 0,
      upVoteAns: 0,
      downVoteAns: 0,
      answers: [],
      answerBody: ""
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  // GET question and answers from QuestionsTable
  getQuestions = () => {
    const BASE_URL = "https://suncoast-overflow.herokuapp.com/api/questions/";
    fetch(BASE_URL + `${this.state.id}`)
      .then(resp => resp.json())
      .then(questions => {
        console.log(questions);
        this.setState({
          data: questions
        });
        this.setState({
          title: questions.titleOfQuestion,
          user: questions.user,
          body: questions.bodyOfQuestion,
          upVote: questions.upVoteQuestion,
          downVote: questions.downVoteQuestion,
          answers: questions.answers
        });
      });
  };

  // PATCH up vote to question to QuestionsTable
  handleUpVoteQuestion = id => {
    const PATCH_UP_URL = `https://suncoast-overflow.herokuapp.com/api/questions/up/${id}`;
    fetch(PATCH_UP_URL, {
      // mode: "no-cors",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upVoteQuestion: this.state.upVote
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        this.getQuestions();
      });
  };

  // PATCH down vote to question to QuestionsTable
  handleDownVoteQuestion = id => {
    const PATCH_DOWN_URL = `https://suncoast-overflow.herokuapp.com/api/questions/down/${id}`;
    fetch(PATCH_DOWN_URL, {
      // mode: "no-cors",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upVoteQuestion: this.state.downVote
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        this.getQuestions();
      });
  };

  // PATCH up vote to answer to AnswersTable
  handleUpVoteAnswer = id => {
    const PATCH_UP_ANSWER_URL = `https://suncoast-overflow.herokuapp.com/api/answers/up/${id}`;
    fetch(PATCH_UP_ANSWER_URL, {
      // mode: "no-cors",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UpVoteAnswer: this.state.upVoteAns
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        this.getQuestions();
      });
  };

  // PATCH down vote to answer to AnswersTable
  handleDownVoteAnswer = id => {
    const PATCH_DOWN_ANSWER_URL = `https://suncoast-overflow.herokuapp.com/api/answers/down/${id}`;
    fetch(PATCH_DOWN_ANSWER_URL, {
      // mode: "no-cors",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        downVoteAnswer: this.state.downVoteAns
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        this.getQuestions();
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // POST an answer to AnswersTable
  handleSubmitAnswer = e => {
    const ANSWERS_BASE_URL =
      "https://suncoast-overflow.herokuapp.com/api/answers/";
    e.preventDefault();
    fetch(ANSWERS_BASE_URL + `${this.state.id}`, {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        User: this.state.user,
        bodyOfAnswer: this.state.answerBody
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        this.getQuestions();
      });
  };

  render() {
    return (
      <div>
        <section className="page-body">
          <section className="details-container">
            <header className="question-header">{this.state.title}</header>
            <section className="detail-pane">
              <button
                className="vote-count"
                name="upVote"
                onClick={() => {
                  this.handleUpVoteQuestion(this.state.id);
                }}
              >
                {this.state.upVote}
              </button>
              <button
                className="vote-count"
                name="downVote"
                onClick={() => {
                  this.handleDownVoteQuestion(this.state.id);
                }}
              >
                {this.state.downVote}
              </button>
              <section className="details-body">
                {this.state.body}
                <section className="user-details">{this.state.user}</section>
              </section>
            </section>
          </section>
          {this.state.answers.map((answer, i) => {
            return (
              <section key={i} className="details-container">
                <section className="detail-pane">
                  <section className="vote-count">
                    <button
                      className="vote-count"
                      name="upVoteAns"
                      onClick={() => {
                        this.handleUpVoteAnswer(answer.id);
                      }}
                    >
                      {answer.UpVoteAnswer}
                    </button>
                    <button
                      className="vote-count"
                      name="downVoteAns"
                      onClick={() => {
                        this.handleDownVoteAnswer(answer.id);
                      }}
                    >
                      {answer.downVoteAnswer}
                    </button>
                  </section>
                  <section className="details-body">
                    {answer.bodyOfAnswer}
                    <header className="user-details">
                      {answer.user}
                      {answer.dateOfAnswer}
                    </header>
                  </section>
                </section>
              </section>
            );
          })}
          <section>
            <form>
              <textarea name="answerBody" onChange={this.handleChange} />
              <button onClick={this.handleSubmitAnswer}>
                Post Your Answer
              </button>
            </form>
          </section>
        </section>
      </div>
    );
  }
}

export default QuestionDetail;
