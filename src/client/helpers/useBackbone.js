import { useRef } from 'react';
import useForceUpdate from 'use-force-update';

// TODO(jeff): Replace with the tested version from https://glitch.com/edit/#!/use-backbone
// once Glitch comes back up.
export function useCollection(collection) {
  const forceUpdate = useForceUpdate();

  const collectionRef = useRef(null);
  const previousCollection = collectionRef.current;
  if (!previousCollection || (previousCollection !== collection)) {
    if (previousCollection) previousCollection.off('update change', forceUpdate);
    collection.on('update change', forceUpdate);
    collectionRef.current = collection;
  }

  return collection;
}

export function useModel(model) {
  const forceUpdate = useForceUpdate();

  const modelRef = useRef(null);
  const previousModel = modelRef.current;
  if (!previousModel || (previousModel !== model)) {
    if (previousModel) previousModel.off('change', forceUpdate);
    model.on('change', forceUpdate);
    modelRef.current = model;
  }

  return { ...model.attributes, model };
}
