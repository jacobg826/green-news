import React from 'react';
import { FlatList } from 'react-native';
import { getNews } from './news';
import Article from './components/Article';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false}))
      .catch(() => this.setState({ refreshing: false}));
  }

  handleRefresh() {
    this.setState(
      { refreshing: true },
      () => this.fetchNews()
    );
  }

  render () {
    return (
      <Router>
      <div>
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => <Article article={item} />}
          keyExtractor={item => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
          numColumns={3}
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}
        />
      </div>
      </Router>
    );
  }
}

export default App;
