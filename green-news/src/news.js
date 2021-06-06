
export async function getNews(page, query) {
  if(query == "") {
  var url =
  `https://newsapi.org/v2/everything?q="climate change"&page=${page}&apiKey=46d9493a71c34d85b0cd778230bcf52c`;
  } else {
    var url =`https://newsapi.org/v2/everything?q="${query}"&page=${page}&apiKey=46d9493a71c34d85b0cd778230bcf52c`;
  }
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}