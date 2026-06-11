import { Provider } from "react-redux";
import appStore from "./app/appStore";

const App = () => {
  return (
    <Provider store={appStore}>
      <div>App</div>;
    </Provider>
  )
};

export default App;
