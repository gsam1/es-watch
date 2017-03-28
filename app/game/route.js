import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('game');
  /*  let results = [];
   return Ember.$.ajax({
           url: "http://localhost:8080/api/feeds/",
           type: "GET",
           crossDomain: true,
           dataType: "json",
           success: function (response) {
               var resp = JSON.parse(response);
               results.push(resp);
               console.log(resp);
               return results;
           },
           error: function (xhr, status) {
               console.log("error: ",status);
               console.log("error: ",xhr);
           }
       });*/
  }
});
