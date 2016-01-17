if (Meteor.isClient) {

Template.logout.events({
    'change .fileInput': function(event, template) {
      event.preventDefault();
      console.log("Hello");
      var file = document.getElementById("fileup").files[0];
 Papa.parse(file, {
  complete: function(results) {
    console.log("Finished:", results.data);
  }
});
     


}
});
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
