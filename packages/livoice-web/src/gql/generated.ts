import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<ChatMessage>>;
  messagesCount?: Maybe<Scalars['Int']['output']>;
  org?: Maybe<Organization>;
  project?: Maybe<Project>;
  title?: Maybe<Scalars['String']['output']>;
  transcript?: Maybe<Transcript>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ChatMessagesArgs = {
  cursor?: InputMaybe<ChatMessageWhereUniqueInput>;
  orderBy?: Array<ChatMessageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ChatMessageWhereInput;
};


export type ChatMessagesCountArgs = {
  where?: ChatMessageWhereInput;
};

export type ChatCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  messages?: InputMaybe<ChatMessageRelateToManyForCreateInput>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  project?: InputMaybe<ProjectRelateToOneForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  transcript?: InputMaybe<TranscriptRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ChatHistoryResult = {
  __typename?: 'ChatHistoryResult';
  chatId?: Maybe<Scalars['ID']['output']>;
  messages: Array<ChatMessageResult>;
};

export type ChatManyRelationFilter = {
  every?: InputMaybe<ChatWhereInput>;
  none?: InputMaybe<ChatWhereInput>;
  some?: InputMaybe<ChatWhereInput>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  chat?: Maybe<Chat>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<Scalars['String']['output']>;
  segments?: Maybe<Array<TranscriptSegment>>;
  segmentsCount?: Maybe<Scalars['Int']['output']>;
};


export type ChatMessageSegmentsArgs = {
  cursor?: InputMaybe<TranscriptSegmentWhereUniqueInput>;
  orderBy?: Array<TranscriptSegmentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TranscriptSegmentWhereInput;
};


export type ChatMessageSegmentsCountArgs = {
  where?: TranscriptSegmentWhereInput;
};

export type ChatMessageCreateInput = {
  chat?: InputMaybe<ChatRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  segments?: InputMaybe<TranscriptSegmentRelateToManyForCreateInput>;
};

export type ChatMessageManyRelationFilter = {
  every?: InputMaybe<ChatMessageWhereInput>;
  none?: InputMaybe<ChatMessageWhereInput>;
  some?: InputMaybe<ChatMessageWhereInput>;
};

export type ChatMessageOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type ChatMessageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ChatMessageWhereUniqueInput>>;
  create?: InputMaybe<Array<ChatMessageCreateInput>>;
};

export type ChatMessageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ChatMessageWhereUniqueInput>>;
  create?: InputMaybe<Array<ChatMessageCreateInput>>;
  disconnect?: InputMaybe<Array<ChatMessageWhereUniqueInput>>;
  set?: InputMaybe<Array<ChatMessageWhereUniqueInput>>;
};

export type ChatMessageResult = {
  __typename?: 'ChatMessageResult';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  segments: Array<ChatSegmentReference>;
};

export type ChatMessageUpdateArgs = {
  data: ChatMessageUpdateInput;
  where: ChatMessageWhereUniqueInput;
};

export type ChatMessageUpdateInput = {
  chat?: InputMaybe<ChatRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  segments?: InputMaybe<TranscriptSegmentRelateToManyForUpdateInput>;
};

export type ChatMessageWhereInput = {
  AND?: InputMaybe<Array<ChatMessageWhereInput>>;
  NOT?: InputMaybe<Array<ChatMessageWhereInput>>;
  OR?: InputMaybe<Array<ChatMessageWhereInput>>;
  chat?: InputMaybe<ChatWhereInput>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  role?: InputMaybe<StringFilter>;
  segments?: InputMaybe<TranscriptSegmentManyRelationFilter>;
};

export type ChatMessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ChatMutationResult = {
  __typename?: 'ChatMutationResult';
  answer: Scalars['String']['output'];
  chatId: Scalars['ID']['output'];
  messages: Array<ChatMessageResult>;
  references: Array<ChatSegmentReference>;
};

export type ChatOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ChatProjectInput = {
  chatId?: InputMaybe<Scalars['ID']['input']>;
  message: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
};

export type ChatRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  create?: InputMaybe<Array<ChatCreateInput>>;
};

export type ChatRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  create?: InputMaybe<Array<ChatCreateInput>>;
  disconnect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  set?: InputMaybe<Array<ChatWhereUniqueInput>>;
};

export type ChatRelateToOneForCreateInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  create?: InputMaybe<ChatCreateInput>;
};

export type ChatRelateToOneForUpdateInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  create?: InputMaybe<ChatCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChatSegmentReference = {
  __typename?: 'ChatSegmentReference';
  endMs?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  speaker?: Maybe<Scalars['String']['output']>;
  startMs?: Maybe<Scalars['Int']['output']>;
  text: Scalars['String']['output'];
  transcriptTitle?: Maybe<Scalars['String']['output']>;
};

export type ChatTranscriptInput = {
  chatId?: InputMaybe<Scalars['ID']['input']>;
  message: Scalars['String']['input'];
  transcriptId: Scalars['ID']['input'];
};

