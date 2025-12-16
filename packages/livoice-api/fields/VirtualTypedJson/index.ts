import { virtual } from '@keystone-6/core/fields';
import { type BaseListTypeInfo, type FieldTypeFunc } from '@keystone-6/core/types';

type VirtualArgs<ListTypeInfo extends BaseListTypeInfo> = Parameters<typeof virtual<ListTypeInfo>>[0];

export const virtualTypedJson = <ListTypeInfo extends BaseListTypeInfo>(
  config: VirtualArgs<ListTypeInfo>
): FieldTypeFunc<ListTypeInfo> =>
  virtual({
    ...config,
    ui: {
      ...config.ui,
      views: './fields/VirtualTypedJson/views'
    }
  });
