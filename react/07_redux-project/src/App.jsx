import { Provider } from "react-redux";
import appStore from "./app/appStore";
import Selector from "./Selector";
import Dispatch from "./Dispatch";

const App = () => {
  return (
    <Provider store={appStore}>
     <Selector />
     <Dispatch />
    </Provider>
  )
};

export default App;