export type ChatUpdateArgs = {
  data: ChatUpdateInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  messages?: InputMaybe<ChatMessageRelateToManyForUpdateInput>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  project?: InputMaybe<ProjectRelateToOneForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  transcript?: InputMaybe<TranscriptRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ChatWhereInput = {
  AND?: InputMaybe<Array<ChatWhereInput>>;
  NOT?: InputMaybe<Array<ChatWhereInput>>;
  OR?: InputMaybe<Array<ChatWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  messages?: InputMaybe<ChatMessageManyRelationFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  project?: InputMaybe<ProjectWhereInput>;
  title?: InputMaybe<StringFilter>;
  transcript?: InputMaybe<TranscriptWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ChatWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/**
 * Mirrors the formatting options [Cloudinary provides](https://cloudinary.com/documentation/image_transformation_reference).
 * All options are strings as they ultimately end up in a URL.
 */
export type CloudinaryImageFormat = {
  angle?: InputMaybe<Scalars['String']['input']>;
  aspect_ratio?: InputMaybe<Scalars['String']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  border?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_space?: InputMaybe<Scalars['String']['input']>;
  crop?: InputMaybe<Scalars['String']['input']>;
  default_image?: InputMaybe<Scalars['String']['input']>;
  delay?: InputMaybe<Scalars['String']['input']>;
  density?: InputMaybe<Scalars['String']['input']>;
  dpr?: InputMaybe<Scalars['String']['input']>;
  effect?: InputMaybe<Scalars['String']['input']>;
  fetch_format?: InputMaybe<Scalars['String']['input']>;
  flags?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  gravity?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['String']['input']>;
  opacity?: InputMaybe<Scalars['String']['input']>;
  overlay?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  /**  Rewrites the filename to be this pretty string. Do not include `/` or `.` */
  prettyName?: InputMaybe<Scalars['String']['input']>;
  quality?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['String']['input']>;
  transformation?: InputMaybe<Scalars['String']['input']>;
  underlay?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
  zoom?: InputMaybe<Scalars['String']['input']>;
};

export type CloudinaryImage_File = {
  __typename?: 'CloudinaryImage_File';
  encoding?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mimetype?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  publicUrl?: Maybe<Scalars['String']['output']>;
  publicUrlTransformed?: Maybe<Scalars['String']['output']>;
};


export type CloudinaryImage_FilePublicUrlTransformedArgs = {
  transformation?: InputMaybe<CloudinaryImageFormat>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type IngestTranscriptInput = {
  intervieweeName?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['ID']['input'];
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  srt: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type IngestTranscriptResult = {
  __typename?: 'IngestTranscriptResult';
  projectId: Scalars['ID']['output'];
  segmentsCount: Scalars['Int']['output'];
  transcriptId: Scalars['ID']['output'];
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSearchFields: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  chatProject: ChatMutationResult;
  chatTranscript: ChatMutationResult;
  createChat?: Maybe<Chat>;
  createChatMessage?: Maybe<ChatMessage>;
  createChatMessages?: Maybe<Array<Maybe<ChatMessage>>>;
  createChats?: Maybe<Array<Maybe<Chat>>>;
  createOrganization?: Maybe<Organization>;
  createOrganizations?: Maybe<Array<Maybe<Organization>>>;
  createProject?: Maybe<Project>;
  createProjects?: Maybe<Array<Maybe<Project>>>;
  createTranscript?: Maybe<Transcript>;
  createTranscriptSegment?: Maybe<TranscriptSegment>;
  createTranscriptSegments?: Maybe<Array<Maybe<TranscriptSegment>>>;
  createTranscripts?: Maybe<Array<Maybe<Transcript>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteChat?: Maybe<Chat>;
  deleteChatMessage?: Maybe<ChatMessage>;
  deleteChatMessages?: Maybe<Array<Maybe<ChatMessage>>>;
  deleteChats?: Maybe<Array<Maybe<Chat>>>;
  deleteOrganization?: Maybe<Organization>;
  deleteOrganizations?: Maybe<Array<Maybe<Organization>>>;
  deleteProject?: Maybe<Project>;
  deleteProjects?: Maybe<Array<Maybe<Project>>>;
  deleteTranscript?: Maybe<Transcript>;
  deleteTranscriptSegment?: Maybe<TranscriptSegment>;
  deleteTranscriptSegments?: Maybe<Array<Maybe<TranscriptSegment>>>;
  deleteTranscripts?: Maybe<Array<Maybe<Transcript>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  ingestTranscript: IngestTranscriptResult;
  updateChat?: Maybe<Chat>;
  updateChatMessage?: Maybe<ChatMessage>;
  updateChatMessages?: Maybe<Array<Maybe<ChatMessage>>>;
  updateChats?: Maybe<Array<Maybe<Chat>>>;
  updateOrganization?: Maybe<Organization>;
  updateOrganizations?: Maybe<Array<Maybe<Organization>>>;
  updateProject?: Maybe<Project>;
  updateProjects?: Maybe<Array<Maybe<Project>>>;
  updateTranscript?: Maybe<Transcript>;
  updateTranscriptSegment?: Maybe<TranscriptSegment>;
  updateTranscriptSegments?: Maybe<Array<Maybe<TranscriptSegment>>>;
  updateTranscripts?: Maybe<Array<Maybe<Transcript>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationChatProjectArgs = {
  input: ChatProjectInput;
};


export type MutationChatTranscriptArgs = {
  input: ChatTranscriptInput;
};


export type MutationCreateChatArgs = {
  data: ChatCreateInput;
};


export type MutationCreateChatMessageArgs = {
  data: ChatMessageCreateInput;
};


export type MutationCreateChatMessagesArgs = {
  data: Array<ChatMessageCreateInput>;
};


export type MutationCreateChatsArgs = {
  data: Array<ChatCreateInput>;
};


export type MutationCreateOrganizationArgs = {
  data: OrganizationCreateInput;
};


export type MutationCreateOrganizationsArgs = {
  data: Array<OrganizationCreateInput>;
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateProjectsArgs = {
  data: Array<ProjectCreateInput>;
};


export type MutationCreateTranscriptArgs = {
  data: TranscriptCreateInput;
};


export type MutationCreateTranscriptSegmentArgs = {
  data: TranscriptSegmentCreateInput;
};


export type MutationCreateTranscriptSegmentsArgs = {
  data: Array<TranscriptSegmentCreateInput>;
};


export type MutationCreateTranscriptsArgs = {
  data: Array<TranscriptCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteChatArgs = {
  where: ChatWhereUniqueInput;
};


export type MutationDeleteChatMessageArgs = {
  where: ChatMessageWhereUniqueInput;
};


export type MutationDeleteChatMessagesArgs = {
  where: Array<ChatMessageWhereUniqueInput>;
};


export type MutationDeleteChatsArgs = {
  where: Array<ChatWhereUniqueInput>;
};


export type MutationDeleteOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
};


export type MutationDeleteOrganizationsArgs = {
  where: Array<OrganizationWhereUniqueInput>;
};


export type MutationDeleteProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type MutationDeleteProjectsArgs = {
  where: Array<ProjectWhereUniqueInput>;
};


export type MutationDeleteTranscriptArgs = {
  where: TranscriptWhereUniqueInput;
};


export type MutationDeleteTranscriptSegmentArgs = {
  where: TranscriptSegmentWhereUniqueInput;
};


export type MutationDeleteTranscriptSegmentsArgs = {
  where: Array<TranscriptSegmentWhereUniqueInput>;
};


export type MutationDeleteTranscriptsArgs = {
  where: Array<TranscriptWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationIngestTranscriptArgs = {
  input: IngestTranscriptInput;
};


export type MutationUpdateChatArgs = {
  data: ChatUpdateInput;
  where: ChatWhereUniqueInput;
};


export type MutationUpdateChatMessageArgs = {
  data: ChatMessageUpdateInput;
  where: ChatMessageWhereUniqueInput;
};


export type MutationUpdateChatMessagesArgs = {
  data: Array<ChatMessageUpdateArgs>;
};


export type MutationUpdateChatsArgs = {
  data: Array<ChatUpdateArgs>;
};


export type MutationUpdateOrganizationArgs = {
  data: OrganizationUpdateInput;
  where: OrganizationWhereUniqueInput;
};


export type MutationUpdateOrganizationsArgs = {
  data: Array<OrganizationUpdateArgs>;
};


export type MutationUpdateProjectArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};


export type MutationUpdateProjectsArgs = {
  data: Array<ProjectUpdateArgs>;
};


export type MutationUpdateTranscriptArgs = {
  data: TranscriptUpdateInput;
  where: TranscriptWhereUniqueInput;
};


export type MutationUpdateTranscriptSegmentArgs = {
  data: TranscriptSegmentUpdateInput;
  where: TranscriptSegmentWhereUniqueInput;
};


export type MutationUpdateTranscriptSegmentsArgs = {
  data: Array<TranscriptSegmentUpdateArgs>;
};


export type MutationUpdateTranscriptsArgs = {
  data: Array<TranscriptUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Organization = {
  __typename?: 'Organization';
  autojoinDomains?: Maybe<Scalars['JSON']['output']>;
  chats?: Maybe<Array<Chat>>;
  chatsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
  transcripts?: Maybe<Array<Transcript>>;
  transcriptsCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type OrganizationChatsArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  orderBy?: Array<ChatOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ChatWhereInput;
};


export type OrganizationChatsCountArgs = {
  where?: ChatWhereInput;
};


export type OrganizationProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type OrganizationProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type OrganizationTranscriptsArgs = {
  cursor?: InputMaybe<TranscriptWhereUniqueInput>;
  orderBy?: Array<TranscriptOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TranscriptWhereInput;
};


export type OrganizationTranscriptsCountArgs = {
  where?: TranscriptWhereInput;
};


export type OrganizationUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type OrganizationUsersCountArgs = {
  where?: UserWhereInput;
};

export type OrganizationCreateInput = {
  autojoinDomains?: InputMaybe<Scalars['JSON']['input']>;
  chats?: InputMaybe<ChatRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<ProjectRelateToManyForCreateInput>;
  transcripts?: InputMaybe<TranscriptRelateToManyForCreateInput>;
  users?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type OrganizationOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type OrganizationRelateToOneForCreateInput = {
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
  create?: InputMaybe<OrganizationCreateInput>;
};

export type OrganizationRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
  create?: InputMaybe<OrganizationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrganizationUpdateArgs = {
  data: OrganizationUpdateInput;
  where: OrganizationWhereUniqueInput;
};

export type OrganizationUpdateInput = {
  autojoinDomains?: InputMaybe<Scalars['JSON']['input']>;
  chats?: InputMaybe<ChatRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<ProjectRelateToManyForUpdateInput>;
  transcripts?: InputMaybe<TranscriptRelateToManyForUpdateInput>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type OrganizationWhereInput = {
  AND?: InputMaybe<Array<OrganizationWhereInput>>;
  NOT?: InputMaybe<Array<OrganizationWhereInput>>;
  OR?: InputMaybe<Array<OrganizationWhereInput>>;
  chats?: InputMaybe<ChatManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  projects?: InputMaybe<ProjectManyRelationFilter>;
  transcripts?: InputMaybe<TranscriptManyRelationFilter>;
  users?: InputMaybe<UserManyRelationFilter>;
};

export type OrganizationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Project = {
  __typename?: 'Project';
  chats?: Maybe<Array<Chat>>;
  chatsCount?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  org?: Maybe<Organization>;
  transcripts?: Maybe<Array<Transcript>>;
  transcriptsCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type ProjectChatsArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  orderBy?: Array<ChatOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ChatWhereInput;
};


export type ProjectChatsCountArgs = {
  where?: ChatWhereInput;
};


export type ProjectTranscriptsArgs = {
  cursor?: InputMaybe<TranscriptWhereUniqueInput>;
  orderBy?: Array<TranscriptOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TranscriptWhereInput;
};


export type ProjectTranscriptsCountArgs = {
  where?: TranscriptWhereInput;
};


export type ProjectUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type ProjectUsersCountArgs = {
  where?: UserWhereInput;
};

export type ProjectCreateInput = {
  chats?: InputMaybe<ChatRelateToManyForCreateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  transcripts?: InputMaybe<TranscriptRelateToManyForCreateInput>;
  users?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type ProjectManyRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>;
  none?: InputMaybe<ProjectWhereInput>;
  some?: InputMaybe<ProjectWhereInput>;
};

export type ProjectOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type ProjectRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<ProjectCreateInput>>;
};

export type ProjectRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<ProjectCreateInput>>;
  disconnect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  set?: InputMaybe<Array<ProjectWhereUniqueInput>>;
};

export type ProjectRelateToOneForCreateInput = {
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  create?: InputMaybe<ProjectCreateInput>;
};

export type ProjectRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  create?: InputMaybe<ProjectCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectUpdateArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};

export type ProjectUpdateInput = {
  chats?: InputMaybe<ChatRelateToManyForUpdateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  transcripts?: InputMaybe<TranscriptRelateToManyForUpdateInput>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  chats?: InputMaybe<ChatManyRelationFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  transcripts?: InputMaybe<TranscriptManyRelationFilter>;
  users?: InputMaybe<UserManyRelationFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<Chat>;
  chatMessage?: Maybe<ChatMessage>;
  chatMessages?: Maybe<Array<ChatMessage>>;
  chatMessagesCount?: Maybe<Scalars['Int']['output']>;
  chatProjectHistory: ChatHistoryResult;
  chatTranscriptHistory: ChatHistoryResult;
  chats?: Maybe<Array<Chat>>;
  chatsCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  organization?: Maybe<Organization>;
  organizations?: Maybe<Array<Organization>>;
  organizationsCount?: Maybe<Scalars['Int']['output']>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
  transcript?: Maybe<Transcript>;
  transcriptSegment?: Maybe<TranscriptSegment>;
  transcriptSegments?: Maybe<Array<TranscriptSegment>>;
  transcriptSegmentsCount?: Maybe<Scalars['Int']['output']>;
  transcripts?: Maybe<Array<Transcript>>;
  transcriptsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryChatArgs = {
  where: ChatWhereUniqueInput;
};


export type QueryChatMessageArgs = {
  where: ChatMessageWhereUniqueInput;
};


export type QueryChatMessagesArgs = {
  cursor?: InputMaybe<ChatMessageWhereUniqueInput>;
  orderBy?: Array<ChatMessageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ChatMessageWhereInput;
};


export type QueryChatMessagesCountArgs = {
  where?: ChatMessageWhereInput;
};


export type QueryChatProjectHistoryArgs = {
  chatId?: InputMaybe<Scalars['ID']['input']>;
  projectId: Scalars['ID']['input'];
};


export type QueryChatTranscriptHistoryArgs = {
  chatId?: InputMaybe<Scalars['ID']['input']>;
  transcriptId: Scalars['ID']['input'];
};


export type QueryChatsArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  orderBy?: Array<ChatOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ChatWhereInput;
};


export type QueryChatsCountArgs = {
  where?: ChatWhereInput;
};


export type QueryOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
};


export type QueryOrganizationsArgs = {
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  orderBy?: Array<OrganizationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrganizationWhereInput;
};


export type QueryOrganizationsCountArgs = {
  where?: OrganizationWhereInput;
};


export type QueryProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type QueryProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type QueryProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type QueryTranscriptArgs = {
  where: TranscriptWhereUniqueInput;
};


export type QueryTranscriptSegmentArgs = {
  where: TranscriptSegmentWhereUniqueInput;
};


export type QueryTranscriptSegmentsArgs = {
  cursor?: InputMaybe<TranscriptSegmentWhereUniqueInput>;
  orderBy?: Array<TranscriptSegmentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TranscriptSegmentWhereInput;
};


export type QueryTranscriptSegmentsCountArgs = {
  where?: TranscriptSegmentWhereInput;
};


export type QueryTranscriptsArgs = {
  cursor?: InputMaybe<TranscriptWhereUniqueInput>;
  orderBy?: Array<TranscriptOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TranscriptWhereInput;
};


export type QueryTranscriptsCountArgs = {
  where?: TranscriptWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Transcript = {
  __typename?: 'Transcript';
  chats?: Maybe<Array<Chat>>;
  chatsCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  intervieweeName?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  org?: Maybe<Organization>;
  project?: Maybe<Project>;
  segments?: Maybe<Array<TranscriptSegment>>;
  segmentsCount?: Maybe<Scalars['Int']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TranscriptChatsArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  orderBy?: Array<ChatOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ChatWhereInput;
};


export type TranscriptChatsCountArgs = {
  where?: ChatWhereInput;
};


export type TranscriptSegmentsArgs = {
  cursor?: InputMaybe<TranscriptSegmentWhereUniqueInput>;
  orderBy?: Array<TranscriptSegmentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TranscriptSegmentWhereInput;
};


export type TranscriptSegmentsCountArgs = {
  where?: TranscriptSegmentWhereInput;
};

export type TranscriptCreateInput = {
  chats?: InputMaybe<ChatRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  intervieweeName?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  project?: InputMaybe<ProjectRelateToOneForCreateInput>;
  segments?: InputMaybe<TranscriptSegmentRelateToManyForCreateInput>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TranscriptManyRelationFilter = {
  every?: InputMaybe<TranscriptWhereInput>;
  none?: InputMaybe<TranscriptWhereInput>;
  some?: InputMaybe<TranscriptWhereInput>;
};

export type TranscriptOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  intervieweeName?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  notes?: InputMaybe<OrderDirection>;
  sourceUrl?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type TranscriptRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TranscriptWhereUniqueInput>>;
  create?: InputMaybe<Array<TranscriptCreateInput>>;
};

export type TranscriptRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TranscriptWhereUniqueInput>>;
  create?: InputMaybe<Array<TranscriptCreateInput>>;
  disconnect?: InputMaybe<Array<TranscriptWhereUniqueInput>>;
  set?: InputMaybe<Array<TranscriptWhereUniqueInput>>;
};

export type TranscriptRelateToOneForCreateInput = {
  connect?: InputMaybe<TranscriptWhereUniqueInput>;
  create?: InputMaybe<TranscriptCreateInput>;
};

export type TranscriptRelateToOneForUpdateInput = {
  connect?: InputMaybe<TranscriptWhereUniqueInput>;
  create?: InputMaybe<TranscriptCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TranscriptSegment = {
  __typename?: 'TranscriptSegment';
  chatMessages?: Maybe<Array<ChatMessage>>;
  chatMessagesCount?: Maybe<Scalars['Int']['output']>;
  durationMs?: Maybe<Scalars['Int']['output']>;
  endMs?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  isMetadata?: Maybe<Scalars['Boolean']['output']>;
  speaker?: Maybe<Scalars['String']['output']>;
  startMs?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  transcript?: Maybe<Transcript>;
};


export type TranscriptSegmentChatMessagesArgs = {
  cursor?: InputMaybe<ChatMessageWhereUniqueInput>;
  orderBy?: Array<ChatMessageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ChatMessageWhereInput;
};


export type TranscriptSegmentChatMessagesCountArgs = {
  where?: ChatMessageWhereInput;
};

export type TranscriptSegmentCreateInput = {
  chatMessages?: InputMaybe<ChatMessageRelateToManyForCreateInput>;
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  endMs?: InputMaybe<Scalars['Int']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  isMetadata?: InputMaybe<Scalars['Boolean']['input']>;
  speaker?: InputMaybe<Scalars['String']['input']>;
  startMs?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  transcript?: InputMaybe<TranscriptRelateToOneForCreateInput>;
};

export type TranscriptSegmentManyRelationFilter = {
  every?: InputMaybe<TranscriptSegmentWhereInput>;
  none?: InputMaybe<TranscriptSegmentWhereInput>;
  some?: InputMaybe<TranscriptSegmentWhereInput>;
};

export type TranscriptSegmentOrderByInput = {
  durationMs?: InputMaybe<OrderDirection>;
  endMs?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  index?: InputMaybe<OrderDirection>;
  isMetadata?: InputMaybe<OrderDirection>;
  speaker?: InputMaybe<OrderDirection>;
  startMs?: InputMaybe<OrderDirection>;
  text?: InputMaybe<OrderDirection>;
};

export type TranscriptSegmentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TranscriptSegmentWhereUniqueInput>>;
  create?: InputMaybe<Array<TranscriptSegmentCreateInput>>;
};

export type TranscriptSegmentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TranscriptSegmentWhereUniqueInput>>;
  create?: InputMaybe<Array<TranscriptSegmentCreateInput>>;
  disconnect?: InputMaybe<Array<TranscriptSegmentWhereUniqueInput>>;
  set?: InputMaybe<Array<TranscriptSegmentWhereUniqueInput>>;
};

export type TranscriptSegmentUpdateArgs = {
  data: TranscriptSegmentUpdateInput;
  where: TranscriptSegmentWhereUniqueInput;
};

export type TranscriptSegmentUpdateInput = {
  chatMessages?: InputMaybe<ChatMessageRelateToManyForUpdateInput>;
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  endMs?: InputMaybe<Scalars['Int']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  isMetadata?: InputMaybe<Scalars['Boolean']['input']>;
  speaker?: InputMaybe<Scalars['String']['input']>;
  startMs?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  transcript?: InputMaybe<TranscriptRelateToOneForUpdateInput>;
};

export type TranscriptSegmentWhereInput = {
  AND?: InputMaybe<Array<TranscriptSegmentWhereInput>>;
  NOT?: InputMaybe<Array<TranscriptSegmentWhereInput>>;
  OR?: InputMaybe<Array<TranscriptSegmentWhereInput>>;
  chatMessages?: InputMaybe<ChatMessageManyRelationFilter>;
  durationMs?: InputMaybe<IntNullableFilter>;
  endMs?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  index?: InputMaybe<IntNullableFilter>;
  isMetadata?: InputMaybe<BooleanFilter>;
  speaker?: InputMaybe<StringFilter>;
  startMs?: InputMaybe<IntNullableFilter>;
  text?: InputMaybe<StringFilter>;
  transcript?: InputMaybe<TranscriptWhereInput>;
};

export type TranscriptSegmentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TranscriptUpdateArgs = {
  data: TranscriptUpdateInput;
  where: TranscriptWhereUniqueInput;
};

export type TranscriptUpdateInput = {
  chats?: InputMaybe<ChatRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  intervieweeName?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  project?: InputMaybe<ProjectRelateToOneForUpdateInput>;
  segments?: InputMaybe<TranscriptSegmentRelateToManyForUpdateInput>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TranscriptWhereInput = {
  AND?: InputMaybe<Array<TranscriptWhereInput>>;
  NOT?: InputMaybe<Array<TranscriptWhereInput>>;
  OR?: InputMaybe<Array<TranscriptWhereInput>>;
  chats?: InputMaybe<ChatManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  intervieweeName?: InputMaybe<StringFilter>;
  language?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  project?: InputMaybe<ProjectWhereInput>;
  segments?: InputMaybe<TranscriptSegmentManyRelationFilter>;
  sourceUrl?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type TranscriptWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarSocialUrl?: Maybe<Scalars['String']['output']>;
  avatarUploaded?: Maybe<CloudinaryImage_File>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  org?: Maybe<Organization>;
  project?: Maybe<Project>;
  provider?: Maybe<UserProviderType>;
  providerAccountId?: Maybe<Scalars['String']['output']>;
  provisionedAt?: Maybe<Scalars['DateTime']['output']>;
  rawAuth?: Maybe<Scalars['JSON']['output']>;
  role?: Maybe<UserRoleType>;
  seenAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserCreateInput = {
  avatarSocialUrl?: InputMaybe<Scalars['String']['input']>;
  avatarUploaded?: InputMaybe<Scalars['Upload']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  project?: InputMaybe<ProjectRelateToOneForCreateInput>;
  provider?: InputMaybe<UserProviderType>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  provisionedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rawAuth?: InputMaybe<Scalars['JSON']['input']>;
  role?: InputMaybe<UserRoleType>;
  seenAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  avatarSocialUrl?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstName?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isActive?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  provider?: InputMaybe<OrderDirection>;
  providerAccountId?: InputMaybe<OrderDirection>;
  provisionedAt?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
  seenAt?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export enum UserProviderType {
  Google = 'google'
}

export type UserProviderTypeNullableFilter = {
  equals?: InputMaybe<UserProviderType>;
  in?: InputMaybe<Array<UserProviderType>>;
  not?: InputMaybe<UserProviderTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserProviderType>>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export enum UserRoleType {
  God = 'GOD',
  OrgAdmin = 'ORG_ADMIN',
  OrgOwner = 'ORG_OWNER',
  ProjectAdmin = 'PROJECT_ADMIN',
  User = 'USER'
}

export type UserRoleTypeNullableFilter = {
  equals?: InputMaybe<UserRoleType>;
  in?: InputMaybe<Array<UserRoleType>>;
  not?: InputMaybe<UserRoleTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserRoleType>>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  avatarSocialUrl?: InputMaybe<Scalars['String']['input']>;
  avatarUploaded?: InputMaybe<Scalars['Upload']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  project?: InputMaybe<ProjectRelateToOneForUpdateInput>;
  provider?: InputMaybe<UserProviderType>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  provisionedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rawAuth?: InputMaybe<Scalars['JSON']['input']>;
  role?: InputMaybe<UserRoleType>;
  seenAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatarSocialUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isActive?: InputMaybe<BooleanFilter>;
  lastName?: InputMaybe<StringFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  project?: InputMaybe<ProjectWhereInput>;
  provider?: InputMaybe<UserProviderTypeNullableFilter>;
  providerAccountId?: InputMaybe<StringFilter>;
  provisionedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<UserRoleTypeNullableFilter>;
  seenAt?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, displayName?: string | null, role?: UserRoleType | null, avatarUrl?: string | null, provisionedAt?: any | null, seenAt?: any | null, isActive?: boolean | null, project?: { __typename?: 'Project', id: string, name?: string | null } | null }> | null };

export type ChatProjectMutationVariables = Exact<{
  input: ChatProjectInput;
}>;


export type ChatProjectMutation = { __typename?: 'Mutation', chatProject: { __typename?: 'ChatMutationResult', chatId: string, answer: string, messages: Array<{ __typename?: 'ChatMessageResult', id: string, role: string, content: string, createdAt?: string | null, segments: Array<{ __typename?: 'ChatSegmentReference', id: string, text: string, startMs?: number | null, endMs?: number | null, speaker?: string | null, transcriptTitle?: string | null }> }>, references: Array<{ __typename?: 'ChatSegmentReference', id: string, text: string, startMs?: number | null, endMs?: number | null, speaker?: string | null, transcriptTitle?: string | null }> } };

export type ChatProjectHistoryQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type ChatProjectHistoryQuery = { __typename?: 'Query', chatProjectHistory: { __typename?: 'ChatHistoryResult', chatId?: string | null, messages: Array<{ __typename?: 'ChatMessageResult', id: string, role: string, content: string, createdAt?: string | null, segments: Array<{ __typename?: 'ChatSegmentReference', id: string, text: string, startMs?: number | null, endMs?: number | null, speaker?: string | null, transcriptTitle?: string | null }> }> } };

export type ChatTranscriptMutationVariables = Exact<{
  input: ChatTranscriptInput;
}>;


export type ChatTranscriptMutation = { __typename?: 'Mutation', chatTranscript: { __typename?: 'ChatMutationResult', chatId: string, answer: string, messages: Array<{ __typename?: 'ChatMessageResult', id: string, role: string, content: string, createdAt?: string | null, segments: Array<{ __typename?: 'ChatSegmentReference', id: string, text: string, startMs?: number | null, endMs?: number | null, speaker?: string | null, transcriptTitle?: string | null }> }>, references: Array<{ __typename?: 'ChatSegmentReference', id: string, text: string, startMs?: number | null, endMs?: number | null, speaker?: string | null, transcriptTitle?: string | null }> } };

export type ChatTranscriptHistoryQueryVariables = Exact<{
  transcriptId: Scalars['ID']['input'];
}>;


export type ChatTranscriptHistoryQuery = { __typename?: 'Query', chatTranscriptHistory: { __typename?: 'ChatHistoryResult', chatId?: string | null, messages: Array<{ __typename?: 'ChatMessageResult', id: string, role: string, content: string, createdAt?: string | null, segments: Array<{ __typename?: 'ChatSegmentReference', id: string, text: string, startMs?: number | null, endMs?: number | null, speaker?: string | null, transcriptTitle?: string | null }> }> } };

export type CreateProjectMutationVariables = Exact<{
  data: ProjectCreateInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string } | null };

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, email?: string | null, role?: UserRoleType | null, isActive?: boolean | null, project?: { __typename?: 'Project', id: string, name?: string | null } | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'Project', id: string } | null };

export type IngestTranscriptMutationVariables = Exact<{
  input: IngestTranscriptInput;
}>;


export type IngestTranscriptMutation = { __typename?: 'Mutation', ingestTranscript: { __typename?: 'IngestTranscriptResult', transcriptId: string, segmentsCount: number, projectId: string } };

export type OrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganizationsQuery = { __typename?: 'Query', organizations?: Array<{ __typename?: 'Organization', id: string, name?: string | null, autojoinDomains?: any | null }> | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name?: string | null, description?: string | null, org?: { __typename?: 'Organization', id: string, name?: string | null } | null } | null };

export type ProjectChatsQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type ProjectChatsQuery = { __typename?: 'Query', chats?: Array<{ __typename?: 'Chat', id: string, title?: string | null, createdAt?: any | null }> | null };

export type ProjectDetailQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type ProjectDetailQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name?: string | null, description?: string | null, org?: { __typename?: 'Organization', id: string, name?: string | null } | null, transcripts?: Array<{ __typename?: 'Transcript', id: string, title?: string | null, intervieweeName?: string | null, createdAt?: any | null, segmentsCount?: number | null }> | null } | null };

export type ProjectTranscriptsQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type ProjectTranscriptsQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, transcripts?: Array<{ __typename?: 'Transcript', id: string, title?: string | null, intervieweeName?: string | null, createdAt?: any | null, segmentsCount?: number | null }> | null } | null };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, name?: string | null, description?: string | null, transcriptsCount?: number | null, org?: { __typename?: 'Organization', id: string, name?: string | null } | null }> | null };

