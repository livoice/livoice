import { graphql } from '@keystone-6/core';
import { virtual } from '@keystone-6/core/fields';

// A virtual field that renders only in the Admin UI as a button.
// The resolver returns a placeholder string; all behavior lives in the view component.
export const triggerButton = () =>
  virtual({
    field: graphql.field({
      type: graphql.String,
      resolve: () => 'trigger'
    }),
    ui: {
      views: './fields/TriggerButton/views'
    }
  });




