import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { getNews } from './news';
import Article from './components/Article';
import Navbar from './components/Navbar';
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
    this.state = { articles: [], refreshing: true, pageNum: 1 };
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews(1);
  }

  fetchNews() {
    getNews(this.state.pageNum)
      .then(articles => this.setState({ articles, refreshing: false}))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      { refreshing: true },
      () => this.fetchNews()
    );
  }

  _handleLoadMore = () => {
    if (this.state.refreshing){
      return null;
    }
    this.setState(
      (prevState) => {
        return { refreshing: true, pageNum: prevState.pageNum + 1};
      },
      () => {
        this.fetchNews();
      }
    );
  };

  renderFooter = () => {
    if (this.state.refreshing) {
      return <ActivityIndicator size="large" />;
    } else {
      return null;
    }
  };

  render () {
    var col = Math.floor(window.innerWidth / 440);
    return (
      <Router>
        <Navbar/>
        <div className="container">
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => <Article article={item} />}
          keyExtractor={item => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
          numColumns={col}
          key={col}
          contentContainerStyle={{ alignItems: "center" }}
          ListFooterComponent={this.renderFooter}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.1}
        />
        </div>
      </Router>
    );
  }
}

export default App;
