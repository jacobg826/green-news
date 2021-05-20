const url =
  "https://newsapi.org/v2/everything?q=environment&apiKey=46d9493a71c34d85b0cd778230bcf52c";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}