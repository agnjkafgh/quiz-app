import React, { Component } from "react";
import { shuffle } from "../utils";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersJumbled: []
    };
  }

  componentDidMount() {
    if (this.props) {
      let answersJumbled = shuffle([
        this.props.correct_answer,
        ...this.props.incorrect_answers
      ]);

      console.log(answersJumbled);
      this.setState({ answersJumbled });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionNo !== prevProps.questionNo) {
      let answersJumbled = shuffle([
        this.props.correct_answer,
        ...this.props.incorrect_answers
      ]);

      console.log(answersJumbled);
      this.setState({ answersJumbled });
    }
  }

  render() {
    const { questionNo, question, correct_answer, selectedAnswer } = this.props;
    // console.log("question comp", this.props);
    return (
      <div style={{ padding: 40 }}>
        <p style={{ textAlign: "left" }}>{`${questionNo}. ${question}`}</p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          {this.state.answersJumbled.map((d, i) => (
            <div
              data-value={d}
              className={`answerBox ${
                selectedAnswer
                  ? d === correct_answer
                    ? "answerCorrect"
                    : selectedAnswer === d
                    ? "answerIncorrect"
                    : "answered"
                  : ""
              }`}
              onClick={(e) => {
                if (!selectedAnswer)
                  this.props.selectAnswer(e, d, correct_answer);
              }}
            >
              {`${String.fromCharCode(97 + i)}) ${d}`}
            </div>
          ))}
        </form>
      </div>
    );
  }
}

// Main.PropTypes = {
//   questionNo: PropTypes.number,
//   question: PropTypes.string,
//   correct_answer: PropTypes.number,
//   incorrect_answers: PropTypes.number,
// }