export type TranscriptQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TranscriptQuery = { __typename?: 'Query', transcript?: { __typename?: 'Transcript', id: string, title?: string | null, intervieweeName?: string | null, notes?: string | null, createdAt?: any | null, segments?: Array<{ __typename?: 'TranscriptSegment', id: string, text?: string | null, speaker?: string | null, startMs?: number | null, endMs?: number | null, durationMs?: number | null }> | null } | null };

export type TranscriptChatsQueryVariables = Exact<{
  transcriptId: Scalars['ID']['input'];
}>;


export type TranscriptChatsQuery = { __typename?: 'Query', chats?: Array<{ __typename?: 'Chat', id: string, title?: string | null, createdAt?: any | null }> | null };

export type TranscriptsQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type TranscriptsQuery = { __typename?: 'Query', transcripts?: Array<{ __typename?: 'Transcript', id: string, title?: string | null, intervieweeName?: string | null, notes?: string | null, createdAt?: any | null, segmentsCount?: number | null, project?: { __typename?: 'Project', id: string, name?: string | null } | null }> | null };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ProjectUpdateInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string } | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, avatarUrl?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, displayName?: string | null, role?: UserRoleType | null, project?: { __typename?: 'Project', id: string, name?: string | null } | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, displayName?: string | null, role?: UserRoleType | null, isActive?: boolean | null, project?: { __typename?: 'Project', id: string, name?: string | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, role?: UserRoleType | null, isActive?: boolean | null, project?: { __typename?: 'Project', id: string, name?: string | null } | null } | null };


