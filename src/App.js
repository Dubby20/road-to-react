import React, { Component } from 'react';
import Form from './Form';
import Table from './Table';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchWord: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.result.hits.filter(
      item => item.objectID !== id
    );
    this.setState({
      result: updatedList
    });
  }

  onSearchChange(event) {
    this.setState({
      searchWord: event.target.value
    });
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchWord } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchWord}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  render() {
    const { searchWord, result } = this.state;
    if (!result) {
      return null;
    }
    console.log(result);
    return (
      <div className='page'>
        <div className='interactions'>
          <Form value={searchWord} onSearchChange={this.onSearchChange}>
            Search{' '}
          </Form>
        </div>
        <Table
          list={result.hits}
          pattern={searchWord}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       list
//     };

//     this.onDismiss = this.onDismiss.bind(this);
//   }

//   onDismiss(id) {
//     const updatedList = this.state.list.filter(item => item.objectID !== id);
//     this.setState({
//       list: updatedList
//     });
//   }

//   render() {
//     return (
//       <div className='App'>
//         {this.state.list.map(item => {
//           const onHandleDismiss = () => {
//             this.onDismiss(item.objectID);
//           };
//           return (
//             <div key={item.objectID}>
//               <span>
//                 <a href={item.url}>{item.title}</a>
//               </span>
//               <span>{item.author}</span>
//               <span>{item.num_comments}</span>
//               <span>{item.points}</span>
//               <span>
//                 <button onClick={onHandleDismiss} type='button'>
//                   Dismiss
//                 </button>
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

export default App;
