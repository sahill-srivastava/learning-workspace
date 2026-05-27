import { Component } from "react";

class AppClass extends Component {
//   constructor(props) {
//     super(props);

//     console.log(props);
//   }

  render() {
    return <div>
        <h1>Class Based Component</h1>
        <div>{this.props.name}</div>
    </div>;
  }
}

export default AppClass;
