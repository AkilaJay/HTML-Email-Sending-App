var emails;
var firstnames;
var lastnames;
var from;
var subject;
var txt;
var newmaillist;
var newfirst;
var newlast;
var thename;
var htmlarray;
var fields;
var newfields;
var p;
var mergemail;
var txt1;
var txt11 = new Array();


if (Meteor.isClient) {
    Session.setDefault("contactsend1", true);
    Session.setDefault("sendcon", "hello");
    Meteor.subscribe('namecontacts', this.userId);

    Template.send.contactss = function() {

            return Contacts.find();
        },

        Template.send.events({
            'submit #send': function(e, t) {
                e.preventDefault();
                emails = this.emails;
                firstnames = this.firstname;
                lastnames = this.lastname;
                // console.log(emails);
                // console.log(firstnames);
                // console.log(lastnames);
                Session.set("contactsend1", false);
                Session.set("sendcon", emails);


            },
            'submit #sendema': function(e, t) {
                e.preventDefault();
                from = t.find('#from').value;
                subject = t.find('#subject').value;
                txt = t.find('#htmldata').value;
                newmaillist = emails.split(';');
                newfirst = firstnames.split(';');
                newlast = lastnames.split(';');

                p = 1;




                for (var s = 0; s < newmaillist.length; s++) {
                    htmlarray = txt.split("[*]");

                    console.log(htmlarray.length);

                    while (p < htmlarray.length) {

                        fields = htmlarray[p].split(" ");
                        console.log(htmlarray[p]);
                        for (var c = 0; c < fields.length; c++) {
                            if (fields[c] == "FirstName") {
                                fields[c] = newfirst[s];
                            } else if (fields[c] == "LastName") {
                                fields[c] = newlast[s];
                            }

                        }
                        for (var k = 0; k < fields.length; k++) {

                            if (k == 0) {
                                htmlarray[p] = fields[k];
                            } else {
                                htmlarray[p] = htmlarray[p] + " " + fields[k];
                            }

                        }




                        p = p + 2;
                    }

                    for (var f = 0; f < htmlarray.length; f++) {

                        if (f == 0) {
                            txt1 = htmlarray[f];
                        } else {
                            txt1 = txt1 + htmlarray[f];
                        }

                    }
                    txt11[s] = txt1;
                    p = 1;
                   


                }


                Meteor.setTimeout(function() {
                    Meteor.call('sendmail2', txt11, newmaillist, newfirst, newlast, from, subject, txt);
                }, 300)

            },

        });


    Template.send.helpers({
        'contactsend': function() {
            return Session.get("contactsend1");
        },
        'sendcon': function() {
            return Session.get("sendcon");
        }

    });

}

if (Meteor.isServer) {



    Meteor.startup(function() {

        Meteor.methods({

            sendmail2: function(txt11, newmaillist, newfirst, newlast, from, subject, txt) {


                for (var b = 0; b < newmaillist.length; b++) {
                    Email.send({
                        from: from,
                        to: newmaillist[b],
                        subject: subject,
                        html: txt11[b]
                    });
                }

            }


        });

    });

}