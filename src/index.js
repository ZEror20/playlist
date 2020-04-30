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
      updateSongAuthor: '',
      newSongTitle: '',
      updateSongTitle: '',
      
      songs: {
        'Three Days Grace': ['Animal I Have Become', 'Fallen Angel', 'Never Too Later', 'I Hate Everything About You'],
        'Sunset': ['It Has Begun', 'My Demons'],
        'Thousand Foot Krutch': ['Courtesy Call', 'Take It Out on Me', 'War of Change', 'Be Somebody']
      }
    };
  }

  handleAddAuthorChange(e) {
    this.setState({newSongAuthor: e.target.value});
  }

  handleUpdateAuthorChange(e) {
    this.setState({updateSongAuthor: e.target.value});
  }

  handleAddTitleChange(e) {
    this.setState({newSongTitle: e.target.value});
  }

  handleUpdateTitleChange(e) {
    this.setState({updateSongTitle: e.target.value});
  }

  addSong(e) {
    e.preventDefault();

    let songs = this.state.songs;
    let author = this.state.newSongAuthor, title = this.state.newSongTitle;

    if (!songs[author]) {
      songs[author] = [];
    }
    songs[author].push(title);

    this.setState({songs: songs});
  }

  updateSong(e, author, index) {
    e.preventDefault();

    let updateAuthor = this.state.updateSongAuthor, updateTitle = this.state.updateSongTitle;

    let songs = this.state.songs;
    if (songs[author]) {
      songs[author][index] = updateTitle;
      this.setState({songs: songs});
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
            <div className="song-actions">
              <span className="remove-song" onClick={() => this.deleteSong(author, index)}>remove&nbsp;</span>
              <div className="update-song">
                <label htmlFor={author + index}>update</label>
                <input type="radio" name="update_song" id={author + index} />
                <div className="update-song-container">
                  <form className="update-song-form" onSubmit={e => this.updateSong(e, author, index)}>
                    <p>New Title:</p>
                    <input type="text" name="update_title" onChange={e => this.handleUpdateTitleChange(e)} />
                    <br />
                    <input type="submit" value="Update Song" />
                  </form>
                </div>
              </div>
            </div><br />
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
          <input type="text" name="author" onChange={e => this.handleAddAuthorChange(e)} />
          <p>Title:</p>
          <input type="text" name="title" onChange={e => this.handleAddTitleChange(e)} />
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
