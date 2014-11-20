// Calls this.scroll on scroll events
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//
App.RespondsToScroll = Ember.Mixin.create({

  didInsertElement: function () {
    this._super.apply(this, arguments);
    Ember.assert('RespondsToScroll must be mixed in to a View/Component', this instanceof Ember.View || this instanceof Ember.Component);
    this.scrollHandler = this.debouncedScroll.bind(this);
    $(window).on('scroll', this.scrollHandler);
  },

  willDestroyElement: function () {
    this._super.apply(this, arguments);
    $(window).off('scroll', this.scrollHandler);
  },

  debouncedScroll: function () {
    var self = this;
    window.requestAnimationFrame(function () {
      self.trigger('scroll');
    });
  }
});
