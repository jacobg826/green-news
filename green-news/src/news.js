
export async function getNews(page, query) {
  // if(query == "") {
  // var url =
  // `https://newsapi.org/v2/everything?q="climate change"&page=${page}&apiKey=46d9493a71c34d85b0cd778230bcf52c`;
  // } else {
  //   var url =`https://newsapi.org/v2/everything?q="${query}"&page=${page}&apiKey=46d9493a71c34d85b0cd778230bcf52c`;
  // }
  if(query == "") {
    var url = 'https://api.currentsapi.services/v1/search?' +
                'domain=cnn.com&keywords=climate change&language=en&type=1&country=us' +
                '&apiKey=rU7nPfYJU2cL1DU3z5UxcvlLBLSK3ZFa5LnVuzkGBEOmTUJZ';
  } else {
    var url = 'https://api.currentsapi.services/v1/search?' +
    `domain=cnn.com&keywords=${query}&language=en&type=1&country=us` +
    '&apiKey=rU7nPfYJU2cL1DU3z5UxcvlLBLSK3ZFa5LnVuzkGBEOmTUJZ';
  }
  let result = await fetch(url).then(response => response.json());
  console.log(result.news);
  return result.news;
}