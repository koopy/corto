import Ember from 'ember';

var LinkView = Ember.LinkView;
var get = Ember.get;
export default
LinkView.extend({
  resolvedParams: Ember.computed('router.url', function () {
    var ret = this._super();
    var parameters = this.parameters;
    var options = parameters.options;
    var hash = options.hash;
    var fix = {};
    if (hash.suffix) {
      fix.suffix = hash.suffix;
    }
    return Ember.merge(ret, fix);
  }),
  href: Ember.computed('loadedParams', function computeLinkViewHref() {
    var loadedParams = get(this, 'loadedParams');

    if (!loadedParams) {
      return get(this, 'loadingHref');
    }
    var ret = this._super();

    var result = [];
    result.push(ret);
    if (loadedParams.suffix) {
      result.push(loadedParams.suffix);
    }
    return result.join('/');
  })
});
//TODO transitionTo the suffix route
