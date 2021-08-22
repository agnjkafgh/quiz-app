import React, { Component } from "react";
import Question from "./Question";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentQuestion: 1,
      score: 0,
      currentQuestionScore: 0,
      answeredQuestions: []
    };
  }

  componentDidMount() {
    // console.log("mounted");
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        // console.log("fetched", response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        this.setState({ data: data.results });
      });
  }

  onNextButtonPress = () => {
    let answersSelected = document.getElementsByClassName("answerSelected");
    // console.log("test", answersSelected[0].dataset.value);
    let answeredQuestions =
      answersSelected.length === 1
        ? [...this.state.answeredQuestions, answersSelected[0].dataset.value]
        : this.state.answeredQuestions;
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      score: this.state.score + this.state.currentQuestionScore,
      currentQuestionScore: 0,
      answeredQuestions
    });
    for (let item of answersSelected) {
      item.classList.remove("answerSelected");
    }
  };

  onPrevButtonPress = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion - 1
    });
  };

  selectAnswer = (e, selectedVal, correctAnswer) => {
    let currentQuestionScore = 0;
    let answersSelected = document.getElementsByClassName("answerSelected");
    for (let item of answersSelected) {
      item.classList.remove("answerSelected");
    }
    e.target.classList.add("answerSelected");
    if (selectedVal === correctAnswer) currentQuestionScore = 10;
    else currentQuestionScore = -5;
    this.setState({ currentQuestionScore });
  };

  render() {
    const {
      currentQuestion,
      data,
      currentQuestionScore,
      answeredQuestions
    } = this.state;
    return (
      <div>
        <p style={{ float: "right" }}>Score: {this.state.score}</p>
        {data && data.length > 0 && currentQuestion !== data.length ? (
          <Question
            questionNo={currentQuestion}
            question={data[currentQuestion - 1].question}
            correct_answer={data[currentQuestion - 1].correct_answer}
            incorrect_answers={data[currentQuestion - 1].incorrect_answers}
            selectAnswer={this.selectAnswer}
            selectedAnswer={
              answeredQuestions.length >= currentQuestion - 1
                ? answeredQuestions[currentQuestion - 1]
                : null
            }
          />
        ) : (
          "No further questions"
        )}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            marginLeft: "5%",
            marginRight: "5%",
            width: "90%"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={this.onPrevButtonPress}
              disabled={currentQuestion === 1}
            >
              Previous
            </button>
            <button
              onClick={this.onNextButtonPress}
              disabled={
                currentQuestion === data.length ||
                (answeredQuestions.length < currentQuestion &&
                  currentQuestionScore === 0)
              }
            >
              {currentQuestion === data.length ? "Finished!" : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
