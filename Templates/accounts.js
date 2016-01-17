if (Meteor.isClient) {
    Template.register.events({
        'submit #register': function(e, t) {
            e.preventDefault();
            var email = t.find('#email1').value;
            var password = t.find('#password1').value;
            var first = t.find('#first1').value;
            var last = t.find('#last1').value;
            var user = t.find('#user1').value;

            Meteor.setTimeout(function() {
                Meteor.call('createuser', email, password, first, last, user);
            }, 1000)
        }

    });

    Template.logout.events({
        'submit #logout': function(e, t) {
            e.preventDefault();
            Meteor.logout(function(error) {
                if (error) {
                    alert("unable to logout");
                }
            })
        }

    })

    Template.login.events({
        'submit #login': function(e, t) {
            e.preventDefault();
            var username = t.find('#username').value;
            var password = t.find('#password').value;
            Meteor.loginWithPassword(username, password, function(error) {
                if (error) {
                    alert("Username or password is not Correct!");
                }

            })
        }

    })

    Template.register.created = function() {
        if (Accounts._verifyEmailToken) {
            Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
                if (err != null) {
                    if (err.message = 'Verify email link expired [403]') {
                        console.log('Sorry this verification link has expired.')
                    }
                } else {
                    console.log('Thank you! Your email address has been confirmed.')
                }
            });
        }
    };
}


if (Meteor.isServer) {

    Accounts.validateLoginAttempt(function(attempt) {
        if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) {
            console.log('Email not verified');

            return false; // the login is aborted
        }
        return true;
    });
    Meteor.startup(function() {
        Meteor.methods({

            createuser: function(email, password, first, last, user) {
                var username = user;
                var email1 = email;
                var password1 = password;
                var first1 = first;
                var last1 = last;

                Accounts.createUser({
                    username: user,
                    email: email1,
                    password: password1,
                    profile: {
                        first: first1,
                        last: last1
                    }



                });



            },
        });
        Accounts.emailTemplates.from = 'Wat Emails <no-reply@gentlenode.com>';
        Accounts.emailTemplates.siteName = 'Wat Evites';

        // A Function that takes a user object and returns a String for the subject line of the email.
        Accounts.emailTemplates.verifyEmail.subject = function(user) {
            return 'Confirm Your Email Address';
        };
        Accounts.emailTemplates.verifyEmail.text = function(user, url) {
            return 'click on the following link to verify your email address: ' + url;
        };

        Accounts.onCreateUser(function(options, user) {
            user.profile = {};

            // we wait for Meteor to create the user before sending an email
            Meteor.setTimeout(function() {
                Accounts.sendVerificationEmail(user._id);
            }, 2 * 1000);

            return user;
        });
        // A Function that takes a user object and a url, and returns the body text for the email.
        // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html


    });
}