Router.map(function() {
    this.route('postPage', {
        path: '/posts/:_id',
        data: function() { return Posts.findOne(this.params._id); }
    });
    
    this.route('postSubmit',{
        path:'/submit'
    });
});

var requireLogin = function() {
    if(! Meteor.user()) {
        if(Meteor.loggingIn())
            this.next();
        else
            this.render('accessDenied');
        
        this.stop();
    }
}

Router.before(requireLogin, {only:'postSubmit'});