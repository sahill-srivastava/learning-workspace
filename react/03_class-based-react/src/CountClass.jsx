import { Component } from "react";

class CountClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.val,
    };

    console.log(props.name + "constructor");
  }

  componentDidMount() {
    console.log(this.props.name + "mount");
  }

  render() {
    console.log(this.props.name + "render");

    return (
      <>
        <h1>This is {this.props.name} Count Class</h1>
        <div>{this.state.count}</div>
        <button
          onClick={() => {
            this.setState({
              count: this.props.val + 1,
            });
          }}
        >
          click
        </button>
      </>
    );
  }
}

export default CountClass;
