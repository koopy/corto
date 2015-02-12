import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

var DIALOG = 'dialog';
var get  = Ember.get;
var a_slice = [].slice;
export default
Ember.Route.extend(ApplicationRouteMixin,{
  dialogs: null,
  init:function(){
    this._super();
    this.set('dialogs',Ember.A());
  },
  pathForDialog:function(yieldName){
    return DIALOG + '/' + yieldName;
  },
  actions: {
    httpError: function (e, xhr, options, thrownError) {
      console.log("httpError catch");
    },
    openModal: function (yieldName, modelType) {
      var name = this.pathForDialog(yieldName);
      var controller = this.controllerFor(name);
      //sendEvent controller with open event
      Ember.sendEvent(controller,'open',[modelType]);

      var sender = a_slice.call(arguments, -1)[0];
      if (sender && get('sender', 'asSender') === true){
        controller.set('triggerSource',sender);
      }
      var dialogs = this.get('dialogs');
      dialogs.push({
        dialogName: name,
        into: 'application'
      });
      return this.render(name, {
        into: 'application',
        view: 'modal',
        outlet: 'modal',
        controller: controller
      });

    },
    closeModal: function () {
      var dialogs = this.get('dialogs');
      Ember.assert('Can not close modal without any modal exists', dialogs.length != 0);
      dialogs.pop();
      var lastConfig = dialogs[dialogs.length - 1];
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: dialogs.length == 0 ? 'application' : lastConfig.dialogName
      });

    },
    ensure: function () {
      //default action
      this.send('closeModal');
    },
    subModal: function (yieldName) {
      var name = this.pathForDialog(yieldName);

      var dialogs = this.get('dialogs');
      Ember.assert('Can not open sub modal in the root,it must be opened by parent modal', dialogs.length != 0);
      //get from last one
      var lastConfig = dialogs[dialogs.length - 1];
      var controller = this.controllerFor(name);
      //sendEvent controller with open event
      var lastController = this.controllerFor(lastConfig.dialogName);
      Ember.sendEvent(controller,'open',[lastController]);

      //set current dialog to last one
      dialogs.push({
        dialogName: name,
        into: lastConfig.dialogName
      });

      this.render(name,{
        into: lastConfig.dialogName,
        view: 'modal',
        outlet: 'modal',
        controller: controller
      });
    }
  }
});
