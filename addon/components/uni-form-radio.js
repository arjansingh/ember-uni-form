import Ember from 'ember';
import layout from '../templates/uni-form-radio';
import HasFieldStatus from '../mixins/has-field-status';

// {{ uni-form-radio value='spam' property='dish' label='Spam' }}
// {{#uni-form-radio value='eggs' groupValue=form.model.dish }} Eggs {{/uni-form-radio}}

export default Ember.Component.extend(
  HasFieldStatus,
{

  tagName: 'label',
  classNames: [ 'uni-form-radio' ],
  classNameBindings: [ 'checked' ],
  layout: layout,

  groupValue: Ember.computed.alias('field.value'),
  name: Ember.computed.reads('property'),

  change: function () {
    this.set('groupValue', this.get('value'));
  },

  checked: function () {
    return this.get('value') === this.get('groupValue');
  }.property('value', 'groupValue'),

});
