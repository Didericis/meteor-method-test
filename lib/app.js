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
            console.log(`Internal connection for method 1: ${this.connection}`)
            console.log(`Is client: ${Meteor.isClient}`);
            console.log(`App.method1 userId: ${this.userId}`);
            console.log(`App.method1 userId special: ${App.getUserId(this)}`);
            console.log(`App.method1 input: ${input.message}`);
            console.log('-----------------------------');
            App.method2.run({
                message: input.message + ' -> method2'
            });
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
            console.log(`Is client: ${Meteor.isClient}`);
            console.log(`App.method2 userId: ${this.userId}`);
            console.log(`App.method2 userId special: ${App.getUserId(this)}`);
            console.log(`App.method2 input: ${input.message}`);
            console.log('-----------------------------');
            App.method3.run({
                message: input.message + ' -> method3'
            });
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
            console.log(`Is client: ${Meteor.isClient}`);
            console.log(`App.method3 userId: ${this.userId}`);
            console.log(`App.method3 userId special: ${App.getUserId(this)}`);
            console.log(`App.method3 input: ${input.message}`);
            console.log('-----------------------------');
        }
    }),
    collection: new Mongo.Collection('testCollection'),
    getUserId(context) {
        return context.userId || context.connection.userId();
    }
}

if (Meteor.isServer) {
    Meteor.publish('testCollection', function(param){
        console.log('===Publish===');
        console.log(this.connection);
        console.log('Publish param:', param);
        console.log('Publish user id:', this.userId);
        // App.method1.run('Run from test collection');
        return App.collection.find({});
    }); 
}

FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', {main: 'home'});
    }
});