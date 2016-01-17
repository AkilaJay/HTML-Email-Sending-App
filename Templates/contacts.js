var datta;
var datta1;
var importdata = null;
var newValueFromInput = null;
var person;
var res = new Array();
var num = 1;
var ids = new Array();
var fields = new Array();
var count = 0;
var countfna = 0;
var countlna = 0;
var countema = 0;
var importfirstna;
var importlastna;
var name;
var emails;
var firstname;
var lastname;
var all;

if (Meteor.isClient) {
    Session.setDefault("addcontact", true);
    Session.setDefault("editcontact", false);
    Session.setDefault("addcon", false);
    Session.setDefault("newcontact", true);
    Meteor.subscribe('namecontacts', this.userId);


    Template.contacts.contactss = function() {

            return Contacts.find();
        },

        Template.contacts.events({

            'submit #contactcreate': function(e, t) {
                e.preventDefault();
                name = t.find('#name').value;
                emails = t.find('#texta').value;
                firstname = t.find('#firstn').value;
                lastname = t.find('#lastn').value;

                all = Meteor.userId();



                console.log(name);
                console.log(emails);
                Meteor.setTimeout(function() {
                    Meteor.call('createcontact', name, emails, firstname, lastname, all);
                }, 100)
                Session.set("addcon", false);
                Session.set("addcontact", true);
                Session.set("newcontact", true);


            },

            'submit #editemaillist': function(e, t) {
                e.preventDefault();
                var list = this.emails;
                Session.set("Import", list);
                console.log(list);
                Session.set("addcontact", true);
                Session.set("addcontact", true);
                Session.set("addcon", false);


            },

            'submit #contactedit': function(e, t) {
                e.preventDefault();



            },




            'click #editName': function() {

                Session.set("addcon", true);
                Session.set("addcontact", false);
                Session.set("newcontact", false);

            },

            'change .fileInput': function(event, template) {
                event.preventDefault();
                console.log("Hello");
                var file = document.getElementById("fileup").files[0];
                Papa.parse(file, {
                    complete: function(results) {
                        datta = results.data;
                        person = prompt("Please enter the feild names you want to enter as listed in the CSV file separated by ;'s' ", "Ex: first name, email, last name");
                        res = person.split(';');
                        for (var b = 0; b < res.length; b++) {
                            // console.log(res[b]);
                            // console.log("hello");
                        }
                    },



                });

                Meteor.setTimeout(function() {




                    for (var i = 0; i < datta.length; i++) {
                        datta1 = datta[i];

                        if (i == 0) {
                            for (var f = 0; f < res.length; f++) {
                                for (var e = 0; e < datta1.length; e++) {

                                    if (datta1[e] == res[f]) {
                                        ids[count] = e;
                                        console.log(res[f]);
                                        console.log(e);
                                        count++;


                                    }
                                }
                            }
                        }
                        for (var j = 0; j < datta1.length; j++) {

                            if ((i == 0)) {


                            } else if (j == ids[0]) {
                                if (countema == 0) {
                                    importdata = datta1[j];
                                    countema = 1;
                                } else {
                                    importdata = importdata + ";" + datta1[j];
                                }
                            } else if (j == ids[1]) {

                                if (countfna == 0) {
                                    importfirstna = datta1[j];
                                    countfna = 1;
                                } else {
                                    importfirstna = importfirstna + ";" + datta1[j];
                                }
                            } else if (j == ids[2]) {
                                if (countlna == 0) {
                                    importlastna = datta1[j];
                                    countlna = 1;
                                } else {
                                    importlastna = importlastna + ";" + datta1[j];
                                }

                            }
                        }
                    }

                    Session.set("Hellot", importdata);
                    Session.set("firstnames", importfirstna);
                    Session.set("lastnames", importlastna);

                }, 1000);



            }
        });

    Template.contacts.helpers({
        'importcontact': function() {
            return Session.get("Hellot");
        },
        'importcontact1': function() {
            return Session.get("Import");
        },


        'addcontact': function() {
            return Session.get("addcon");
        },

        'Addcontactt': function() {
            return Session.get("addcontact");
        },
        'Addname': function() {
            return Session.get("newcontact");
        },

        'editcontact': function() {
            return Session.get("editcontact");
        },
        'importfirstnames': function() {
            return Session.get("firstnames");

        },

        'importlastnames': function() {
            return Session.get("lastnames");

        }




    });
}



if (Meteor.isServer) {

    Meteor.publish('namecontacts', function(id) {
        var idd = id;
        return Contacts.find({
            id: idd
        });

    });

    Meteor.startup(function() {

        Meteor.methods({

            createcontact: function(name, emails, firstname, lastname, all) {


                Contacts.insert({
                    userid: all,
                    title: name,
                    emails: emails,
                    firstname: firstname,
                    lastname: lastname


                });
            }

            // code to run on server at startup
        });
    });
}