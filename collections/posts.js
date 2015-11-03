Posts = new Meteor.Collection('posts');

Posts.allow({
    insert:function(userId, doc) {
        //only allow posting if user log in
        return !! userId;
    }
});