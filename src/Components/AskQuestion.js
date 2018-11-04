import React, { Component } from "react";
// TODO form needs A LOT of styling
import "../styling/AskQuestion.css";

class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: "",
      title: "",
      body: ""
    };
  }
  // componentDidMount() {
  //   this.getQuestions();
  // }

  // // GET latest questions from QuestionsTable
  // getQuestions = () => {
  //   fetch("https://suncoast-overflow.herokuapp.com/api/questions")
  //     .then(resp => resp.json())
  //     .then(questions => {
  //       console.log(questions);
  //       this.setState({ data: questions });
  //     });
  // };

  // POST question to QuestionsTable
  handleSubmitQuestion = e => {
    e.preventDefault();
    fetch("https://suncoast-overflow.herokuapp.com/api/questions", {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        User: this.state.user,
        titleOfQuestion: this.state.title,
        bodyOfQuestion: this.state.body,
        DateOfQuestion: this.state.date
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        // this.getQuestions();
        console.log(_);
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
        <section className="post-question">
          <form>
            <header>
              <input
                type="text"
                placeholder="Username? (Optional)"
                name="user"
                onChange={this.handleChange}
              />
            </header>
            <h2>Type in a title</h2>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={this.handleChange}
            />
            <p>Type in your question</p>
            <textarea name="body" onChange={this.handleChange} />
            {/* <textarea height="200" width="600" name="Question" /> */}
            <button onClick={this.handleSubmitQuestion}>Submit Question</button>
          </form>
        </section>
      </section>
    );
  }
}

export default AskQuestion;
