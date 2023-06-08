
import { useEffect, useState } from 'react';
import './App.css';
import { useRef } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('flash');

  const customValue = '/bakely.com'
  const [data, setData] = useState('hello')
  const [info, setInfo] = useState([])

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();

    console.log(data.slip)
    setData(data.slip.advice)
    return data
  }



  
  // const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${inputValue && inputValue}?exact=false&titleType=movie`;
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b6c81705b2msh6dba127d0f600f5p18c3f6jsn68cd5abde8d2',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

  useEffect(()=>{
  async function dataInfo () {
    try{
      const res = await fetch(url, options)
      const result = await res.text()
      const info = JSON.parse(result)
      const red = info.results
      setInfo(red)
      console.log(red)

    } catch(error) {
      console.error(error);
    }
  }

  return dataInfo

}, [inputValue])

const addText = () => {
    const hello = 'hello world'

    console.log(hello)
}


  const inputRef = useRef(null);

  const handleInputFocus = () => {
    setInputValue('Your data goes here');
    inputRef.current.selectionStart = 0;
    // inputRef.current.selectionEnd = 0;
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
  const restrictedCharsRegex = /[/!@#$%^&*.1234567890]/g; // Example regex for restricted characters

  if (!restrictedCharsRegex.test(value)) {
    setInputValue(value);
  }
}

console.log(inputValue + customValue)

    return (
      <div className="App">
          <p>{data}</p>
          {
            info.length > 1 ? info?.map((data, index) => 
              {
                return  <h3 key={index}>{data.titleText.text}</h3>
              }
            ) : <h1>not found</h1>

          
          }
          <button onClick={getAdvice}>Generate qoute</button>
          <input onFocus={addText}/>

          <input
        type="text"
        value={inputValue}
        onFocus={handleInputFocus}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
      />

    <div style={{border: '1px solid rgba(0,0,0,0.12)', width: 'fit-content', margin: '0 auto'}}>
          <input value={inputValue} onChange={handleInputChange} style={{color: 'red', border: 0, background: 'transparent', outline: 'none'}} type='text'/>
          <input style={{border: 0, background: 'transparent', outline: 'none', width: '80px'}} value={customValue} disabled/>
      </div>

      </div>
    );
    }

export default App;
