import Ember from 'ember';
import SysGroup from 'app/models/sys-group';
import AdvancedQuery from 'app/mixins/advanced-query';

export default Ember.Controller.extend({
  init:function(){
    this._super();

    this.set('advancedQuery', AdvancedQuery.create({
      filters: {
        where: {
          name: {
            like: true
          },
          code: {
            gt: true
          },
          and: [
            {
              status: {
                lt: true
              }
            },
            {
              description: {
                nlike: true
              }
            }
          ],
          or: [
            {
              and: [
                {
                  modifier: {
                    gte: true
                  }
                }
              ]
            },
            {
              creator: true
            }
          ]
        }
      },
      modelConstructor: SysGroup,
      owner: this
    }));
  },
  actions:{
    //TODO
    search: function () {
      this.set('name', 'jwy');
      var self = this;
      setTimeout(function () {
        var advancedQuery = self.get('advancedQuery');
        var filter = advancedQuery.get('query');
        var a = 2;
      }, 1000);
    }
  }
});
