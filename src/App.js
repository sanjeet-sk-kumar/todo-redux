import React from 'react'
import styledComponents from 'styled-components'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'
const Container = styledComponents.div`
background: #fff;
min-width: 800px;
position: relative;
display: flex;
text-align: left;
flex-direction: column;
box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);

`

function App() {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>ToDo App</h1>

          <div className="navContent">
            <div className="navLinks"></div>
          </div>
        </section>
      </nav>
      <section>
        <Container>
          <Header />
          <TodoList />
          <Footer />
        </Container>
      </section>
    </div>
  )
}

export default App
