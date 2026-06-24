import Name from "./Name";
import { withUppercase } from "./highordercomponent/withUppercase";

const App = () => {

  const data = {
    name: "sahil",
    age: 24,
    city: "lucknow"
  }

  const UpperCase = withUppercase(Name);

  return (
    <div>
      <UpperCase data={data} />
    </div>
  );
};

export default App;
