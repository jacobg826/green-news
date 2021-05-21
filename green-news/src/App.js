import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
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
    this.state = { news: [], refreshing: true, pageNum: 1, loadedMore: false };
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews(1);
  }

  fetchNews() {
    var currentNews = this.state.news;
    getNews(this.state.pageNum)
      .then(articles => this.setState({ news: currentNews.concat(articles), refreshing: false, loadedMore: false}))
      .catch(() => this.setState({ refreshing: false, loadedMore: false }));
  }

  handleRefresh() {
    this.setState(
      { refreshing: true },
      () => this.fetchNews()
    );
  }

  _handleLoadMore = () => {
    if (this.state.refreshing || this.state.loadedMore){
      return null;
    }
    this.setState(
      (prevState) => {
        return { refreshing: true, pageNum: prevState.pageNum + 1, loadedMore: true}
      },
      () => this.fetchNews()
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
        <input type="text" id="searchbar" placeholder="Search news..." name="s" ></input>
        <div className="container">
          <View style={{flex:1, height: window.innerHeight, overflow: 'hidden'}}>
            <FlatList
              data={this.state.news}
              renderItem={({ item }) => <Article article={item} />}
              keyExtractor={item => item.url}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh.bind(this)}
              numColumns={col}
              key={col}
              contentContainerStyle={{ alignItems: "center" }}
              ListFooterComponent={this.renderFooter}
              onEndReached={this._handleLoadMore}
              onEndReachedThreshold={0.5}
              onMomentumScrollBegin = { () => {this.setState({loadedMore: false})}}
            />
          </View>
        </div>
      </Router>
    );
  }
}

export default App;
