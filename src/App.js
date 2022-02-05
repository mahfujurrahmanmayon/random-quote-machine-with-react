import React, { Component } from 'react';

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


export default class App extends Component {
  state = {
    quotes: [],
    index: 0
  };

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            quotes: res.quotes
          },
          this.getRandomIndex
        );
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      });
    }
  };

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet`;

    return (
      <div className="test d-flex align-items-center justify-content-center vh-100">
        <div className="col-6 box p-4 rounded">
          {quote && (
            <div className="mb-4">
              <p id="text">
                <i className="fa fa-quote-left"></i>
                {quote.quote}
              </p>
              <cite className="d-block text-right" id="author">
                -{quote.author}
              </cite>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <a className="btn btn-primary" target="_blank" href={tweetURL} rel="noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <button
              className="btn btn-sm btn-primary"
              id="new-quote"
              onClick={this.getRandomIndex}
            >
              <i className="fas btn-sm fa-random"></i> Get Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

