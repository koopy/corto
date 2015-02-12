import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.resource('dashboard',{path:'/'},function(){

    this.resource('personal',function(){

    });
    this.resource('report',function(){

    });
    this.resource('flow',function(){

    });
    this.resource('platform', function() {
      this.resource('platform.sysUsers',{path:'sysUsers'}, function() {
        this.route('create');
        this.resource('platform.sysUsers.sysUser',{path:'/:sysUser_id'},function(){
          this.route("edit");
          this.resource('platform.sysUsers.sysUser.detail',{path:'/'},function(){
            this.route('profile', {path: '/'});
            this.route('roleAllocation');
            this.route('organization');
          });
        });
      });
      this.resource('sysRoles', function() {
        this.route('create');
        this.resource('sysRole',{path:'/:sysRole_id'},function(){
          this.route("edit");
        });
      });
      this.resource('sysGroups', function() {
        this.route('create');
        this.resource('sysGroup',{path:'/:sysGroup_id'},function(){
          this.route("edit");
        });
      });
      this.resource('sysDuties', function() {
        this.route('create');
        this.resource('sysDuty',{path:'/:sysDuty_id'},function(){
          this.route("edit");
        });
      });
    });
  });
});

export default Router;
