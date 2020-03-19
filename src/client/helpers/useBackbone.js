// TODO(jeff): This file is a copy of https://glitch.com/edit/#!/use-backbone.
// Import this logic from npm once it has been published there.
import { useEffect } from 'react';
import useForceUpdate from 'use-force-update';

// TODO: Let the user customize the events observed, for instance to restrict updates
// to certain attributes changing, or to update on custom events.
export function useModel(model) {
  const update = useForceUpdate();
  useEffect(() => {
    // We only need to observe `change` because Backbone will fire `change` events
    // if syncs result in changes.
    model.on('change', update);
    return () => model.off('change', update);
  }, [model, update]);

  // Give the client easy access to the model's attributes.
  return { ...model.attributes };
}

// TODO: Let the user customize the events observed, for instance to update on custom events.
export function useCollection(collection) {
  const update = useForceUpdate();
  useEffect(() => {
    // `reset` silences `update`, otherwise the latter covers adds/removes.
    // syncs will fire those events, so we don't need to observe that.
    // We also proxy change events from the collection items so that clients don't
    // have to observe them directly.
    collection.on('update reset sort change', update);
    return () => collection.off('update reset sort change', update);
  }, [collection, update]);

  // Backbone proxies to Underscore.js to provide Array-like functions
  // on the collection, so it's convenient for the client to use the collection
  // directly (contrast `useModel`'s return value).
  return collection;
}
