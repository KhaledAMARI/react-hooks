// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue, {serialize = JSON.stringify, deserialize = JSON.parse  } = {}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(
    () => {
      let valueFromLocalStrorage = window.localStorage.getItem(key);
      if (valueFromLocalStrorage) {
        return deserialize(valueFromLocalStrorage)
      }
      return defaultValue
    }
  )
    const prevKeyRef = React.useRef(key);
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      localStorage.removeItem(prevKey);
    };
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(name))
  }, [key, name, serialize])

  console.log(name);
  return [name, setName];
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName);
  // const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App;
