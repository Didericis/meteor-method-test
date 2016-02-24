App = {
    method1: new ValidatedMethod({
        name: 'App.method1',
        validate: new SimpleSchema({
            message: {
                type: String,
                label: 'Input'
            }
        }).validator(),
        run(input) {
            let permitted = false;
            console.log('----------------------');
            console.log('Running App.method1...');
            if (Meteor.isClient) {
                const userId = Meteor.userId();
                console.log(`App.method1 userId: ${userId}`);
                if (!userId) {
                    throw new Meteor.Error(`Insufficient Permissions`);
                } else {
                    permitted = true;
                }            
            } else if (Meteor.isServer) {
              permitted = true;  
            }

            if (permitted) {
                console.log(`App.method1 input: ${input.message}`);
                App.method2.run({
                    message: input.message + ' -> method2'
                });
            } else {
                console.log(`App.method1 not permiited to run (no errors)`);
            }
            console.log('----------------------');
        }
    }),
    method2: new ValidatedMethod({
        name: 'App.method2',
        validate: new SimpleSchema({
            message: {
                type: String,
                label: 'Input'
            }
        }).validator(),
        run(input) {
            let permitted = false;

            console.log('----------------------');
            console.log('Running App.method2...');
            if (Meteor.isClient) {
                const userId = Meteor.userId();
                console.log(`App.method2 userId: ${userId}`);
                if (!userId) {
                    throw new Meteor.Error(`Insufficient Permissions`);
                } else {
                    permitted = true;
                }            
            } else if (Meteor.isServer) {
              permitted = true;  
            }

            if (permitted) {
                console.log(`App.method2 input: ${input.message}`);
                App.method3.run({
                    message: input.message + ' -> method2'
                });
            } else {
                console.log(`App.method2 not permiited to run (no errors)`);
            }
            console.log('----------------------');
        }
    }),
    method3: new ValidatedMethod({
        name: 'App.method3',
        validate: new SimpleSchema({
            message: {
                type: String,
                label: 'Input'
            }
        }).validator(),
        run(input) {
            let permitted = false;

            console.log('----------------------');
            console.log('Running App.method3...');
            if (Meteor.isClient) {
                const userId = Meteor.userId();
                console.log(`App.method3 userId: ${userId}`);
                if (!userId) {
                    throw new Meteor.Error(`Insufficient Permissions`);
                } else {
                    permitted = true;
                }            
            } else if (Meteor.isServer) {
              permitted = true;  
            }

            if (permitted) {
                console.log(`App.method3 input: ${input.message}`);
            } else {
                console.log(`App.method3 not permiited to run (no errors)`);
            }
            console.log('----------------------');
        }
    }),
    collection: new Mongo.Collection('testCollection')
}

if (Meteor.isServer) {
    Meteor.publish('testCollection', function(param){
        console.log('===Publish===');
        console.log('Publish param:', param);
        console.log('Publish user id:', this.userId);
        App.method1.run({message: 'Run from test collection'});
        return App.collection.find({});
    }); 
}

FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', {main: 'home'});
    }
});