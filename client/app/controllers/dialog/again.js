/**
 * Created by weiyang on 15-2-7.
 */
/**
 * Created by weiyang on 15-1-19.
 */
import Ember from 'ember';

export default
Ember.ObjectController.extend({
  senior:null,
  open:function(senior){
    this.set('senior',senior);
    console.log('again modal opend');
  }.on('open'),
  actions: {
    ensure:function(){
      var senior = this.get('senior');
      senior.send('refresh');
    }
  }
});