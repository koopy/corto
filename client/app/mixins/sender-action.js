import Ember from 'ember';

export default Ember.Mixin.create({
  asSender: true,
  send: function (actionName) {
    var args = slice.call(arguments, 1);
    var target;

    if (this._actions && this._actions[actionName]) {
      if (this._actions[actionName].apply(this, args) === true) {
        // handler returned true, so this action will bubble
      } else {
        return;
      }
    }

    var concat = slice.call(arguments).concat(this);
    if (target = get(this, 'target')) {
      Ember.assert("The `target` for " + this + " (" + target + ") does not have a `send` method", typeof target.send === 'function');
      target.send.apply(target, concat);
    }
  }
});
