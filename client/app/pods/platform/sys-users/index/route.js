/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';
import RouteMixin from '../../../../mixins/auto-route-mixin';

export default
Ember.Route.extend(RouteMixin, {
  queryParams: {
    page: {
      replace: true
    },
    args: {
      replace: true
    }
  },
  actions:{
  }
});
