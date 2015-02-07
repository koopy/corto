/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';
import PagedArray from '../../mixins/paged-array';
import <%=upperModelName%> from '../../models/<%=dashModelName%>';

export default
Ember.ArrayController.extend(PagedArray(<%=upperModelName%>),{
  actions:{
    create:function(){
      this.transitionToRoute('<%=pluralmodelname%>.create');
    },
    edit:function(model){
      this.transitionToRoute('<%=modelName%>',model).then(function(route){
        route.transitionTo('<%=modelName%>.edit');
      });
    }
  }
});
