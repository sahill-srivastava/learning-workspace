import { Component } from "react";

class AppClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
        count: 0,
    }

    console.log("Constructur")
  }


  componentDidMount() {
    console.log("MOunt")
  }

  render() {

    console.log("Render");
    

    const {name} = this.props;
    const {count} = this.state;


    return <div>
        <h1>Class Based Component</h1>
        <div>{name}</div>
        <div>{count}</div>
        <button onClick={() => {
            this.setState({
                count: count + 1,
            })
        }}>click</button>
    </div>;
  }
}

export default AppClass;
