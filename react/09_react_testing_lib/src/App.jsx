import sum from "./__tests__/sum";

function App() {

  console.log(sum)

  const result = sum(2, 3)

  return <h1>{result}</h1>;
}

export default App;