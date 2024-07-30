import { useState } from 'react';
import { rust_test_backend } from '../../declarations/rust_test_backend';

import main from "/main.svg";
import Image from "next/image";
import Header from "../components/Header";
import Overview from "../components/Overview";
import About from '../app/page';

function HomePage() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    rust_test_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }
  return (
    <>
    <About />
      <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
      
    </>
  );
}

export default HomePage;