export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    id
    firstName
    lastName
    email
    displayName
    role
    avatarUrl
    project {
      id
      name
    }
    provisionedAt
    seenAt
    isActive
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const ChatProjectDocument = gql`
    mutation ChatProject($input: ChatProjectInput!) {
  chatProject(input: $input) {
    chatId
    answer
    messages {
      id
      role
      content
      createdAt
      segments {
        id
        text
        startMs
        endMs
        speaker
        transcriptTitle
      }
    }
    references {
      id
      text
      startMs
      endMs
      speaker
      transcriptTitle
    }
  }
}
    `;
export type ChatProjectMutationFn = Apollo.MutationFunction<ChatProjectMutation, ChatProjectMutationVariables>;

/**
 * __useChatProjectMutation__
 *
 * To run a mutation, you first call `useChatProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChatProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chatProjectMutation, { data, loading, error }] = useChatProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChatProjectMutation(baseOptions?: Apollo.MutationHookOptions<ChatProjectMutation, ChatProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChatProjectMutation, ChatProjectMutationVariables>(ChatProjectDocument, options);
      }
export type ChatProjectMutationHookResult = ReturnType<typeof useChatProjectMutation>;
export type ChatProjectMutationResult = Apollo.MutationResult<ChatProjectMutation>;
export type ChatProjectMutationOptions = Apollo.BaseMutationOptions<ChatProjectMutation, ChatProjectMutationVariables>;
export const ChatProjectHistoryDocument = gql`
    query ChatProjectHistory($projectId: ID!) {
  chatProjectHistory(projectId: $projectId) {
    chatId
    messages {
      id
      role
      content
      createdAt
      segments {
        id
        text
        startMs
        endMs
        speaker
        transcriptTitle
      }
    }
  }
}
    `;

/**
 * __useChatProjectHistoryQuery__
 *
 * To run a query within a React component, call `useChatProjectHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatProjectHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatProjectHistoryQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useChatProjectHistoryQuery(baseOptions: Apollo.QueryHookOptions<ChatProjectHistoryQuery, ChatProjectHistoryQueryVariables> & ({ variables: ChatProjectHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatProjectHistoryQuery, ChatProjectHistoryQueryVariables>(ChatProjectHistoryDocument, options);
      }
export function useChatProjectHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatProjectHistoryQuery, ChatProjectHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatProjectHistoryQuery, ChatProjectHistoryQueryVariables>(ChatProjectHistoryDocument, options);
        }
export function useChatProjectHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChatProjectHistoryQuery, ChatProjectHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChatProjectHistoryQuery, ChatProjectHistoryQueryVariables>(ChatProjectHistoryDocument, options);
        }
export type ChatProjectHistoryQueryHookResult = ReturnType<typeof useChatProjectHistoryQuery>;
export type ChatProjectHistoryLazyQueryHookResult = ReturnType<typeof useChatProjectHistoryLazyQuery>;
export type ChatProjectHistorySuspenseQueryHookResult = ReturnType<typeof useChatProjectHistorySuspenseQuery>;
export type ChatProjectHistoryQueryResult = Apollo.QueryResult<ChatProjectHistoryQuery, ChatProjectHistoryQueryVariables>;
export const ChatTranscriptDocument = gql`
    mutation ChatTranscript($input: ChatTranscriptInput!) {
  chatTranscript(input: $input) {
    chatId
    answer
    messages {
      id
      role
      content
      createdAt
      segments {
        id
        text
        startMs
        endMs
        speaker
        transcriptTitle
      }
    }
    references {
      id
      text
      startMs
      endMs
      speaker
      transcriptTitle
    }
  }
}
    `;
export type ChatTranscriptMutationFn = Apollo.MutationFunction<ChatTranscriptMutation, ChatTranscriptMutationVariables>;

/**
 * __useChatTranscriptMutation__
 *
 * To run a mutation, you first call `useChatTranscriptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChatTranscriptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chatTranscriptMutation, { data, loading, error }] = useChatTranscriptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChatTranscriptMutation(baseOptions?: Apollo.MutationHookOptions<ChatTranscriptMutation, ChatTranscriptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChatTranscriptMutation, ChatTranscriptMutationVariables>(ChatTranscriptDocument, options);
      }
export type ChatTranscriptMutationHookResult = ReturnType<typeof useChatTranscriptMutation>;
export type ChatTranscriptMutationResult = Apollo.MutationResult<ChatTranscriptMutation>;
export type ChatTranscriptMutationOptions = Apollo.BaseMutationOptions<ChatTranscriptMutation, ChatTranscriptMutationVariables>;
export const ChatTranscriptHistoryDocument = gql`
    query ChatTranscriptHistory($transcriptId: ID!) {
  chatTranscriptHistory(transcriptId: $transcriptId) {
    chatId
    messages {
      id
      role
      content
      createdAt
      segments {
        id
        text
        startMs
        endMs
        speaker
        transcriptTitle
      }
    }
  }
}
    `;

/**
 * __useChatTranscriptHistoryQuery__
 *
 * To run a query within a React component, call `useChatTranscriptHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatTranscriptHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatTranscriptHistoryQuery({
 *   variables: {
 *      transcriptId: // value for 'transcriptId'
 *   },
 * });
 */
