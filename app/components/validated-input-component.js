
App.ValidatedInputComponent = Ember.TextField.extend({

  classNameBindings: [ 'showError:error', 'required' ],
  attributeBindings: [ 'type' ],

  isValid: Ember.computed.empty('errors'),
  isInvalid: Ember.computed.notEmpty('errors'),
  submit: 'submit',
  type: 'text',

  focusOut: function () {
    this.set('showError', this.get('isInvalid'));
  },

  keyUp: function () {
    if (this.get('isValid')) this.set('showError', false);
  },

  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendAction('submit');
    }
  },

  observeErrors: function () {
    if ( !this.get('parentModel') ) return;
    this.get('parentModel').addObserver('errors.' + this.get('name'), this, this.syncErrors);
  }.on('didInsertElement'),

  required: function () {
    if ( !this.get('parentModel') ) return;
    var v = this.get('parentModel.validations');
    return v[this.get('name')] && v[this.get('name')].presence;
  }.property('name', 'parentModel.validations'),

  syncErrors: function () {
    if (!this.get('isDestroyed')) {
      this.set('errors', this.get('parentModel.errors.' + this.get('name')));
    }
  }

});
