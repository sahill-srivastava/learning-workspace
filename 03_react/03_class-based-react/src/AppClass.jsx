import { Component } from "react";
import CountClass from "./CountClass";

class AppClass extends Component {
  constructor(props) {
    super(props);

   

    console.log("parent constructor");
  }

  componentDidMount() {
    console.log("parent component did mount");
  }

  render() {
    console.log("parent render");



    return (
      <div>
        <h1>This is App Class</h1>
        <CountClass name="first" val={0} />
        <CountClass name="second" val={100} />
      </div>
    );
  }
}

export default AppClass;