export function useChatTranscriptHistoryQuery(baseOptions: Apollo.QueryHookOptions<ChatTranscriptHistoryQuery, ChatTranscriptHistoryQueryVariables> & ({ variables: ChatTranscriptHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatTranscriptHistoryQuery, ChatTranscriptHistoryQueryVariables>(ChatTranscriptHistoryDocument, options);
      }
export function useChatTranscriptHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatTranscriptHistoryQuery, ChatTranscriptHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatTranscriptHistoryQuery, ChatTranscriptHistoryQueryVariables>(ChatTranscriptHistoryDocument, options);
        }
export function useChatTranscriptHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChatTranscriptHistoryQuery, ChatTranscriptHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChatTranscriptHistoryQuery, ChatTranscriptHistoryQueryVariables>(ChatTranscriptHistoryDocument, options);
        }
export type ChatTranscriptHistoryQueryHookResult = ReturnType<typeof useChatTranscriptHistoryQuery>;
export type ChatTranscriptHistoryLazyQueryHookResult = ReturnType<typeof useChatTranscriptHistoryLazyQuery>;
export type ChatTranscriptHistorySuspenseQueryHookResult = ReturnType<typeof useChatTranscriptHistorySuspenseQuery>;
export type ChatTranscriptHistoryQueryResult = Apollo.QueryResult<ChatTranscriptHistoryQuery, ChatTranscriptHistoryQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: ProjectCreateInput!) {
  createProject(data: $data) {
    id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
    email
    role
    project {
      id
      name
    }
    isActive
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: ID!) {
  deleteProject(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const IngestTranscriptDocument = gql`
    mutation IngestTranscript($input: IngestTranscriptInput!) {
  ingestTranscript(input: $input) {
    transcriptId
    segmentsCount
    projectId
  }
}
    `;
export type IngestTranscriptMutationFn = Apollo.MutationFunction<IngestTranscriptMutation, IngestTranscriptMutationVariables>;

/**
 * __useIngestTranscriptMutation__
 *
 * To run a mutation, you first call `useIngestTranscriptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIngestTranscriptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ingestTranscriptMutation, { data, loading, error }] = useIngestTranscriptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIngestTranscriptMutation(baseOptions?: Apollo.MutationHookOptions<IngestTranscriptMutation, IngestTranscriptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IngestTranscriptMutation, IngestTranscriptMutationVariables>(IngestTranscriptDocument, options);
      }
export type IngestTranscriptMutationHookResult = ReturnType<typeof useIngestTranscriptMutation>;
export type IngestTranscriptMutationResult = Apollo.MutationResult<IngestTranscriptMutation>;
export type IngestTranscriptMutationOptions = Apollo.BaseMutationOptions<IngestTranscriptMutation, IngestTranscriptMutationVariables>;
export const OrganizationsDocument = gql`
    query Organizations {
  organizations {
    id
    name
    autojoinDomains
  }
}
    `;

/**
 * __useOrganizationsQuery__
 *
 * To run a query within a React component, call `useOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
      }
export function useOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
        }
export function useOrganizationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
        }
export type OrganizationsQueryHookResult = ReturnType<typeof useOrganizationsQuery>;
export type OrganizationsLazyQueryHookResult = ReturnType<typeof useOrganizationsLazyQuery>;
export type OrganizationsSuspenseQueryHookResult = ReturnType<typeof useOrganizationsSuspenseQuery>;
export type OrganizationsQueryResult = Apollo.QueryResult<OrganizationsQuery, OrganizationsQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: ID!) {
  project(where: {id: $id}) {
    id
    name
    description
    org {
      id
      name
    }
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables> & ({ variables: ProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export function useProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectSuspenseQueryHookResult = ReturnType<typeof useProjectSuspenseQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectChatsDocument = gql`
    query ProjectChats($projectId: ID!) {
  chats(
    where: {project: {id: {equals: $projectId}}, transcript: null}
    orderBy: {createdAt: desc}
  ) {
    id
    title
    createdAt
  }
}
    `;

/**
 * __useProjectChatsQuery__
 *
 * To run a query within a React component, call `useProjectChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectChatsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectChatsQuery(baseOptions: Apollo.QueryHookOptions<ProjectChatsQuery, ProjectChatsQueryVariables> & ({ variables: ProjectChatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectChatsQuery, ProjectChatsQueryVariables>(ProjectChatsDocument, options);
      }
export function useProjectChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectChatsQuery, ProjectChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectChatsQuery, ProjectChatsQueryVariables>(ProjectChatsDocument, options);
        }
export function useProjectChatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectChatsQuery, ProjectChatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectChatsQuery, ProjectChatsQueryVariables>(ProjectChatsDocument, options);
        }
export type ProjectChatsQueryHookResult = ReturnType<typeof useProjectChatsQuery>;
export type ProjectChatsLazyQueryHookResult = ReturnType<typeof useProjectChatsLazyQuery>;
export type ProjectChatsSuspenseQueryHookResult = ReturnType<typeof useProjectChatsSuspenseQuery>;
export type ProjectChatsQueryResult = Apollo.QueryResult<ProjectChatsQuery, ProjectChatsQueryVariables>;
export const ProjectDetailDocument = gql`
    query ProjectDetail($projectId: ID!) {
  project(where: {id: $projectId}) {
    id
    name
    description
    org {
      id
      name
    }
    transcripts {
      id
      title
      intervieweeName
      createdAt
      segmentsCount
    }
  }
}
    `;

/**
 * __useProjectDetailQuery__
 *
 * To run a query within a React component, call `useProjectDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDetailQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectDetailQuery(baseOptions: Apollo.QueryHookOptions<ProjectDetailQuery, ProjectDetailQueryVariables> & ({ variables: ProjectDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDetailQuery, ProjectDetailQueryVariables>(ProjectDetailDocument, options);
      }
export function useProjectDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDetailQuery, ProjectDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDetailQuery, ProjectDetailQueryVariables>(ProjectDetailDocument, options);
        }
export function useProjectDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectDetailQuery, ProjectDetailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectDetailQuery, ProjectDetailQueryVariables>(ProjectDetailDocument, options);
        }
export type ProjectDetailQueryHookResult = ReturnType<typeof useProjectDetailQuery>;
export type ProjectDetailLazyQueryHookResult = ReturnType<typeof useProjectDetailLazyQuery>;
export type ProjectDetailSuspenseQueryHookResult = ReturnType<typeof useProjectDetailSuspenseQuery>;
export type ProjectDetailQueryResult = Apollo.QueryResult<ProjectDetailQuery, ProjectDetailQueryVariables>;
export const ProjectTranscriptsDocument = gql`
    query ProjectTranscripts($projectId: ID!) {
  project(where: {id: $projectId}) {
    id
    transcripts {
      id
      title
      intervieweeName
      createdAt
      segmentsCount
    }
  }
}
    `;

/**
 * __useProjectTranscriptsQuery__
 *
 * To run a query within a React component, call `useProjectTranscriptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectTranscriptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectTranscriptsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectTranscriptsQuery(baseOptions: Apollo.QueryHookOptions<ProjectTranscriptsQuery, ProjectTranscriptsQueryVariables> & ({ variables: ProjectTranscriptsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectTranscriptsQuery, ProjectTranscriptsQueryVariables>(ProjectTranscriptsDocument, options);
      }
export function useProjectTranscriptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTranscriptsQuery, ProjectTranscriptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectTranscriptsQuery, ProjectTranscriptsQueryVariables>(ProjectTranscriptsDocument, options);
        }
export function useProjectTranscriptsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectTranscriptsQuery, ProjectTranscriptsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectTranscriptsQuery, ProjectTranscriptsQueryVariables>(ProjectTranscriptsDocument, options);
        }
export type ProjectTranscriptsQueryHookResult = ReturnType<typeof useProjectTranscriptsQuery>;
export type ProjectTranscriptsLazyQueryHookResult = ReturnType<typeof useProjectTranscriptsLazyQuery>;
export type ProjectTranscriptsSuspenseQueryHookResult = ReturnType<typeof useProjectTranscriptsSuspenseQuery>;
export type ProjectTranscriptsQueryResult = Apollo.QueryResult<ProjectTranscriptsQuery, ProjectTranscriptsQueryVariables>;
export const ProjectsDocument = gql`
    query Projects {
  projects {
    id
    name
    description
    transcriptsCount
    org {
      id
      name
    }
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export function useProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsSuspenseQueryHookResult = ReturnType<typeof useProjectsSuspenseQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const TranscriptDocument = gql`
    query Transcript($id: ID!) {
  transcript(where: {id: $id}) {
    id
    title
    intervieweeName
    notes
    createdAt
    segments {
      id
      text
      speaker
      startMs
      endMs
      durationMs
    }
  }
}
    `;

/**
 * __useTranscriptQuery__
 *
 * To run a query within a React component, call `useTranscriptQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranscriptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranscriptQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTranscriptQuery(baseOptions: Apollo.QueryHookOptions<TranscriptQuery, TranscriptQueryVariables> & ({ variables: TranscriptQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TranscriptQuery, TranscriptQueryVariables>(TranscriptDocument, options);
      }
export function useTranscriptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TranscriptQuery, TranscriptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TranscriptQuery, TranscriptQueryVariables>(TranscriptDocument, options);
        }
export function useTranscriptSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TranscriptQuery, TranscriptQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TranscriptQuery, TranscriptQueryVariables>(TranscriptDocument, options);
        }
export type TranscriptQueryHookResult = ReturnType<typeof useTranscriptQuery>;
export type TranscriptLazyQueryHookResult = ReturnType<typeof useTranscriptLazyQuery>;
export type TranscriptSuspenseQueryHookResult = ReturnType<typeof useTranscriptSuspenseQuery>;
export type TranscriptQueryResult = Apollo.QueryResult<TranscriptQuery, TranscriptQueryVariables>;
export const TranscriptChatsDocument = gql`
    query TranscriptChats($transcriptId: ID!) {
  chats(
    where: {transcript: {id: {equals: $transcriptId}}}
    orderBy: {createdAt: desc}
  ) {
    id
    title
    createdAt
  }
}
    `;

/**
 * __useTranscriptChatsQuery__
 *
 * To run a query within a React component, call `useTranscriptChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranscriptChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranscriptChatsQuery({
 *   variables: {
 *      transcriptId: // value for 'transcriptId'
 *   },
 * });
 */
export function useTranscriptChatsQuery(baseOptions: Apollo.QueryHookOptions<TranscriptChatsQuery, TranscriptChatsQueryVariables> & ({ variables: TranscriptChatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TranscriptChatsQuery, TranscriptChatsQueryVariables>(TranscriptChatsDocument, options);
      }
export function useTranscriptChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TranscriptChatsQuery, TranscriptChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TranscriptChatsQuery, TranscriptChatsQueryVariables>(TranscriptChatsDocument, options);
        }
export function useTranscriptChatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TranscriptChatsQuery, TranscriptChatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TranscriptChatsQuery, TranscriptChatsQueryVariables>(TranscriptChatsDocument, options);
        }
export type TranscriptChatsQueryHookResult = ReturnType<typeof useTranscriptChatsQuery>;
export type TranscriptChatsLazyQueryHookResult = ReturnType<typeof useTranscriptChatsLazyQuery>;
export type TranscriptChatsSuspenseQueryHookResult = ReturnType<typeof useTranscriptChatsSuspenseQuery>;
export type TranscriptChatsQueryResult = Apollo.QueryResult<TranscriptChatsQuery, TranscriptChatsQueryVariables>;
export const TranscriptsDocument = gql`
    query Transcripts($projectId: ID) {
  transcripts(where: {project: {id: {equals: $projectId}}}) {
    id
    title
    intervieweeName
    notes
    createdAt
    segmentsCount
    project {
      id
      name
    }
  }
}
    `;

/**
 * __useTranscriptsQuery__
 *
 * To run a query within a React component, call `useTranscriptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranscriptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranscriptsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useTranscriptsQuery(baseOptions?: Apollo.QueryHookOptions<TranscriptsQuery, TranscriptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TranscriptsQuery, TranscriptsQueryVariables>(TranscriptsDocument, options);
      }
export function useTranscriptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TranscriptsQuery, TranscriptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TranscriptsQuery, TranscriptsQueryVariables>(TranscriptsDocument, options);
        }
export function useTranscriptsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TranscriptsQuery, TranscriptsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TranscriptsQuery, TranscriptsQueryVariables>(TranscriptsDocument, options);
        }
export type TranscriptsQueryHookResult = ReturnType<typeof useTranscriptsQuery>;
export type TranscriptsLazyQueryHookResult = ReturnType<typeof useTranscriptsLazyQuery>;
export type TranscriptsSuspenseQueryHookResult = ReturnType<typeof useTranscriptsSuspenseQuery>;
export type TranscriptsQueryResult = Apollo.QueryResult<TranscriptsQuery, TranscriptsQueryVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($id: ID!, $data: ProjectUpdateInput!) {
  updateProject(where: {id: $id}, data: $data) {
    id
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(where: {id: $id}) {
    id
    avatarUrl
    email
    firstName
    lastName
    displayName
    role
    project {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  user(where: {id: $id}) {
    id
    firstName
    lastName
    email
    displayName
    role
    project {
      id
      name
    }
    isActive
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
  updateUser(where: {id: $id}, data: $data) {
    id
    role
    project {
      id
      name
    }
    isActive
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    