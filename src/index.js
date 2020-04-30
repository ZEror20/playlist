import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSongAuthor: '',
      newSongTitle: '',
      songs: {
        test: ['test1', 'test2', 'test3'],
        next_test: ['test4', 'test5', 'test6', 'and so on']
      }
    };
  }

  handleAuthorChange(e) {
    this.setState({newSongAuthor: e.target.value});
  }

  handleTitleChange(e) {
    this.setState({newSongTitle: e.target.value});
  }

  addSong(e) {
    e.preventDefault();

    let songs = this.state.songs;
    let author = this.state.newSongAuthor, title = this.state.newSongTitle;

    author = author.toLowerCase();
    author = author.split(' ').join('_');

    if (!songs[author]) {
      songs[author] = [];
    }
    songs[author].push(title);

    this.setState({songs: songs});
  }

  updateSong(author, title) {
    let songs = this.state.songs;
    if (songs[author]) {

    }
  }

  deleteSong(author, titleIndex) {
    let songs = this.state.songs;

    if (songs[author]) {
      delete songs[author][titleIndex]
      this.setState({songs: songs});
    }
  }
  
  render() {
    const songs = this.state.songs;
    let authors = [];

    for (let [author, titles] of Object.entries(songs)) {
      let titless = [];
      titles.forEach((title, index) => {
        titless.push((
          <li key={author + '_' + index}>
            {title} 
             <span className="remove-song" onClick={() => this.deleteSong(author, index)}>remove</span>
            </li>
        ));
      });

      authors.push((
        <li key={author}>
          {author}
          <br />
          <ol>{titless}</ol>
        </li>
      ));
    }

    return (
      <div>
        <form className="add-song-form" onSubmit={e => this.addSong(e)}>
          <p>Author:</p>
          <input type="text" name="author" onChange={e => this.handleAuthorChange(e)} />
          <p>Title:</p>
          <input type="text" name="title" onChange={e => this.handleTitleChange(e)} />
          <br />
          <input type="submit" value="Add New Song" />
        </form>
        <br />  
        <ul>
          {authors}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Song />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
