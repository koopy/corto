import Ember from 'ember';
import TableCell from'ember-cli-ember-table/views/table-cell';
export default
TableCell.extend({
  templateName: "checkbox-header",
  click: function (event) {
    event.stopPropagation();
  },

  isSelected: Ember.computed('controller._selection.[]', 'controller.bodyContent.length', function (key, val) {
    var bodyContent = Ember.get(this, 'controller.bodyContent');
    var len = bodyContent.get('length');
    if (len == 0) {
      return false;
    }
    if (arguments.length > 1) {
      bodyContent.setEach('isSelected', val);
      return true;
    } else {
      return bodyContent.isEvery('isSelected', true);
    }
  })
});
