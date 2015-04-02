/**
 * Created by jiangwy on 15-3-21.
 */
import TableCell from'ember-cli-ember-table/views/table-cell';

export default TableCell.extend({
  templateName:'generator/relation',
  innerSelect:Ember.Select.extend({
    valueBinding: 'parentView.cellContent',
    focusOut:function(){
      this.set('parentView.isEditing',false);
    }
  }),
  isEditing:false,
  click:function(event){
    this.set('isEditing',true);
    event.stopPropagation()
  }
});
