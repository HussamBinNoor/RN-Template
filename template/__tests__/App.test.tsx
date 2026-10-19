/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders the app without crashing', () => {
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });
  expect(renderer).toBeDefined();
  // toJSON() returns the serialized element tree (single node or array).
  const root = renderer!.toJSON();
  expect(root).not.toBeNull();
  // Unmount to flush BottomTabView's deferred state updates before Jest tears down.
  ReactTestRenderer.act(() => {
    renderer!.unmount();
  });
});
