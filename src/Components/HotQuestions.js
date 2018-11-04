import React, { Component } from "react";
// import { Link } from "react-router-dom";

class HotQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
      upVote: 0,
      downVote: 0,
      title: "",
      body: "",
      date: new Date(),
      user: ""
    };
  }
  componentDidMount() {
    fetch("https://localhost:5001/api/questions", {
      //   mode: "no-cors"
    })
      .then(resp => resp.json())
      .then(questions => {
        console.log(questions);
        this.setState({
          data: questions
        });
      });
  }

  render() {
    return (
      <section>
        <div />
        {/* <section>
            {this.state.data.map((questions, i) => {
              return <section key={i}>{questions}</section>;
            })}
          </section> */}
      </section>
    );
  }
}

export default HotQuestions;
