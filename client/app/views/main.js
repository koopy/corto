import Ember from 'ember';

var ace = {
  click_event: 'click'
};
export default Ember.View.extend({
  didInsertElement:function(){
    this._super();
    this.handleSideMenu();
  },
  handleSideMenu:function(){
    var b = navigator.userAgent.match(/OS (5|6|7)(_\d)+ like Mac OS X/i);
    var a = Ember.$;
    var nav = a('.nav-list');
    nav.on(ace.click_event, function (h) {
      var g = a(h.target).closest("a");
      if (!g || g.length == 0) {
        return;
      }
      var b = g.find('b');
      var f = a(g.next().get(0));

      f.stop().slideToggle(200).parent().toggleClass("active");
      if(f.parent().hasClass('active')){
        b.removeClass('fa-caret-up').addClass('fa-caret-down');
      }else{
        b.removeClass('fa-caret-down').addClass('fa-caret-up');
      }
    });
    //slideMenu according to the current route
    nav.find('a.active').
      parents('ul.submenu').
      show();
  },
  willDestroyElement:function(){
    this._super();
    this.unbindEvent();
  },
  unbindEvent:function(){
    Ember.$('.nav-list').off(ace.click_event);
  }
});
