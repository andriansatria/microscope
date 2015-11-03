Router.map(function() {
    this.route('postPage', {
        path: '/posts/:_id',
        data: function() { return Posts.findOne(this.params._id); }
    });
    
    this.route('postSubmit',{
        path:'/submit'
    });
});