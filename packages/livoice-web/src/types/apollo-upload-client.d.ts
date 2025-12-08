declare module 'apollo-upload-client' {
  import type { ApolloLink } from '@apollo/client/core';
  import type { HttpOptions } from '@apollo/client/link/http';

  export type UploadLinkOptions = HttpOptions & {
    FormData?: typeof FormData;
    isExtractableFile?: (value: unknown) => boolean;
  };

  export function createUploadLink(options?: UploadLinkOptions): ApolloLink;
}
