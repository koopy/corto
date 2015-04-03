/**
 * Created by weiyang on 15-1-19.
 */
import Ember from 'ember';

var Promise = Ember.RSVP.Promise;
export default
Ember.ObjectController.extend({
  actions: {
    refresh:function(){
      console.log('refresh');
    },
    deleteRecord: function () {
      var record = this.get('model');
      var promises = [];
      if (Ember.isArray(record)) {
        record.forEach(function (r) {
          r.deleteRecord();
          promises.push(r.save());
        });
      } else {
        record.deleteRecord();
        promises.push(record.save());
      }
      return Promise.all(promises).then(function () {
          //TODO something
        }.bind(this)).catch(function () {
          //TODO what to do when catch the exception
        }).finally(function () {
          this.send('closeModal');
        }.bind(this));
    }
  }
});
