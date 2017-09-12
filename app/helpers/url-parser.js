import Ember from 'ember';

export function urlParser(params/*, hash*/) {
  const url = params[0];
  const urlToReplaceWith = 'https://www.youtube.com/embed';
  const urlToReplace = 'https://www.youtube.com/watch?v=';
  
  if(url.startsWith('https://www.youtube.com/')) {
    let result = url.substring(urlToReplace.length, url.length).trim();
    console.log(`${urlToReplaceWith}${result}`);
    return `${urlToReplaceWith}/${result}`;
  } else {
    return url;
  }
}

export default Ember.Helper.helper(urlParser);
