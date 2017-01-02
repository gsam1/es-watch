import Ember from 'ember';

export default Ember.Route.extend({
  model(){
   return Ember.$.ajax({
           url: "http://localhost:8080/api/games/",
           type: "GET",
           crossDomain: true,
           dataType: "json",
           success: function (response) {
               var resp = JSON.parse(response);
               console.log(resp);
               return resp;
           },
           error: function (xhr, status) {
               console.log("error: ",status);
               console.log("error: ",xhr);
           }
       });
  }
});
