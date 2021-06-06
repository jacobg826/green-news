import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { getNews } from './news';
import Article from './components/Article';
import About from './components/about';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import './App.css';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { news: [], refreshing: true, pageNum: 1, loadedMore: false, query: "" };
    this.fetchNews = this.fetchNews.bind(this);

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchNews(1);
  }

  fetchNews() {
    var currentNews = this.state.news;
    getNews(this.state.pageNum, this.state.query)
      .then(articles => this.setState({ news: articles, refreshing: false, loadedMore: false}))
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

  handleSearch() { 
    this.setState(
      {refreshing: true},
      () => this.fetchNews()
    );
  };

  handleChangeSearch(event) {
    this.setState({query: event.target.value});
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
    // <View style={{flex:1, height: window.innerHeight, overflow: 'hidden'}}> 
    // add that above the flatlist for infinite scroll
    return (
      <Router>
        <Navbar/>
        <switch>
          <Route exact path="/">
            <div className="search-container">
              <input value={this.state.query} onChange={this.handleChangeSearch} type="text" id="searchbar" placeholder="Search news..." name="s" className="search"></input>
              <button className="search-button" onClick={this.handleSearch}><SearchIcon/></button>
            </div>
            <div className="container">
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
                  //onEndReached={this._handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //onMomentumScrollBegin = { () => {this.setState({loadedMore: false})}}
                />
            </div>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/profile">
            <p>Text</p>
          </Route>
        </switch>
      </Router>
    );
  }
}

export default App;
