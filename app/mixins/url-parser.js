import Ember from 'ember';

export default Ember.Mixin.create({
  urlParser:function(){
    const url = this.get('game.url');
    debugger;
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
});
