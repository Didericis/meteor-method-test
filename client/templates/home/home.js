Template.home.onCreated(() => {
    const template = Template.instance();
    console.log('===Home created===');

    App.method1.call({
        message: 'Hi'
    });
    
    template.autorun(() => {
        if (Meteor.user()) {
            console.log('Subscribing to testCollection as user', Meteor.userId());
            Meteor.subscribe('testCollection', 'test');
        } else {
            console.log('No User');
        }
    });
});

Template.home.events({
    'click #run-method': function(){
        result = App.method1.call({
            message: 'Hi'
        });        
    }
})