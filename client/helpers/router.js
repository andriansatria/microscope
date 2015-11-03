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
            this.render(this.loadingTemplate);
        else
            this.render('accessDenied');
        
        this.stop();
    } else {
        this.next(); //add this on before action
    }
}

Router.before(requireLogin, {only:'postSubmit'});