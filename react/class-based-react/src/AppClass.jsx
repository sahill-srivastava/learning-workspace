import { Component } from "react";

class AppClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
        count: 0,
    }
  }

  render() {

    const {name} = this.props;
    const {count} = this.state;


    return <div>
        <h1>Class Based Component</h1>
        <div>{name}</div>
        <div>{count}</div>
    </div>;
  }
}

export default AppClass;
