import { graphql } from '@keystone-6/core';
import { SCHEMA_EXTENSIONS } from './extensions';

export default graphql.extend(base => (SCHEMA_EXTENSIONS as any).map((item: any) => item(base)));
