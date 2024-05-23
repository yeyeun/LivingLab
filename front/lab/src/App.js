import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import root from "./router/root";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>5/23 오후 3시 2조 git 연습</p>
        <p>update, pull 완료(정운)</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;