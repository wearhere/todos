import { PublicationModel } from 'backbone-publication';

const TodoModel = PublicationModel.extend({
  urlRoot: '/api/todos',

  defaults: {
    _id: null,
    userId: null,
    title: null,
    completedAt: null,
  },

  complete() {
    // TODO(jeff): Error handling.
    this.save('completedAt', Date.now(), { patch: true });
  },
});

export default TodoModel;
