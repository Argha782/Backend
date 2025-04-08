import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";                         //CORS= Cross ORigin Request

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <> 
      <h1>FULL STACK</h1>
      <p>Jokes: {jokes.length}</p>

      {
      jokes.map((joke, index) => (
        <div key={joke.id}>
          <h3>Joke Title: {joke.title}</h3>
          <p>Joke Content: {joke.content}</p>
        </div>
      ))
      }
    </>
  );
}

export default App;
