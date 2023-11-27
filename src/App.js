import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-'];

  const updateCalc = value => {
    if (ops.includes(value) && calc === '' || ops.includes(value) && ops.includes(calc.slice(-1))) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      try {
        setResult(eval(calc + value).toString());
      } catch (error) {
        console.log(error);
      }
    }
  }

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
        </button>
      )
    }

    return digits;
  }

  const calculate = () => {
    try {
      setCalc(eval(calc).toString());
    } catch (error) {
      console.log(error);
    }
  }

  const reset = () => {
    setCalc(calc.slice(0, -1));
  }

  return (
    <main className="main">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''}
           
          {calc || '0'}
        </div>

        <div className="operators">
          {ops.map(op => (
            <button onClick={() => updateCalc(op)} key={op}>{op}</button>
          ))}
          <button onClick={reset}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </main>
  );
}

export default App;
