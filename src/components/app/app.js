import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharPage, BookPage, HousePage, BookItem } from '../pages';
import GotService from "../../services/gotService";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';

export default class App extends Component {

  gotService = new GotService();

  state = {
    showRandomChar: true,
    error: false
  }

  componentDidCatch() {
    this.setState({ error: true })
  }

  toggleRandomChar = () => {
    this.setState(state => {
      return {
        showRandomChar: !state.showRandomChar
      }
    })
  }

  render() {
    if (this.state.error) return <ErrorMessage />;

    const char = this.state.showRandomChar ? <RandomChar /> : null;

    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                <button className="toggle-btn" onClick={this.toggleRandomChar}>Вкл/выкл RandomChar</button>
                {char}
              </Col>
            </Row>

            <Route path="/characters" component={CharPage} />
            <Route path="/houses" component={HousePage} />
            <Route path="/books" exact component={BookPage} />
            <Route path="/books/:id" render={
              ({match}) => {
                const {id} = match.params;
                return<BookItem bookId={id} />
              }
            } />
            
          </Container>
        </div>
      </Router>
    );
  }
}
