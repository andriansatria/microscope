Template.postItem.helpers({
    ownPost: function() {
        return this.userId == Meteor.userId();
    },

    domain: function() {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },

    upvotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    }

});

Template.postItem.rendered = function() {
    // animate post from previous position to new position
    var instance = this;
    var rank = instance.data._rank;
    var $this = $(this.firstNode);
    var postHeight = 80;
    var newPosition = rank * postHeight;
    console.log(rank);
    // if element has a currentPosition (i.e. it's not the first ever render)
    if (typeof(instance.currentPosition) !== 'undefined') {
        var previousPosition = instance.currentPosition;
        // calculate difference between old position and new position and send element there
        var delta = previousPosition - newPosition;
        console.log(delta);
        $this.css("top :", delta + "px");
    } else {
        $this.addClass("invisible")
    }
    // let it draw in the old position, then..
    Meteor.defer(function() {
        instance.currentPosition = newPosition;
         console.log(instance.currentPosition);
        // bring element back to its new original position
        $this.css("top :", "0px").removeClass("invisible");
    });
};

Template.postItem.events({
    'click .upvote': function(e) {
        e.preventDefault();
        Meteor.call('upvote', this._id, function(error) {
            if (error) {
                //display error to the user
                throwError(error.reason);
            }
        });
    }
});