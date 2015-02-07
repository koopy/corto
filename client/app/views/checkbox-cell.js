import TableCell from'ember-cli-ember-table/views/table-cell';
export default
TableCell.extend({
  templateName: "checkbox-cell",
  click: function (event) {
    event.stopPropagation();
  }
});
