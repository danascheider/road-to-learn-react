import React, { Component } from 'react';
import { Search, Table, Button } from './functionalComponents'
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP   = '100';
const PATH_BASE     = 'https://github.com/cheeaun/node-hnapi';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query=';
const PARAM_PAGE    = 'page=';
const PARAM_HPP     = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      results: null,
      searchKey: '', 
      searchTerm: DEFAULT_QUERY, 
    };

    this.setSearchTopStories   = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss             = this.onDismiss.bind(this);
    this.onSearchChange        = this.onSearchChange.bind(this);
    this.onSearchSubmit        = this.onSearchSubmit.bind(this);
  }

  onDismiss(id) {
    const isNotID     = item => item.objectID !== id;
    
    const updatedHits = this.state.result.hits.filter(isNotID);

    this.setState({ result: { ...this.state.result, hits: updatedHits} });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);

    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [ ...oldHits, ...hits ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page } 
      }
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}\
      ${page}&${PARAM_HPP}${DEFAULT_HPP}`,
      { 
        headers: headers
      })
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentWillMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table
          list={list}
          onDismiss={this.onDismiss}
        />
        <div className='interactions'>
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
