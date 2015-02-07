/**
 * Created by weiyang on 15-2-7.
 */
/**
 * Created by weiyang on 15-1-19.
 */
import Ember from 'ember';

export default
Ember.ObjectController.extend({
  open:function(){
    console.log('again modal opend');
  }.on('open'),
  actions: {
  }
});