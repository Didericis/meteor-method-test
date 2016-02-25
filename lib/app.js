App = {
    method1: new ValidatedMethod({
        name: 'App.method1',
        mixins: [PermissionsMixin],
        permitRoles: [{
            roles: ['patient'],
            group: Roles.GLOBAL_GROUP,
            permit(input) {
                console.log('permit user id:', this.userId);
                console.log('permit input:', input);
                return false;
            }
        }],
        validate: new SimpleSchema({
            message: {
                type: String,
                label: 'Input'
            }
        }).validator(),
        run(input) {
            console.log('INPUT:', input);
            console.log(`App.method1 input: ${input.message}`);
            console.log('-----------------------------');
            App.method2.runFromMethod.apply(this, [{
                message: input.message + ' -> method2'
            }]);
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
        mixins: [PermissionsMixin],
        permitRoles: [{
            roles: ['patient'],
            group: Roles.GLOBAL_GROUP
        }],
        run(input) {
            console.log(`App.method2 input: ${input.message}`);
            console.log('-----------------------------');
            App.method3.runFromMethod.call(this, {
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
        mixins: [PermissionsMixin],
        permitRoles: [{
            roles: ['crap'],
            group: Roles.GLOBAL_GROUP
        }],
        run(input) {
            console.log(`App.method3 input: ${input.message}`);
            console.log('-----------------------------');
        }
    }),
    collection: new Mongo.Collection('testCollection')
}

if (Meteor.isServer) {
    Meteor.publish('testCollection', function(param){
        console.log('===TRUSTED===');
        console.log('User id:', this.userId);
        App.method1.runTrusted({
            message: 'hey'
        });
        return App.collection.find({});
    }); 
}

FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
        BlazeLayout.render('layout', {main: 'home'});
    }
});