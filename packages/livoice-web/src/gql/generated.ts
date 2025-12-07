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

export type AllocationBreakdownSegment = {
  __typename?: 'AllocationBreakdownSegment';
  allocationRate: Scalars['Float']['output'];
  contribution: Scalars['Float']['output'];
  daysInSegment: Scalars['Float']['output'];
  effectiveAt: Scalars['String']['output'];
  from: Scalars['String']['output'];
  portionOfPeriod: Scalars['Float']['output'];
  timePolicyAllocationId: Scalars['ID']['output'];
  to: Scalars['String']['output'];
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
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

export type CompleteOnboardingInput = {
  allowAutojoinForDomain: Scalars['Boolean']['input'];
  locationDefaults: LocationDefaultsInput;
  orgName: Scalars['String']['input'];
};

export type CompleteOnboardingPayload = {
  __typename?: 'CompleteOnboardingPayload';
  locationId: Scalars['ID']['output'];
  orgId: Scalars['ID']['output'];
  policyIds: Array<Scalars['ID']['output']>;
  timeTypeIds: Array<Scalars['ID']['output']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
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

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type Holiday = {
  __typename?: 'Holiday';
  date: Scalars['String']['output'];
  title: Scalars['String']['output'];
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

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type Location = {
  __typename?: 'Location';
  holidayCountry?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  org?: Maybe<Organization>;
  timePolicies?: Maybe<Array<TimePolicy>>;
  timePoliciesCount?: Maybe<Scalars['Int']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
  weekStartDay?: Maybe<LocationWeekStartDayType>;
  workingDays?: Maybe<Array<LocationWorkingDayType>>;
};


export type LocationTimePoliciesArgs = {
  cursor?: InputMaybe<TimePolicyWhereUniqueInput>;
  orderBy?: Array<TimePolicyOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePolicyWhereInput;
};


export type LocationTimePoliciesCountArgs = {
  where?: TimePolicyWhereInput;
};


export type LocationUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type LocationUsersCountArgs = {
  where?: UserWhereInput;
};

export type LocationCreateInput = {
  holidayCountry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  timePolicies?: InputMaybe<TimePolicyRelateToManyForCreateInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<UserRelateToManyForCreateInput>;
  weekStartDay?: InputMaybe<LocationWeekStartDayType>;
  workingDays?: InputMaybe<Array<LocationWorkingDayType>>;
};

export type LocationDefaultsInput = {
  holidayCountry: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
  weekStartDay: LocationWeekStartDayType;
  workingDays: Array<LocationWorkingDayType>;
};

export type LocationManyRelationFilter = {
  every?: InputMaybe<LocationWhereInput>;
  none?: InputMaybe<LocationWhereInput>;
  some?: InputMaybe<LocationWhereInput>;
};

export type LocationOrderByInput = {
  holidayCountry?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  timezone?: InputMaybe<OrderDirection>;
  weekStartDay?: InputMaybe<OrderDirection>;
};

export type LocationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<LocationWhereUniqueInput>>;
  create?: InputMaybe<Array<LocationCreateInput>>;
};

export type LocationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<LocationWhereUniqueInput>>;
  create?: InputMaybe<Array<LocationCreateInput>>;
  disconnect?: InputMaybe<Array<LocationWhereUniqueInput>>;
  set?: InputMaybe<Array<LocationWhereUniqueInput>>;
};

export type LocationRelateToOneForCreateInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  create?: InputMaybe<LocationCreateInput>;
};

export type LocationRelateToOneForUpdateInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  create?: InputMaybe<LocationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LocationUpdateArgs = {
  data: LocationUpdateInput;
  where: LocationWhereUniqueInput;
};

export type LocationUpdateInput = {
  holidayCountry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  timePolicies?: InputMaybe<TimePolicyRelateToManyForUpdateInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
  weekStartDay?: InputMaybe<LocationWeekStartDayType>;
  workingDays?: InputMaybe<Array<LocationWorkingDayType>>;
};

export enum LocationWeekStartDayType {
  Fri = 'FRI',
  Mon = 'MON',
  Sat = 'SAT',
  Sun = 'SUN',
  Thu = 'THU',
  Tue = 'TUE',
  Wed = 'WED'
}

export type LocationWeekStartDayTypeNullableFilter = {
  equals?: InputMaybe<LocationWeekStartDayType>;
  in?: InputMaybe<Array<LocationWeekStartDayType>>;
  not?: InputMaybe<LocationWeekStartDayTypeNullableFilter>;
  notIn?: InputMaybe<Array<LocationWeekStartDayType>>;
};

export type LocationWhereInput = {
  AND?: InputMaybe<Array<LocationWhereInput>>;
  NOT?: InputMaybe<Array<LocationWhereInput>>;
  OR?: InputMaybe<Array<LocationWhereInput>>;
  holidayCountry?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  timePolicies?: InputMaybe<TimePolicyManyRelationFilter>;
  timezone?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<UserManyRelationFilter>;
  weekStartDay?: InputMaybe<LocationWeekStartDayTypeNullableFilter>;
};

export type LocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum LocationWorkingDayType {
  Fri = 'FRI',
  Mon = 'MON',
  Sat = 'SAT',
  Sun = 'SUN',
  Thu = 'THU',
  Tue = 'TUE',
  Wed = 'WED'
}

export type Mutation = {
  __typename?: 'Mutation';
  assignUserToPolicy: Scalars['Boolean']['output'];
  completeOnboarding: CompleteOnboardingPayload;
  createLocation?: Maybe<Location>;
  createLocations?: Maybe<Array<Maybe<Location>>>;
  createManualAllocationAdjustment?: Maybe<UserAllocationEntry>;
  createOrganization?: Maybe<Organization>;
  createOrganizations?: Maybe<Array<Maybe<Organization>>>;
  createTimePlan?: Maybe<TimePlan>;
  createTimePlanEntry: TimePlan;
  createTimePlans?: Maybe<Array<Maybe<TimePlan>>>;
  createTimePolicies?: Maybe<Array<Maybe<TimePolicy>>>;
  createTimePolicy?: Maybe<TimePolicy>;
  createTimePolicyAllocation?: Maybe<TimePolicyAllocation>;
  createTimePolicyAllocations?: Maybe<Array<Maybe<TimePolicyAllocation>>>;
  createTimePolicyWithAllocation?: Maybe<TimePolicy>;
  createTimeType?: Maybe<TimeType>;
  createTimeTypes?: Maybe<Array<Maybe<TimeType>>>;
  createUser?: Maybe<User>;
  createUserAllocation?: Maybe<UserAllocation>;
  createUserAllocations?: Maybe<Array<Maybe<UserAllocation>>>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  decideTimePlan?: Maybe<TimePlan>;
  deleteLocation?: Maybe<Location>;
  deleteLocations?: Maybe<Array<Maybe<Location>>>;
  deleteOrganization?: Maybe<Organization>;
  deleteOrganizations?: Maybe<Array<Maybe<Organization>>>;
  deleteTimePlan?: Maybe<TimePlan>;
  deleteTimePlanEntry: Scalars['Boolean']['output'];
  deleteTimePlans?: Maybe<Array<Maybe<TimePlan>>>;
  deleteTimePolicies?: Maybe<Array<Maybe<TimePolicy>>>;
  deleteTimePolicy?: Maybe<TimePolicy>;
  deleteTimePolicyAllocation?: Maybe<TimePolicyAllocation>;
  deleteTimePolicyAllocations?: Maybe<Array<Maybe<TimePolicyAllocation>>>;
  deleteTimeType?: Maybe<TimeType>;
  deleteTimeTypes?: Maybe<Array<Maybe<TimeType>>>;
  deleteUser?: Maybe<User>;
  deleteUserAllocation?: Maybe<UserAllocation>;
  deleteUserAllocations?: Maybe<Array<Maybe<UserAllocation>>>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  requestTimePlan?: Maybe<TimePlan>;
  updateLocation?: Maybe<Location>;
  updateLocations?: Maybe<Array<Maybe<Location>>>;
  updateOrganization?: Maybe<Organization>;
  updateOrganizations?: Maybe<Array<Maybe<Organization>>>;
  updateTimePlan?: Maybe<TimePlan>;
  updateTimePlanEntry: TimePlan;
  updateTimePlans?: Maybe<Array<Maybe<TimePlan>>>;
  updateTimePolicies?: Maybe<Array<Maybe<TimePolicy>>>;
  updateTimePolicy?: Maybe<TimePolicy>;
  updateTimePolicyAllocation?: Maybe<TimePolicyAllocation>;
  updateTimePolicyAllocations?: Maybe<Array<Maybe<TimePolicyAllocation>>>;
  updateTimePolicyWithAllocation?: Maybe<TimePolicy>;
  updateTimeType?: Maybe<TimeType>;
  updateTimeTypes?: Maybe<Array<Maybe<TimeType>>>;
  updateUser?: Maybe<User>;
  updateUserAllocation?: Maybe<UserAllocation>;
  updateUserAllocations?: Maybe<Array<Maybe<UserAllocation>>>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAssignUserToPolicyArgs = {
  applyConfig?: InputMaybe<Scalars['Boolean']['input']>;
  policyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCompleteOnboardingArgs = {
  input: CompleteOnboardingInput;
};


export type MutationCreateLocationArgs = {
  data: LocationCreateInput;
};


export type MutationCreateLocationsArgs = {
  data: Array<LocationCreateInput>;
};


export type MutationCreateManualAllocationAdjustmentArgs = {
  amount: Scalars['Int']['input'];
  effectiveAt: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  timePolicyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateOrganizationArgs = {
  data: OrganizationCreateInput;
};


export type MutationCreateOrganizationsArgs = {
  data: Array<OrganizationCreateInput>;
};


export type MutationCreateTimePlanArgs = {
  data: TimePlanCreateInput;
};


export type MutationCreateTimePlanEntryArgs = {
  input: TimePlanEntryInput;
};


export type MutationCreateTimePlansArgs = {
  data: Array<TimePlanCreateInput>;
};


export type MutationCreateTimePoliciesArgs = {
  data: Array<TimePolicyCreateInput>;
};


export type MutationCreateTimePolicyArgs = {
  data: TimePolicyCreateInput;
};


export type MutationCreateTimePolicyAllocationArgs = {
  data: TimePolicyAllocationCreateInput;
};


export type MutationCreateTimePolicyAllocationsArgs = {
  data: Array<TimePolicyAllocationCreateInput>;
};


export type MutationCreateTimePolicyWithAllocationArgs = {
  allocationConfig?: InputMaybe<TimePolicyAllocationRulesInput>;
  data: TimePolicyMutationInput;
};


export type MutationCreateTimeTypeArgs = {
  data: TimeTypeCreateInput;
};


export type MutationCreateTimeTypesArgs = {
  data: Array<TimeTypeCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserAllocationArgs = {
  data: UserAllocationCreateInput;
};


export type MutationCreateUserAllocationsArgs = {
  data: Array<UserAllocationCreateInput>;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDecideTimePlanArgs = {
  decision: TimePlanStatusType;
  timePlanId: Scalars['ID']['input'];
};


export type MutationDeleteLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type MutationDeleteLocationsArgs = {
  where: Array<LocationWhereUniqueInput>;
};


export type MutationDeleteOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
};


export type MutationDeleteOrganizationsArgs = {
  where: Array<OrganizationWhereUniqueInput>;
};


export type MutationDeleteTimePlanArgs = {
  where: TimePlanWhereUniqueInput;
};


export type MutationDeleteTimePlanEntryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTimePlansArgs = {
  where: Array<TimePlanWhereUniqueInput>;
};


export type MutationDeleteTimePoliciesArgs = {
  where: Array<TimePolicyWhereUniqueInput>;
};


export type MutationDeleteTimePolicyArgs = {
  where: TimePolicyWhereUniqueInput;
};


export type MutationDeleteTimePolicyAllocationArgs = {
  where: TimePolicyAllocationWhereUniqueInput;
};


export type MutationDeleteTimePolicyAllocationsArgs = {
  where: Array<TimePolicyAllocationWhereUniqueInput>;
};


export type MutationDeleteTimeTypeArgs = {
  where: TimeTypeWhereUniqueInput;
};


export type MutationDeleteTimeTypesArgs = {
  where: Array<TimeTypeWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUserAllocationArgs = {
  where: UserAllocationWhereUniqueInput;
};


export type MutationDeleteUserAllocationsArgs = {
  where: Array<UserAllocationWhereUniqueInput>;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationRequestTimePlanArgs = {
  endDateTime: Scalars['String']['input'];
  isHalfDay?: InputMaybe<Scalars['Boolean']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  startDateTime: Scalars['String']['input'];
  timeTypeId: Scalars['ID']['input'];
};


export type MutationUpdateLocationArgs = {
  data: LocationUpdateInput;
  where: LocationWhereUniqueInput;
};


export type MutationUpdateLocationsArgs = {
  data: Array<LocationUpdateArgs>;
};


export type MutationUpdateOrganizationArgs = {
  data: OrganizationUpdateInput;
  where: OrganizationWhereUniqueInput;
};


export type MutationUpdateOrganizationsArgs = {
  data: Array<OrganizationUpdateArgs>;
};


export type MutationUpdateTimePlanArgs = {
  data: TimePlanUpdateInput;
  where: TimePlanWhereUniqueInput;
};


export type MutationUpdateTimePlanEntryArgs = {
  input: TimePlanEntryUpdateInput;
};


export type MutationUpdateTimePlansArgs = {
  data: Array<TimePlanUpdateArgs>;
};


export type MutationUpdateTimePoliciesArgs = {
  data: Array<TimePolicyUpdateArgs>;
};


export type MutationUpdateTimePolicyArgs = {
  data: TimePolicyUpdateInput;
  where: TimePolicyWhereUniqueInput;
};


export type MutationUpdateTimePolicyAllocationArgs = {
  data: TimePolicyAllocationUpdateInput;
  where: TimePolicyAllocationWhereUniqueInput;
};


export type MutationUpdateTimePolicyAllocationsArgs = {
  data: Array<TimePolicyAllocationUpdateArgs>;
};


export type MutationUpdateTimePolicyWithAllocationArgs = {
  allocationConfig?: InputMaybe<TimePolicyAllocationRulesInput>;
  data: TimePolicyMutationInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTimeTypeArgs = {
  data: TimeTypeUpdateInput;
  where: TimeTypeWhereUniqueInput;
};


export type MutationUpdateTimeTypesArgs = {
  data: Array<TimeTypeUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserAllocationArgs = {
  data: UserAllocationUpdateInput;
  where: UserAllocationWhereUniqueInput;
};


export type MutationUpdateUserAllocationsArgs = {
  data: Array<UserAllocationUpdateArgs>;
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
  id: Scalars['ID']['output'];
  locations?: Maybe<Array<Location>>;
  locationsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  timePolicies?: Maybe<Array<TimePolicy>>;
  timePoliciesCount?: Maybe<Scalars['Int']['output']>;
  timeTypes?: Maybe<Array<TimeType>>;
  timeTypesCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type OrganizationLocationsArgs = {
  cursor?: InputMaybe<LocationWhereUniqueInput>;
  orderBy?: Array<LocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LocationWhereInput;
};


export type OrganizationLocationsCountArgs = {
  where?: LocationWhereInput;
};


export type OrganizationTimePoliciesArgs = {
  cursor?: InputMaybe<TimePolicyWhereUniqueInput>;
  orderBy?: Array<TimePolicyOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePolicyWhereInput;
};


export type OrganizationTimePoliciesCountArgs = {
  where?: TimePolicyWhereInput;
};


export type OrganizationTimeTypesArgs = {
  cursor?: InputMaybe<TimeTypeWhereUniqueInput>;
  orderBy?: Array<TimeTypeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimeTypeWhereInput;
};


export type OrganizationTimeTypesCountArgs = {
  where?: TimeTypeWhereInput;
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
  locations?: InputMaybe<LocationRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  timePolicies?: InputMaybe<TimePolicyRelateToManyForCreateInput>;
  timeTypes?: InputMaybe<TimeTypeRelateToManyForCreateInput>;
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
  locations?: InputMaybe<LocationRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  timePolicies?: InputMaybe<TimePolicyRelateToManyForUpdateInput>;
  timeTypes?: InputMaybe<TimeTypeRelateToManyForUpdateInput>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type OrganizationWhereInput = {
  AND?: InputMaybe<Array<OrganizationWhereInput>>;
  NOT?: InputMaybe<Array<OrganizationWhereInput>>;
  OR?: InputMaybe<Array<OrganizationWhereInput>>;
  id?: InputMaybe<IdFilter>;
  locations?: InputMaybe<LocationManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
  timePolicies?: InputMaybe<TimePolicyManyRelationFilter>;
  timeTypes?: InputMaybe<TimeTypeManyRelationFilter>;
  users?: InputMaybe<UserManyRelationFilter>;
};

export type OrganizationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PendingTimePlanApproval = {
  __typename?: 'PendingTimePlanApproval';
  sortKey: Scalars['Float']['output'];
  timePlan?: Maybe<TimePlan>;
};

export type Query = {
  __typename?: 'Query';
  getTimePlans?: Maybe<Array<TimePlan>>;
  holidays?: Maybe<Array<Holiday>>;
  keystone: KeystoneMeta;
  location?: Maybe<Location>;
  locations?: Maybe<Array<Location>>;
  locationsCount?: Maybe<Scalars['Int']['output']>;
  organization?: Maybe<Organization>;
  organizations?: Maybe<Array<Organization>>;
  organizationsCount?: Maybe<Scalars['Int']['output']>;
  pendingTimePlanApprovals: Array<PendingTimePlanApproval>;
  timePlan?: Maybe<TimePlan>;
  timePlans?: Maybe<Array<TimePlan>>;
  timePlansCount?: Maybe<Scalars['Int']['output']>;
  timePolicies?: Maybe<Array<TimePolicy>>;
  timePoliciesCount?: Maybe<Scalars['Int']['output']>;
  timePolicy?: Maybe<TimePolicy>;
  timePolicyAllocation?: Maybe<TimePolicyAllocation>;
  timePolicyAllocationHistory?: Maybe<Array<TimePolicyAllocationHistoryEntry>>;
  timePolicyAllocations?: Maybe<Array<TimePolicyAllocation>>;
  timePolicyAllocationsCount?: Maybe<Scalars['Int']['output']>;
  timeType?: Maybe<TimeType>;
  timeTypes?: Maybe<Array<TimeType>>;
  timeTypesCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  userAllocation?: Maybe<UserAllocation>;
  userAllocationBalance?: Maybe<UserAllocationBalance>;
  userAllocationEventLog?: Maybe<Array<UserAllocationEntry>>;
  userAllocations?: Maybe<Array<UserAllocation>>;
  userAllocationsCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryGetTimePlansArgs = {
  end: Scalars['String']['input'];
  start: Scalars['String']['input'];
};


export type QueryHolidaysArgs = {
  end: Scalars['String']['input'];
  locationId: Scalars['ID']['input'];
  start: Scalars['String']['input'];
};


export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryLocationsArgs = {
  cursor?: InputMaybe<LocationWhereUniqueInput>;
  orderBy?: Array<LocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LocationWhereInput;
};


export type QueryLocationsCountArgs = {
  where?: LocationWhereInput;
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


export type QueryTimePlanArgs = {
  where: TimePlanWhereUniqueInput;
};


export type QueryTimePlansArgs = {
  cursor?: InputMaybe<TimePlanWhereUniqueInput>;
  orderBy?: Array<TimePlanOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePlanWhereInput;
};


export type QueryTimePlansCountArgs = {
  where?: TimePlanWhereInput;
};


export type QueryTimePoliciesArgs = {
  cursor?: InputMaybe<TimePolicyWhereUniqueInput>;
  orderBy?: Array<TimePolicyOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePolicyWhereInput;
};


export type QueryTimePoliciesCountArgs = {
  where?: TimePolicyWhereInput;
};


export type QueryTimePolicyArgs = {
  where: TimePolicyWhereUniqueInput;
};


export type QueryTimePolicyAllocationArgs = {
  where: TimePolicyAllocationWhereUniqueInput;
};


export type QueryTimePolicyAllocationHistoryArgs = {
  timePolicyId: Scalars['ID']['input'];
};


export type QueryTimePolicyAllocationsArgs = {
  cursor?: InputMaybe<TimePolicyAllocationWhereUniqueInput>;
  orderBy?: Array<TimePolicyAllocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePolicyAllocationWhereInput;
};


export type QueryTimePolicyAllocationsCountArgs = {
  where?: TimePolicyAllocationWhereInput;
};


export type QueryTimeTypeArgs = {
  where: TimeTypeWhereUniqueInput;
};


export type QueryTimeTypesArgs = {
  cursor?: InputMaybe<TimeTypeWhereUniqueInput>;
  orderBy?: Array<TimeTypeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimeTypeWhereInput;
};


export type QueryTimeTypesCountArgs = {
  where?: TimeTypeWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserAllocationArgs = {
  where: UserAllocationWhereUniqueInput;
};


export type QueryUserAllocationBalanceArgs = {
  timePolicyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  year: Scalars['Int']['input'];
};


export type QueryUserAllocationEventLogArgs = {
  timePolicyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserAllocationsArgs = {
  cursor?: InputMaybe<UserAllocationWhereUniqueInput>;
  orderBy?: Array<UserAllocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserAllocationWhereInput;
};


export type QueryUserAllocationsCountArgs = {
  where?: UserAllocationWhereInput;
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

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TimePlan = {
  __typename?: 'TimePlan';
  decidedAt?: Maybe<Scalars['DateTime']['output']>;
  decidedBy?: Maybe<User>;
  duration?: Maybe<Scalars['Float']['output']>;
  durationUnit?: Maybe<TimePlanDurationUnitType>;
  endAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isAllDay?: Maybe<Scalars['Boolean']['output']>;
  isRecurringInstance?: Maybe<Scalars['Boolean']['output']>;
  isRepeat?: Maybe<Scalars['Boolean']['output']>;
  occurrenceId?: Maybe<Scalars['String']['output']>;
  org?: Maybe<Organization>;
  origin?: Maybe<TimePlanOriginType>;
  reason?: Maybe<Scalars['String']['output']>;
  repeatDay?: Maybe<Scalars['Int']['output']>;
  repeatDayOfWeek?: Maybe<TimePlanRepeatDayOfWeek>;
  repeatExceptions?: Maybe<Array<TimePlan>>;
  repeatExceptionsCount?: Maybe<Scalars['Int']['output']>;
  repeatInterval?: Maybe<Scalars['Int']['output']>;
  repeatMode?: Maybe<TimePlanRepeatModeType>;
  repeatOrigin?: Maybe<TimePlan>;
  rrule?: Maybe<Scalars['String']['output']>;
  rruleExDates?: Maybe<Array<Scalars['String']['output']>>;
  rruleExceptionDates?: Maybe<Array<Scalars['String']['output']>>;
  seriesId?: Maybe<Scalars['ID']['output']>;
  startAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<TimePlanStatusType>;
  timePolicy?: Maybe<TimePolicy>;
  timeType?: Maybe<TimeType>;
  user?: Maybe<User>;
};


export type TimePlanRepeatExceptionsArgs = {
  cursor?: InputMaybe<TimePlanWhereUniqueInput>;
  orderBy?: Array<TimePlanOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePlanWhereInput;
};


export type TimePlanRepeatExceptionsCountArgs = {
  where?: TimePlanWhereInput;
};

export type TimePlanCreateInput = {
  decidedAt?: InputMaybe<Scalars['DateTime']['input']>;
  decidedBy?: InputMaybe<UserRelateToOneForCreateInput>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  durationUnit?: InputMaybe<TimePlanDurationUnitType>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  isAllDay?: InputMaybe<Scalars['Boolean']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  origin?: InputMaybe<TimePlanOriginType>;
  reason?: InputMaybe<Scalars['String']['input']>;
  repeatDay?: InputMaybe<Scalars['Int']['input']>;
  repeatExceptions?: InputMaybe<TimePlanRelateToManyForCreateInput>;
  repeatInterval?: InputMaybe<Scalars['Int']['input']>;
  repeatMode?: InputMaybe<TimePlanRepeatModeType>;
  repeatOrigin?: InputMaybe<TimePlanRelateToOneForCreateInput>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<TimePlanStatusType>;
  timePolicy?: InputMaybe<TimePolicyRelateToOneForCreateInput>;
  timeType?: InputMaybe<TimeTypeRelateToOneForCreateInput>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export enum TimePlanDurationUnitType {
  Day = 'DAY',
  Hour = 'HOUR'
}

export type TimePlanDurationUnitTypeNullableFilter = {
  equals?: InputMaybe<TimePlanDurationUnitType>;
  in?: InputMaybe<Array<TimePlanDurationUnitType>>;
  not?: InputMaybe<TimePlanDurationUnitTypeNullableFilter>;
  notIn?: InputMaybe<Array<TimePlanDurationUnitType>>;
};

export type TimePlanEntryInput = {
  endDateTime?: InputMaybe<Scalars['String']['input']>;
  isHalfDay?: InputMaybe<Scalars['Boolean']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  repeatDay?: InputMaybe<Scalars['Int']['input']>;
  repeatEndsOn?: InputMaybe<Scalars['String']['input']>;
  repeatInterval?: InputMaybe<Scalars['Int']['input']>;
  repeatMode?: InputMaybe<TimePlanRepeatModeType>;
  startDateTime?: InputMaybe<Scalars['String']['input']>;
  timeTypeId: Scalars['ID']['input'];
};

export type TimePlanEntryUpdateInput = {
  endDateTime?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isHalfDay?: InputMaybe<Scalars['Boolean']['input']>;
  occurrenceId?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  repeatDay?: InputMaybe<Scalars['Int']['input']>;
  repeatEndsOn?: InputMaybe<Scalars['String']['input']>;
  repeatInterval?: InputMaybe<Scalars['Int']['input']>;
  repeatMode?: InputMaybe<TimePlanRepeatModeType>;
  startDateTime?: InputMaybe<Scalars['String']['input']>;
  timeTypeId?: InputMaybe<Scalars['ID']['input']>;
  updateScope?: InputMaybe<TimePlanUpdateScopeType>;
};

export type TimePlanManyRelationFilter = {
  every?: InputMaybe<TimePlanWhereInput>;
  none?: InputMaybe<TimePlanWhereInput>;
  some?: InputMaybe<TimePlanWhereInput>;
};

export type TimePlanOrderByInput = {
  decidedAt?: InputMaybe<OrderDirection>;
  duration?: InputMaybe<OrderDirection>;
  durationUnit?: InputMaybe<OrderDirection>;
  endAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAllDay?: InputMaybe<OrderDirection>;
  origin?: InputMaybe<OrderDirection>;
  reason?: InputMaybe<OrderDirection>;
  repeatDay?: InputMaybe<OrderDirection>;
  repeatInterval?: InputMaybe<OrderDirection>;
  repeatMode?: InputMaybe<OrderDirection>;
  startAt?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export enum TimePlanOriginType {
  Direct = 'DIRECT',
  RepeaterException = 'REPEATER_EXCEPTION'
}

export type TimePlanOriginTypeNullableFilter = {
  equals?: InputMaybe<TimePlanOriginType>;
  in?: InputMaybe<Array<TimePlanOriginType>>;
  not?: InputMaybe<TimePlanOriginTypeNullableFilter>;
  notIn?: InputMaybe<Array<TimePlanOriginType>>;
};

export type TimePlanRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TimePlanWhereUniqueInput>>;
  create?: InputMaybe<Array<TimePlanCreateInput>>;
};

export type TimePlanRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TimePlanWhereUniqueInput>>;
  create?: InputMaybe<Array<TimePlanCreateInput>>;
  disconnect?: InputMaybe<Array<TimePlanWhereUniqueInput>>;
  set?: InputMaybe<Array<TimePlanWhereUniqueInput>>;
};

export type TimePlanRelateToOneForCreateInput = {
  connect?: InputMaybe<TimePlanWhereUniqueInput>;
  create?: InputMaybe<TimePlanCreateInput>;
};

export type TimePlanRelateToOneForUpdateInput = {
  connect?: InputMaybe<TimePlanWhereUniqueInput>;
  create?: InputMaybe<TimePlanCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum TimePlanRepeatDayOfWeek {
  Fri = 'FRI',
  Mon = 'MON',
  Sat = 'SAT',
  Sun = 'SUN',
  Thu = 'THU',
  Tue = 'TUE',
  Wed = 'WED'
}

export enum TimePlanRepeatModeType {
  MonthlyBusiness = 'MONTHLY_BUSINESS',
  MonthlyCalendar = 'MONTHLY_CALENDAR',
  Single = 'SINGLE',
  Weekly = 'WEEKLY'
}

export type TimePlanRepeatModeTypeNullableFilter = {
  equals?: InputMaybe<TimePlanRepeatModeType>;
  in?: InputMaybe<Array<TimePlanRepeatModeType>>;
  not?: InputMaybe<TimePlanRepeatModeTypeNullableFilter>;
  notIn?: InputMaybe<Array<TimePlanRepeatModeType>>;
};

export enum TimePlanStatusType {
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type TimePlanStatusTypeNullableFilter = {
  equals?: InputMaybe<TimePlanStatusType>;
  in?: InputMaybe<Array<TimePlanStatusType>>;
  not?: InputMaybe<TimePlanStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<TimePlanStatusType>>;
};

export type TimePlanUpdateArgs = {
  data: TimePlanUpdateInput;
  where: TimePlanWhereUniqueInput;
};

export type TimePlanUpdateInput = {
  decidedAt?: InputMaybe<Scalars['DateTime']['input']>;
  decidedBy?: InputMaybe<UserRelateToOneForUpdateInput>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  durationUnit?: InputMaybe<TimePlanDurationUnitType>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  isAllDay?: InputMaybe<Scalars['Boolean']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  origin?: InputMaybe<TimePlanOriginType>;
  reason?: InputMaybe<Scalars['String']['input']>;
  repeatDay?: InputMaybe<Scalars['Int']['input']>;
  repeatExceptions?: InputMaybe<TimePlanRelateToManyForUpdateInput>;
  repeatInterval?: InputMaybe<Scalars['Int']['input']>;
  repeatMode?: InputMaybe<TimePlanRepeatModeType>;
  repeatOrigin?: InputMaybe<TimePlanRelateToOneForUpdateInput>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<TimePlanStatusType>;
  timePolicy?: InputMaybe<TimePolicyRelateToOneForUpdateInput>;
  timeType?: InputMaybe<TimeTypeRelateToOneForUpdateInput>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export enum TimePlanUpdateScopeType {
  All = 'ALL',
  This = 'THIS',
  ThisAndFuture = 'THIS_AND_FUTURE'
}

export type TimePlanWhereInput = {
  AND?: InputMaybe<Array<TimePlanWhereInput>>;
  NOT?: InputMaybe<Array<TimePlanWhereInput>>;
  OR?: InputMaybe<Array<TimePlanWhereInput>>;
  decidedAt?: InputMaybe<DateTimeNullableFilter>;
  decidedBy?: InputMaybe<UserWhereInput>;
  duration?: InputMaybe<FloatNullableFilter>;
  durationUnit?: InputMaybe<TimePlanDurationUnitTypeNullableFilter>;
  endAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isAllDay?: InputMaybe<BooleanFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  origin?: InputMaybe<TimePlanOriginTypeNullableFilter>;
  reason?: InputMaybe<StringFilter>;
  repeatDay?: InputMaybe<IntNullableFilter>;
  repeatExceptions?: InputMaybe<TimePlanManyRelationFilter>;
  repeatInterval?: InputMaybe<IntNullableFilter>;
  repeatMode?: InputMaybe<TimePlanRepeatModeTypeNullableFilter>;
  repeatOrigin?: InputMaybe<TimePlanWhereInput>;
  startAt?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<TimePlanStatusTypeNullableFilter>;
  timePolicy?: InputMaybe<TimePolicyWhereInput>;
  timeType?: InputMaybe<TimeTypeWhereInput>;
  user?: InputMaybe<UserWhereInput>;
};

export type TimePlanWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TimePolicy = {
  __typename?: 'TimePolicy';
  allocations?: Maybe<Array<UserAllocation>>;
  allocationsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isAllocationManaged?: Maybe<Scalars['Boolean']['output']>;
  isApprovable?: Maybe<Scalars['Boolean']['output']>;
  locations?: Maybe<Array<Location>>;
  locationsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  org?: Maybe<Organization>;
  timePlans?: Maybe<Array<TimePlan>>;
  timePlansCount?: Maybe<Scalars['Int']['output']>;
  timePolicyAllocations?: Maybe<Array<TimePolicyAllocation>>;
  timePolicyAllocationsCount?: Maybe<Scalars['Int']['output']>;
  timeType?: Maybe<TimeType>;
};


export type TimePolicyAllocationsArgs = {
  cursor?: InputMaybe<UserAllocationWhereUniqueInput>;
  orderBy?: Array<UserAllocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserAllocationWhereInput;
};


export type TimePolicyAllocationsCountArgs = {
  where?: UserAllocationWhereInput;
};


export type TimePolicyLocationsArgs = {
  cursor?: InputMaybe<LocationWhereUniqueInput>;
  orderBy?: Array<LocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LocationWhereInput;
};


export type TimePolicyLocationsCountArgs = {
  where?: LocationWhereInput;
};


export type TimePolicyTimePlansArgs = {
  cursor?: InputMaybe<TimePlanWhereUniqueInput>;
  orderBy?: Array<TimePlanOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePlanWhereInput;
};


export type TimePolicyTimePlansCountArgs = {
  where?: TimePlanWhereInput;
};


export type TimePolicyTimePolicyAllocationsArgs = {
  cursor?: InputMaybe<TimePolicyAllocationWhereUniqueInput>;
  orderBy?: Array<TimePolicyAllocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePolicyAllocationWhereInput;
};


export type TimePolicyTimePolicyAllocationsCountArgs = {
  where?: TimePolicyAllocationWhereInput;
};

export type TimePolicyAllocation = {
  __typename?: 'TimePolicyAllocation';
  allocation?: Maybe<Scalars['Int']['output']>;
  carryoverLimit?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  effectiveAt?: Maybe<Scalars['DateTime']['output']>;
  events?: Maybe<Array<UserAllocation>>;
  eventsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  overdraftLimit?: Maybe<Scalars['Int']['output']>;
  timePolicy?: Maybe<TimePolicy>;
};


export type TimePolicyAllocationEventsArgs = {
  cursor?: InputMaybe<UserAllocationWhereUniqueInput>;
  orderBy?: Array<UserAllocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserAllocationWhereInput;
};


export type TimePolicyAllocationEventsCountArgs = {
  where?: UserAllocationWhereInput;
};

export type TimePolicyAllocationCreateInput = {
  allocation?: InputMaybe<Scalars['Int']['input']>;
  carryoverLimit?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>;
  effectiveAt?: InputMaybe<Scalars['DateTime']['input']>;
  events?: InputMaybe<UserAllocationRelateToManyForCreateInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  overdraftLimit?: InputMaybe<Scalars['Int']['input']>;
  timePolicy?: InputMaybe<TimePolicyRelateToOneForCreateInput>;
};

export type TimePolicyAllocationHistoryEntry = {
  __typename?: 'TimePolicyAllocationHistoryEntry';
  allocation: Scalars['Float']['output'];
  carryoverLimit: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  effectiveAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  overdraftLimit: Scalars['Float']['output'];
};

export type TimePolicyAllocationManyRelationFilter = {
  every?: InputMaybe<TimePolicyAllocationWhereInput>;
  none?: InputMaybe<TimePolicyAllocationWhereInput>;
  some?: InputMaybe<TimePolicyAllocationWhereInput>;
};

export type TimePolicyAllocationOrderByInput = {
  allocation?: InputMaybe<OrderDirection>;
  carryoverLimit?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  effectiveAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  notes?: InputMaybe<OrderDirection>;
  overdraftLimit?: InputMaybe<OrderDirection>;
};

export type TimePolicyAllocationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TimePolicyAllocationWhereUniqueInput>>;
  create?: InputMaybe<Array<TimePolicyAllocationCreateInput>>;
};

export type TimePolicyAllocationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TimePolicyAllocationWhereUniqueInput>>;
  create?: InputMaybe<Array<TimePolicyAllocationCreateInput>>;
  disconnect?: InputMaybe<Array<TimePolicyAllocationWhereUniqueInput>>;
  set?: InputMaybe<Array<TimePolicyAllocationWhereUniqueInput>>;
};

export type TimePolicyAllocationRelateToOneForCreateInput = {
  connect?: InputMaybe<TimePolicyAllocationWhereUniqueInput>;
  create?: InputMaybe<TimePolicyAllocationCreateInput>;
};

export type TimePolicyAllocationRelateToOneForUpdateInput = {
  connect?: InputMaybe<TimePolicyAllocationWhereUniqueInput>;
  create?: InputMaybe<TimePolicyAllocationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TimePolicyAllocationRulesInput = {
  allocation: Scalars['Int']['input'];
  carryoverLimit: Scalars['Int']['input'];
  effectiveAt?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  overdraftLimit: Scalars['Int']['input'];
};

export type TimePolicyAllocationUpdateArgs = {
  data: TimePolicyAllocationUpdateInput;
  where: TimePolicyAllocationWhereUniqueInput;
};

export type TimePolicyAllocationUpdateInput = {
  allocation?: InputMaybe<Scalars['Int']['input']>;
  carryoverLimit?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>;
  effectiveAt?: InputMaybe<Scalars['DateTime']['input']>;
  events?: InputMaybe<UserAllocationRelateToManyForUpdateInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  overdraftLimit?: InputMaybe<Scalars['Int']['input']>;
  timePolicy?: InputMaybe<TimePolicyRelateToOneForUpdateInput>;
};

export type TimePolicyAllocationWhereInput = {
  AND?: InputMaybe<Array<TimePolicyAllocationWhereInput>>;
  NOT?: InputMaybe<Array<TimePolicyAllocationWhereInput>>;
  OR?: InputMaybe<Array<TimePolicyAllocationWhereInput>>;
  allocation?: InputMaybe<IntFilter>;
  carryoverLimit?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  effectiveAt?: InputMaybe<DateTimeFilter>;
  events?: InputMaybe<UserAllocationManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  notes?: InputMaybe<StringFilter>;
  overdraftLimit?: InputMaybe<IntFilter>;
  timePolicy?: InputMaybe<TimePolicyWhereInput>;
};

export type TimePolicyAllocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TimePolicyCreateInput = {
  allocations?: InputMaybe<UserAllocationRelateToManyForCreateInput>;
  isAllocationManaged?: InputMaybe<Scalars['Boolean']['input']>;
  isApprovable?: InputMaybe<Scalars['Boolean']['input']>;
  locations?: InputMaybe<LocationRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  timePlans?: InputMaybe<TimePlanRelateToManyForCreateInput>;
  timePolicyAllocations?: InputMaybe<TimePolicyAllocationRelateToManyForCreateInput>;
  timeType?: InputMaybe<TimeTypeRelateToOneForCreateInput>;
};

export type TimePolicyManyRelationFilter = {
  every?: InputMaybe<TimePolicyWhereInput>;
  none?: InputMaybe<TimePolicyWhereInput>;
  some?: InputMaybe<TimePolicyWhereInput>;
};

export type TimePolicyMutationInput = {
  isAllocationManaged?: InputMaybe<Scalars['Boolean']['input']>;
  locationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  timeTypeId?: InputMaybe<Scalars['ID']['input']>;
};

export type TimePolicyOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  isAllocationManaged?: InputMaybe<OrderDirection>;
  isApprovable?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TimePolicyRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TimePolicyWhereUniqueInput>>;
  create?: InputMaybe<Array<TimePolicyCreateInput>>;
};

export type TimePolicyRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TimePolicyWhereUniqueInput>>;
  create?: InputMaybe<Array<TimePolicyCreateInput>>;
  disconnect?: InputMaybe<Array<TimePolicyWhereUniqueInput>>;
  set?: InputMaybe<Array<TimePolicyWhereUniqueInput>>;
};

export type TimePolicyRelateToOneForCreateInput = {
  connect?: InputMaybe<TimePolicyWhereUniqueInput>;
  create?: InputMaybe<TimePolicyCreateInput>;
};

export type TimePolicyRelateToOneForUpdateInput = {
  connect?: InputMaybe<TimePolicyWhereUniqueInput>;
  create?: InputMaybe<TimePolicyCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TimePolicyUpdateArgs = {
  data: TimePolicyUpdateInput;
  where: TimePolicyWhereUniqueInput;
};

export type TimePolicyUpdateInput = {
  allocations?: InputMaybe<UserAllocationRelateToManyForUpdateInput>;
  isAllocationManaged?: InputMaybe<Scalars['Boolean']['input']>;
  isApprovable?: InputMaybe<Scalars['Boolean']['input']>;
  locations?: InputMaybe<LocationRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  timePlans?: InputMaybe<TimePlanRelateToManyForUpdateInput>;
  timePolicyAllocations?: InputMaybe<TimePolicyAllocationRelateToManyForUpdateInput>;
  timeType?: InputMaybe<TimeTypeRelateToOneForUpdateInput>;
};

export type TimePolicyWhereInput = {
  AND?: InputMaybe<Array<TimePolicyWhereInput>>;
  NOT?: InputMaybe<Array<TimePolicyWhereInput>>;
  OR?: InputMaybe<Array<TimePolicyWhereInput>>;
  allocations?: InputMaybe<UserAllocationManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  isAllocationManaged?: InputMaybe<BooleanFilter>;
  isApprovable?: InputMaybe<BooleanFilter>;
  locations?: InputMaybe<LocationManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  timePlans?: InputMaybe<TimePlanManyRelationFilter>;
  timePolicyAllocations?: InputMaybe<TimePolicyAllocationManyRelationFilter>;
  timeType?: InputMaybe<TimeTypeWhereInput>;
};

export type TimePolicyWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TimeType = {
  __typename?: 'TimeType';
  color?: Maybe<TimeTypeColorType>;
  icon?: Maybe<TimeTypeIconType>;
  id: Scalars['ID']['output'];
  isAway?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  org?: Maybe<Organization>;
  timePlans?: Maybe<Array<TimePlan>>;
  timePlansCount?: Maybe<Scalars['Int']['output']>;
  timePolicies?: Maybe<Array<TimePolicy>>;
  timePoliciesCount?: Maybe<Scalars['Int']['output']>;
};


export type TimeTypeTimePlansArgs = {
  cursor?: InputMaybe<TimePlanWhereUniqueInput>;
  orderBy?: Array<TimePlanOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePlanWhereInput;
};


export type TimeTypeTimePlansCountArgs = {
  where?: TimePlanWhereInput;
};


export type TimeTypeTimePoliciesArgs = {
  cursor?: InputMaybe<TimePolicyWhereUniqueInput>;
  orderBy?: Array<TimePolicyOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TimePolicyWhereInput;
};


export type TimeTypeTimePoliciesCountArgs = {
  where?: TimePolicyWhereInput;
};

export enum TimeTypeColorType {
  Blue = 'BLUE',
  Gray = 'GRAY',
  Green = 'GREEN',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  Teal = 'TEAL',
  Yellow = 'YELLOW'
}

export type TimeTypeColorTypeNullableFilter = {
  equals?: InputMaybe<TimeTypeColorType>;
  in?: InputMaybe<Array<TimeTypeColorType>>;
  not?: InputMaybe<TimeTypeColorTypeNullableFilter>;
  notIn?: InputMaybe<Array<TimeTypeColorType>>;
};

export type TimeTypeCreateInput = {
  color?: InputMaybe<TimeTypeColorType>;
  icon?: InputMaybe<TimeTypeIconType>;
  isAway?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  timePlans?: InputMaybe<TimePlanRelateToManyForCreateInput>;
  timePolicies?: InputMaybe<TimePolicyRelateToManyForCreateInput>;
};

export enum TimeTypeIconType {
  Baby = 'BABY',
  Beach = 'BEACH',
  Briefcase = 'BRIEFCASE',
  Calendar = 'CALENDAR',
  Dot = 'DOT',
  Home = 'HOME',
  MedicalCross = 'MEDICAL_CROSS',
  Plane = 'PLANE',
  Star = 'STAR'
}

export type TimeTypeIconTypeNullableFilter = {
  equals?: InputMaybe<TimeTypeIconType>;
  in?: InputMaybe<Array<TimeTypeIconType>>;
  not?: InputMaybe<TimeTypeIconTypeNullableFilter>;
  notIn?: InputMaybe<Array<TimeTypeIconType>>;
};

export type TimeTypeManyRelationFilter = {
  every?: InputMaybe<TimeTypeWhereInput>;
  none?: InputMaybe<TimeTypeWhereInput>;
  some?: InputMaybe<TimeTypeWhereInput>;
};

export type TimeTypeOrderByInput = {
  color?: InputMaybe<OrderDirection>;
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAway?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TimeTypeRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TimeTypeWhereUniqueInput>>;
  create?: InputMaybe<Array<TimeTypeCreateInput>>;
};

export type TimeTypeRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TimeTypeWhereUniqueInput>>;
  create?: InputMaybe<Array<TimeTypeCreateInput>>;
  disconnect?: InputMaybe<Array<TimeTypeWhereUniqueInput>>;
  set?: InputMaybe<Array<TimeTypeWhereUniqueInput>>;
};

export type TimeTypeRelateToOneForCreateInput = {
  connect?: InputMaybe<TimeTypeWhereUniqueInput>;
  create?: InputMaybe<TimeTypeCreateInput>;
};

export type TimeTypeRelateToOneForUpdateInput = {
  connect?: InputMaybe<TimeTypeWhereUniqueInput>;
  create?: InputMaybe<TimeTypeCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TimeTypeUpdateArgs = {
  data: TimeTypeUpdateInput;
  where: TimeTypeWhereUniqueInput;
};

export type TimeTypeUpdateInput = {
  color?: InputMaybe<TimeTypeColorType>;
  icon?: InputMaybe<TimeTypeIconType>;
  isAway?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  timePlans?: InputMaybe<TimePlanRelateToManyForUpdateInput>;
  timePolicies?: InputMaybe<TimePolicyRelateToManyForUpdateInput>;
};

export type TimeTypeWhereInput = {
  AND?: InputMaybe<Array<TimeTypeWhereInput>>;
  NOT?: InputMaybe<Array<TimeTypeWhereInput>>;
  OR?: InputMaybe<Array<TimeTypeWhereInput>>;
  color?: InputMaybe<TimeTypeColorTypeNullableFilter>;
  icon?: InputMaybe<TimeTypeIconTypeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isAway?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  org?: InputMaybe<OrganizationWhereInput>;
  timePlans?: InputMaybe<TimePlanManyRelationFilter>;
  timePolicies?: InputMaybe<TimePolicyManyRelationFilter>;
};

export type TimeTypeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  allocations?: Maybe<Array<UserAllocation>>;
  allocationsCount?: Maybe<Scalars['Int']['output']>;
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
  location?: Maybe<Location>;
  org?: Maybe<Organization>;
  provider?: Maybe<UserProviderType>;
  providerAccountId?: Maybe<Scalars['String']['output']>;
  provisionedAt?: Maybe<Scalars['DateTime']['output']>;
  rawAuth?: Maybe<Scalars['JSON']['output']>;
  role?: Maybe<UserRoleType>;
  seenAt?: Maybe<Scalars['DateTime']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UserAllocationsArgs = {
  cursor?: InputMaybe<UserAllocationWhereUniqueInput>;
  orderBy?: Array<UserAllocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserAllocationWhereInput;
};


export type UserAllocationsCountArgs = {
  where?: UserAllocationWhereInput;
};

export type UserAllocation = {
  __typename?: 'UserAllocation';
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  effectiveAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  timePolicy?: Maybe<TimePolicy>;
  timePolicyAllocation?: Maybe<TimePolicyAllocation>;
  type?: Maybe<UserAllocationTypeType>;
  user?: Maybe<User>;
};

export type UserAllocationBalance = {
  __typename?: 'UserAllocationBalance';
  allocationRate?: Maybe<Scalars['Float']['output']>;
  available: Scalars['Float']['output'];
  base: Scalars['Float']['output'];
  breakdown?: Maybe<Array<AllocationBreakdownSegment>>;
  carryoverIn: Scalars['Float']['output'];
  carryoverLimit?: Maybe<Scalars['Float']['output']>;
  manualAdjustments: Scalars['Float']['output'];
  overdraftLimit?: Maybe<Scalars['Float']['output']>;
  retroAdjustments: Scalars['Float']['output'];
  timePolicyAllocationId?: Maybe<Scalars['ID']['output']>;
  used: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type UserAllocationCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>;
  effectiveAt?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  timePolicy?: InputMaybe<TimePolicyRelateToOneForCreateInput>;
  timePolicyAllocation?: InputMaybe<TimePolicyAllocationRelateToOneForCreateInput>;
  type?: InputMaybe<UserAllocationTypeType>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type UserAllocationEntry = {
  __typename?: 'UserAllocationEntry';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  effectiveAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  timePolicyAllocationId?: Maybe<Scalars['ID']['output']>;
  type: Scalars['String']['output'];
};

export type UserAllocationManyRelationFilter = {
  every?: InputMaybe<UserAllocationWhereInput>;
  none?: InputMaybe<UserAllocationWhereInput>;
  some?: InputMaybe<UserAllocationWhereInput>;
};

export type UserAllocationOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  effectiveAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  notes?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type UserAllocationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserAllocationWhereUniqueInput>>;
  create?: InputMaybe<Array<UserAllocationCreateInput>>;
};

export type UserAllocationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserAllocationWhereUniqueInput>>;
  create?: InputMaybe<Array<UserAllocationCreateInput>>;
  disconnect?: InputMaybe<Array<UserAllocationWhereUniqueInput>>;
  set?: InputMaybe<Array<UserAllocationWhereUniqueInput>>;
};

export enum UserAllocationTypeType {
  CarryoverIn = 'CARRYOVER_IN',
  CarryoverOut = 'CARRYOVER_OUT',
  Manual = 'MANUAL',
  PolicyChangeRetro = 'POLICY_CHANGE_RETRO'
}

export type UserAllocationTypeTypeNullableFilter = {
  equals?: InputMaybe<UserAllocationTypeType>;
  in?: InputMaybe<Array<UserAllocationTypeType>>;
  not?: InputMaybe<UserAllocationTypeTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserAllocationTypeType>>;
};

export type UserAllocationUpdateArgs = {
  data: UserAllocationUpdateInput;
  where: UserAllocationWhereUniqueInput;
};

export type UserAllocationUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>;
  effectiveAt?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  timePolicy?: InputMaybe<TimePolicyRelateToOneForUpdateInput>;
  timePolicyAllocation?: InputMaybe<TimePolicyAllocationRelateToOneForUpdateInput>;
  type?: InputMaybe<UserAllocationTypeType>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type UserAllocationWhereInput = {
  AND?: InputMaybe<Array<UserAllocationWhereInput>>;
  NOT?: InputMaybe<Array<UserAllocationWhereInput>>;
  OR?: InputMaybe<Array<UserAllocationWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  effectiveAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  notes?: InputMaybe<StringFilter>;
  timePolicy?: InputMaybe<TimePolicyWhereInput>;
  timePolicyAllocation?: InputMaybe<TimePolicyAllocationWhereInput>;
  type?: InputMaybe<UserAllocationTypeTypeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type UserAllocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UserCreateInput = {
  allocations?: InputMaybe<UserAllocationRelateToManyForCreateInput>;
  avatarSocialUrl?: InputMaybe<Scalars['String']['input']>;
  avatarUploaded?: InputMaybe<Scalars['Upload']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationRelateToOneForCreateInput>;
  org?: InputMaybe<OrganizationRelateToOneForCreateInput>;
  provider?: InputMaybe<UserProviderType>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  provisionedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rawAuth?: InputMaybe<Scalars['JSON']['input']>;
  role?: InputMaybe<UserRoleType>;
  seenAt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
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
  startDate?: InputMaybe<OrderDirection>;
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

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum UserRoleType {
  God = 'GOD',
  LocationAdmin = 'LOCATION_ADMIN',
  OrgAdmin = 'ORG_ADMIN',
  OrgOwner = 'ORG_OWNER',
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
  allocations?: InputMaybe<UserAllocationRelateToManyForUpdateInput>;
  avatarSocialUrl?: InputMaybe<Scalars['String']['input']>;
  avatarUploaded?: InputMaybe<Scalars['Upload']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationRelateToOneForUpdateInput>;
  org?: InputMaybe<OrganizationRelateToOneForUpdateInput>;
  provider?: InputMaybe<UserProviderType>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  provisionedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rawAuth?: InputMaybe<Scalars['JSON']['input']>;
  role?: InputMaybe<UserRoleType>;
  seenAt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  allocations?: InputMaybe<UserAllocationManyRelationFilter>;
  avatarSocialUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isActive?: InputMaybe<BooleanFilter>;
  lastName?: InputMaybe<StringFilter>;
  location?: InputMaybe<LocationWhereInput>;
  org?: InputMaybe<OrganizationWhereInput>;
  provider?: InputMaybe<UserProviderTypeNullableFilter>;
  providerAccountId?: InputMaybe<StringFilter>;
  provisionedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<UserRoleTypeNullableFilter>;
  seenAt?: InputMaybe<DateTimeNullableFilter>;
  startDate?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type AssignUserToPolicyMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  policyId: Scalars['ID']['input'];
  applyConfig?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AssignUserToPolicyMutation = { __typename?: 'Mutation', assignUserToPolicy: boolean };

export type TimePlansQueryVariables = Exact<{
  start: Scalars['String']['input'];
  end: Scalars['String']['input'];
}>;


export type TimePlansQuery = { __typename?: 'Query', getTimePlans?: Array<{ __typename?: 'TimePlan', id: string, status?: TimePlanStatusType | null, startAt?: any | null, endAt?: any | null, isAllDay?: boolean | null, origin?: TimePlanOriginType | null, repeatMode?: TimePlanRepeatModeType | null, repeatInterval?: number | null, repeatDay?: number | null, decidedAt?: any | null, reason?: string | null, occurrenceId?: string | null, seriesId?: string | null, isRecurringInstance?: boolean | null, rrule?: string | null, rruleExDates?: Array<string> | null, rruleExceptionDates?: Array<string> | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null, isAway?: boolean | null } | null, user?: { __typename?: 'User', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, displayName?: string | null, avatarUrl?: string | null, location?: { __typename?: 'Location', id: string, name?: string | null } | null } | null, decidedBy?: { __typename?: 'User', id: string } | null }> | null };

export type TimeTypeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TimeTypeQuery = { __typename?: 'Query', timeType?: { __typename?: 'TimeType', id: string, name?: string | null, isAway?: boolean | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null } | null };

export type TimeTypePoliciesQueryVariables = Exact<{
  timeTypeId: Scalars['ID']['input'];
}>;


export type TimeTypePoliciesQuery = { __typename?: 'Query', timeType?: { __typename?: 'TimeType', id: string, timePolicies?: Array<{ __typename?: 'TimePolicy', id: string, name?: string | null, isAllocationManaged?: boolean | null, locations?: Array<{ __typename?: 'Location', id: string, name?: string | null }> | null, timePolicyAllocations?: Array<{ __typename?: 'TimePolicyAllocation', id: string, allocation?: number | null, carryoverLimit?: number | null, overdraftLimit?: number | null, effectiveAt?: any | null }> | null }> | null } | null };

export type TimeTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type TimeTypesQuery = { __typename?: 'Query', timeTypes?: Array<{ __typename?: 'TimeType', id: string, name?: string | null, isAway?: boolean | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null }> | null };

export type CompleteOnboardingMutationVariables = Exact<{
  input: CompleteOnboardingInput;
}>;


export type CompleteOnboardingMutation = { __typename?: 'Mutation', completeOnboarding: { __typename?: 'CompleteOnboardingPayload', orgId: string, locationId: string, timeTypeIds: Array<string>, policyIds: Array<string> } };

export type CreateTimePlanEntryMutationVariables = Exact<{
  input: TimePlanEntryInput;
}>;


export type CreateTimePlanEntryMutation = { __typename?: 'Mutation', createTimePlanEntry: { __typename?: 'TimePlan', id: string, status?: TimePlanStatusType | null, startAt?: any | null, endAt?: any | null, duration?: number | null, durationUnit?: TimePlanDurationUnitType | null, isAllDay?: boolean | null, reason?: string | null, repeatMode?: TimePlanRepeatModeType | null, repeatInterval?: number | null, repeatDay?: number | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null, isAway?: boolean | null } | null, timePolicy?: { __typename?: 'TimePolicy', id: string, name?: string | null } | null } };

export type CreateTimeTypeMutationVariables = Exact<{
  data: TimeTypeCreateInput;
}>;


export type CreateTimeTypeMutation = { __typename?: 'Mutation', createTimeType?: { __typename?: 'TimeType', id: string } | null };

export type CreateLocationMutationVariables = Exact<{
  data: LocationCreateInput;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation?: { __typename?: 'Location', id: string } | null };

export type CreateManualAllocationAdjustmentMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  timePolicyId: Scalars['ID']['input'];
  amount: Scalars['Int']['input'];
  effectiveAt: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateManualAllocationAdjustmentMutation = { __typename?: 'Mutation', createManualAllocationAdjustment?: { __typename?: 'UserAllocationEntry', id: string, type: string, amount: number, effectiveAt: string, createdAt?: string | null, notes?: string | null, createdBy?: string | null, timePolicyAllocationId?: string | null } | null };

export type CreateTimePolicyMutationVariables = Exact<{
  data: TimePolicyMutationInput;
  allocationConfig?: InputMaybe<TimePolicyAllocationRulesInput>;
}>;


export type CreateTimePolicyMutation = { __typename?: 'Mutation', createTimePolicyWithAllocation?: { __typename?: 'TimePolicy', id: string } | null };

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, email?: string | null, role?: UserRoleType | null, startDate?: any | null, location?: { __typename?: 'Location', id: string, name?: string | null } | null, org?: { __typename?: 'Organization', id: string } | null } | null };

export type DecideTimePlanMutationVariables = Exact<{
  timePlanId: Scalars['ID']['input'];
  decision: TimePlanStatusType;
}>;


export type DecideTimePlanMutation = { __typename?: 'Mutation', decideTimePlan?: { __typename?: 'TimePlan', id: string, status?: TimePlanStatusType | null, decidedAt?: any | null } | null };

export type DecideTimePlanRepeatMutationVariables = Exact<{
  timePlanId: Scalars['ID']['input'];
  decision: TimePlanStatusType;
}>;


export type DecideTimePlanRepeatMutation = { __typename?: 'Mutation', decideTimePlan?: { __typename?: 'TimePlan', id: string, status?: TimePlanStatusType | null, decidedAt?: any | null, decidedBy?: { __typename?: 'User', id: string } | null } | null };

export type DeleteTimeTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTimeTypeMutation = { __typename?: 'Mutation', deleteTimeType?: { __typename?: 'TimeType', id: string } | null };

export type DeleteLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation?: { __typename?: 'Location', id: string } | null };

export type DeleteTimePolicyMutationVariables = Exact<{
  where: TimePolicyWhereUniqueInput;
}>;


export type DeleteTimePolicyMutation = { __typename?: 'Mutation', deleteTimePolicy?: { __typename?: 'TimePolicy', id: string } | null };

export type HolidaysQueryVariables = Exact<{
  locationId: Scalars['ID']['input'];
  start: Scalars['String']['input'];
  end: Scalars['String']['input'];
}>;


export type HolidaysQuery = { __typename?: 'Query', holidays?: Array<{ __typename?: 'Holiday', date: string, title: string }> | null };

export type LocationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LocationQuery = { __typename?: 'Query', location?: { __typename?: 'Location', id: string, name?: string | null, timezone?: string | null, workingDays?: Array<LocationWorkingDayType> | null, weekStartDay?: LocationWeekStartDayType | null, holidayCountry?: string | null, usersCount?: number | null, org?: { __typename?: 'Organization', id: string, locationsCount?: number | null } | null } | null };

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = { __typename?: 'Query', locations?: Array<{ __typename?: 'Location', id: string, name?: string | null, timezone?: string | null, workingDays?: Array<LocationWorkingDayType> | null, weekStartDay?: LocationWeekStartDayType | null, holidayCountry?: string | null }> | null };

export type OrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganizationsQuery = { __typename?: 'Query', organizations?: Array<{ __typename?: 'Organization', id: string, name?: string | null, autojoinDomains?: any | null }> | null };

export type PendingTimePlanApprovalsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingTimePlanApprovalsQuery = { __typename?: 'Query', pendingTimePlanApprovals: Array<{ __typename?: 'PendingTimePlanApproval', sortKey: number, timePlan?: { __typename?: 'TimePlan', id: string, startAt?: any | null, endAt?: any | null, status?: TimePlanStatusType | null, reason?: string | null, isAllDay?: boolean | null, duration?: number | null, durationUnit?: TimePlanDurationUnitType | null, repeatMode?: TimePlanRepeatModeType | null, repeatInterval?: number | null, repeatDay?: number | null, user?: { __typename?: 'User', id: string, email?: string | null, firstName?: string | null, lastName?: string | null } | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null, isAway?: boolean | null } | null, timePolicy?: { __typename?: 'TimePolicy', id: string, name?: string | null } | null } | null }> };

export type TimePoliciesQueryVariables = Exact<{ [key: string]: never; }>;


export type TimePoliciesQuery = { __typename?: 'Query', timePolicies?: Array<{ __typename?: 'TimePolicy', id: string, name?: string | null, isAllocationManaged?: boolean | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null, isAway?: boolean | null } | null, locations?: Array<{ __typename?: 'Location', id: string, name?: string | null, timezone?: string | null, holidayCountry?: string | null }> | null, timePolicyAllocations?: Array<{ __typename?: 'TimePolicyAllocation', id: string, allocation?: number | null, carryoverLimit?: number | null, overdraftLimit?: number | null, effectiveAt?: any | null }> | null }> | null };

export type TimePoliciesForUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type TimePoliciesForUsersQuery = { __typename?: 'Query', timePolicies?: Array<{ __typename?: 'TimePolicy', id: string, name?: string | null }> | null };

export type TimePolicyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TimePolicyQuery = { __typename?: 'Query', timePolicy?: { __typename?: 'TimePolicy', id: string, name?: string | null, isAllocationManaged?: boolean | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, isAway?: boolean | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null } | null, locations?: Array<{ __typename?: 'Location', id: string, name?: string | null, timezone?: string | null, workingDays?: Array<LocationWorkingDayType> | null, weekStartDay?: LocationWeekStartDayType | null, holidayCountry?: string | null }> | null, timePolicyAllocations?: Array<{ __typename?: 'TimePolicyAllocation', id: string, allocation?: number | null, carryoverLimit?: number | null, overdraftLimit?: number | null, effectiveAt?: any | null, notes?: string | null }> | null } | null };

export type TimePolicyAllocationHistoryQueryVariables = Exact<{
  timePolicyId: Scalars['ID']['input'];
}>;


export type TimePolicyAllocationHistoryQuery = { __typename?: 'Query', timePolicyAllocationHistory?: Array<{ __typename?: 'TimePolicyAllocationHistoryEntry', id: string, effectiveAt?: string | null, allocation: number, carryoverLimit: number, overdraftLimit: number, notes?: string | null, createdAt?: string | null, createdBy?: string | null }> | null };

export type RequestTimePlanMutationVariables = Exact<{
  timeTypeId: Scalars['ID']['input'];
  startDateTime: Scalars['String']['input'];
  endDateTime: Scalars['String']['input'];
  isHalfDay?: InputMaybe<Scalars['Boolean']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type RequestTimePlanMutation = { __typename?: 'Mutation', requestTimePlan?: { __typename?: 'TimePlan', id: string, status?: TimePlanStatusType | null, startAt?: any | null, endAt?: any | null, isAllDay?: boolean | null, decidedAt?: any | null, reason?: string | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null, isAway?: boolean | null } | null, user?: { __typename?: 'User', id: string, email?: string | null, firstName?: string | null, lastName?: string | null } | null, decidedBy?: { __typename?: 'User', id: string } | null } | null };

export type UpdateTimePlanEntryMutationVariables = Exact<{
  input: TimePlanEntryUpdateInput;
}>;


export type UpdateTimePlanEntryMutation = { __typename?: 'Mutation', updateTimePlanEntry: { __typename?: 'TimePlan', id: string, status?: TimePlanStatusType | null, startAt?: any | null, endAt?: any | null, duration?: number | null, durationUnit?: TimePlanDurationUnitType | null, isAllDay?: boolean | null, reason?: string | null, repeatMode?: TimePlanRepeatModeType | null, repeatInterval?: number | null, repeatDay?: number | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null, isAway?: boolean | null } | null, timePolicy?: { __typename?: 'TimePolicy', id: string, name?: string | null } | null } };

export type UpdateTimeTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: TimeTypeUpdateInput;
}>;


export type UpdateTimeTypeMutation = { __typename?: 'Mutation', updateTimeType?: { __typename?: 'TimeType', id: string } | null };

export type UpdateLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: LocationUpdateInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation?: { __typename?: 'Location', id: string } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: OrganizationUpdateInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'Organization', id: string } | null };

export type UpdateTimePolicyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: TimePolicyMutationInput;
  allocationConfig?: InputMaybe<TimePolicyAllocationRulesInput>;
}>;


export type UpdateTimePolicyMutation = { __typename?: 'Mutation', updateTimePolicyWithAllocation?: { __typename?: 'TimePolicy', id: string } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, role?: UserRoleType | null, isActive?: boolean | null, startDate?: any | null, location?: { __typename?: 'Location', id: string, name?: string | null } | null } | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, avatarUrl?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, displayName?: string | null, role?: UserRoleType | null, location?: { __typename?: 'Location', id: string, name?: string | null, timezone?: string | null, holidayCountry?: string | null, workingDays?: Array<LocationWorkingDayType> | null, weekStartDay?: LocationWeekStartDayType | null, timePolicies?: Array<{ __typename?: 'TimePolicy', id: string, name?: string | null, isAllocationManaged?: boolean | null, timeType?: { __typename?: 'TimeType', id: string, name?: string | null, isAway?: boolean | null, color?: TimeTypeColorType | null, icon?: TimeTypeIconType | null } | null, timePolicyAllocations?: Array<{ __typename?: 'TimePolicyAllocation', id: string, allocation?: number | null, carryoverLimit?: number | null, overdraftLimit?: number | null, effectiveAt?: any | null }> | null }> | null } | null } | null };

export type UserAllocationBalanceQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  timePolicyId: Scalars['ID']['input'];
  year: Scalars['Int']['input'];
}>;


export type UserAllocationBalanceQuery = { __typename?: 'Query', userAllocationBalance?: { __typename?: 'UserAllocationBalance', year: number, base: number, carryoverIn: number, manualAdjustments: number, retroAdjustments: number, used: number, available: number, timePolicyAllocationId?: string | null, allocationRate?: number | null, carryoverLimit?: number | null, overdraftLimit?: number | null, breakdown?: Array<{ __typename?: 'AllocationBreakdownSegment', timePolicyAllocationId: string, effectiveAt: string, from: string, to: string, daysInSegment: number, portionOfPeriod: number, allocationRate: number, contribution: number }> | null } | null };

export type UserAllocationEventLogQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  timePolicyId: Scalars['ID']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserAllocationEventLogQuery = { __typename?: 'Query', userAllocationEventLog?: Array<{ __typename?: 'UserAllocationEntry', id: string, type: string, amount: number, effectiveAt: string, createdAt?: string | null, notes?: string | null, createdBy?: string | null, timePolicyAllocationId?: string | null }> | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, displayName?: string | null, role?: UserRoleType | null, isActive?: boolean | null, startDate?: any | null, location?: { __typename?: 'Location', id: string, name?: string | null } | null } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, displayName?: string | null, role?: UserRoleType | null, avatarUrl?: string | null, provisionedAt?: any | null, seenAt?: any | null, isActive?: boolean | null, location?: { __typename?: 'Location', id: string, name?: string | null } | null }> | null };


export const AssignUserToPolicyDocument = gql`
    mutation AssignUserToPolicy($userId: ID!, $policyId: ID!, $applyConfig: Boolean) {
  assignUserToPolicy(
    userId: $userId
    policyId: $policyId
    applyConfig: $applyConfig
  )
}
    `;
export type AssignUserToPolicyMutationFn = Apollo.MutationFunction<AssignUserToPolicyMutation, AssignUserToPolicyMutationVariables>;

/**
 * __useAssignUserToPolicyMutation__
 *
 * To run a mutation, you first call `useAssignUserToPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserToPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserToPolicyMutation, { data, loading, error }] = useAssignUserToPolicyMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      policyId: // value for 'policyId'
 *      applyConfig: // value for 'applyConfig'
 *   },
 * });
 */
export function useAssignUserToPolicyMutation(baseOptions?: Apollo.MutationHookOptions<AssignUserToPolicyMutation, AssignUserToPolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignUserToPolicyMutation, AssignUserToPolicyMutationVariables>(AssignUserToPolicyDocument, options);
      }
export type AssignUserToPolicyMutationHookResult = ReturnType<typeof useAssignUserToPolicyMutation>;
export type AssignUserToPolicyMutationResult = Apollo.MutationResult<AssignUserToPolicyMutation>;
export type AssignUserToPolicyMutationOptions = Apollo.BaseMutationOptions<AssignUserToPolicyMutation, AssignUserToPolicyMutationVariables>;
export const TimePlansDocument = gql`
    query TimePlans($start: String!, $end: String!) {
  getTimePlans(start: $start, end: $end) {
    id
    timeType {
      id
      name
      color
      icon
      isAway
    }
    status
    startAt
    endAt
    isAllDay
    origin
    repeatMode
    repeatInterval
    repeatDay
    user {
      id
      email
      firstName
      lastName
      displayName
      avatarUrl
      location {
        id
        name
      }
    }
    decidedBy {
      id
    }
    decidedAt
    reason
    occurrenceId
    seriesId
    isRecurringInstance
    rrule
    rruleExDates
    rruleExceptionDates
  }
}
    `;

/**
 * __useTimePlansQuery__
 *
 * To run a query within a React component, call `useTimePlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimePlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimePlansQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useTimePlansQuery(baseOptions: Apollo.QueryHookOptions<TimePlansQuery, TimePlansQueryVariables> & ({ variables: TimePlansQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimePlansQuery, TimePlansQueryVariables>(TimePlansDocument, options);
      }
export function useTimePlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimePlansQuery, TimePlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimePlansQuery, TimePlansQueryVariables>(TimePlansDocument, options);
        }
export function useTimePlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimePlansQuery, TimePlansQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimePlansQuery, TimePlansQueryVariables>(TimePlansDocument, options);
        }
export type TimePlansQueryHookResult = ReturnType<typeof useTimePlansQuery>;
export type TimePlansLazyQueryHookResult = ReturnType<typeof useTimePlansLazyQuery>;
export type TimePlansSuspenseQueryHookResult = ReturnType<typeof useTimePlansSuspenseQuery>;
export type TimePlansQueryResult = Apollo.QueryResult<TimePlansQuery, TimePlansQueryVariables>;
export const TimeTypeDocument = gql`
    query TimeType($id: ID!) {
  timeType(where: {id: $id}) {
    id
    name
    isAway
    color
    icon
  }
}
    `;

/**
 * __useTimeTypeQuery__
 *
 * To run a query within a React component, call `useTimeTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeTypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTimeTypeQuery(baseOptions: Apollo.QueryHookOptions<TimeTypeQuery, TimeTypeQueryVariables> & ({ variables: TimeTypeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeTypeQuery, TimeTypeQueryVariables>(TimeTypeDocument, options);
      }
export function useTimeTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeTypeQuery, TimeTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeTypeQuery, TimeTypeQueryVariables>(TimeTypeDocument, options);
        }
export function useTimeTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimeTypeQuery, TimeTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeTypeQuery, TimeTypeQueryVariables>(TimeTypeDocument, options);
        }
export type TimeTypeQueryHookResult = ReturnType<typeof useTimeTypeQuery>;
export type TimeTypeLazyQueryHookResult = ReturnType<typeof useTimeTypeLazyQuery>;
export type TimeTypeSuspenseQueryHookResult = ReturnType<typeof useTimeTypeSuspenseQuery>;
export type TimeTypeQueryResult = Apollo.QueryResult<TimeTypeQuery, TimeTypeQueryVariables>;
export const TimeTypePoliciesDocument = gql`
    query TimeTypePolicies($timeTypeId: ID!) {
  timeType(where: {id: $timeTypeId}) {
    id
    timePolicies {
      id
      name
      locations {
        id
        name
      }
      isAllocationManaged
      timePolicyAllocations(orderBy: {effectiveAt: desc}, take: 1) {
        id
        allocation
        carryoverLimit
        overdraftLimit
        effectiveAt
      }
    }
  }
}
    `;

/**
 * __useTimeTypePoliciesQuery__
 *
 * To run a query within a React component, call `useTimeTypePoliciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeTypePoliciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeTypePoliciesQuery({
 *   variables: {
 *      timeTypeId: // value for 'timeTypeId'
 *   },
 * });
 */
export function useTimeTypePoliciesQuery(baseOptions: Apollo.QueryHookOptions<TimeTypePoliciesQuery, TimeTypePoliciesQueryVariables> & ({ variables: TimeTypePoliciesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeTypePoliciesQuery, TimeTypePoliciesQueryVariables>(TimeTypePoliciesDocument, options);
      }
export function useTimeTypePoliciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeTypePoliciesQuery, TimeTypePoliciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeTypePoliciesQuery, TimeTypePoliciesQueryVariables>(TimeTypePoliciesDocument, options);
        }
export function useTimeTypePoliciesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimeTypePoliciesQuery, TimeTypePoliciesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeTypePoliciesQuery, TimeTypePoliciesQueryVariables>(TimeTypePoliciesDocument, options);
        }
export type TimeTypePoliciesQueryHookResult = ReturnType<typeof useTimeTypePoliciesQuery>;
export type TimeTypePoliciesLazyQueryHookResult = ReturnType<typeof useTimeTypePoliciesLazyQuery>;
export type TimeTypePoliciesSuspenseQueryHookResult = ReturnType<typeof useTimeTypePoliciesSuspenseQuery>;
export type TimeTypePoliciesQueryResult = Apollo.QueryResult<TimeTypePoliciesQuery, TimeTypePoliciesQueryVariables>;
export const TimeTypesDocument = gql`
    query TimeTypes {
  timeTypes {
    id
    name
    isAway
    color
    icon
  }
}
    `;

/**
 * __useTimeTypesQuery__
 *
 * To run a query within a React component, call `useTimeTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimeTypesQuery(baseOptions?: Apollo.QueryHookOptions<TimeTypesQuery, TimeTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeTypesQuery, TimeTypesQueryVariables>(TimeTypesDocument, options);
      }
export function useTimeTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeTypesQuery, TimeTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeTypesQuery, TimeTypesQueryVariables>(TimeTypesDocument, options);
        }
export function useTimeTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimeTypesQuery, TimeTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeTypesQuery, TimeTypesQueryVariables>(TimeTypesDocument, options);
        }
export type TimeTypesQueryHookResult = ReturnType<typeof useTimeTypesQuery>;
export type TimeTypesLazyQueryHookResult = ReturnType<typeof useTimeTypesLazyQuery>;
export type TimeTypesSuspenseQueryHookResult = ReturnType<typeof useTimeTypesSuspenseQuery>;
export type TimeTypesQueryResult = Apollo.QueryResult<TimeTypesQuery, TimeTypesQueryVariables>;
export const CompleteOnboardingDocument = gql`
    mutation CompleteOnboarding($input: CompleteOnboardingInput!) {
  completeOnboarding(input: $input) {
    orgId
    locationId
    timeTypeIds
    policyIds
  }
}
    `;
export type CompleteOnboardingMutationFn = Apollo.MutationFunction<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;

/**
 * __useCompleteOnboardingMutation__
 *
 * To run a mutation, you first call `useCompleteOnboardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteOnboardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeOnboardingMutation, { data, loading, error }] = useCompleteOnboardingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteOnboardingMutation(baseOptions?: Apollo.MutationHookOptions<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>(CompleteOnboardingDocument, options);
      }
export type CompleteOnboardingMutationHookResult = ReturnType<typeof useCompleteOnboardingMutation>;
export type CompleteOnboardingMutationResult = Apollo.MutationResult<CompleteOnboardingMutation>;
export type CompleteOnboardingMutationOptions = Apollo.BaseMutationOptions<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;
export const CreateTimePlanEntryDocument = gql`
    mutation CreateTimePlanEntry($input: TimePlanEntryInput!) {
  createTimePlanEntry(input: $input) {
    id
    status
    startAt
    endAt
    duration
    durationUnit
    isAllDay
    reason
    repeatMode
    repeatInterval
    repeatDay
    timeType {
      id
      name
      color
      icon
      isAway
    }
    timePolicy {
      id
      name
    }
  }
}
    `;
export type CreateTimePlanEntryMutationFn = Apollo.MutationFunction<CreateTimePlanEntryMutation, CreateTimePlanEntryMutationVariables>;

/**
 * __useCreateTimePlanEntryMutation__
 *
 * To run a mutation, you first call `useCreateTimePlanEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimePlanEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimePlanEntryMutation, { data, loading, error }] = useCreateTimePlanEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTimePlanEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateTimePlanEntryMutation, CreateTimePlanEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTimePlanEntryMutation, CreateTimePlanEntryMutationVariables>(CreateTimePlanEntryDocument, options);
      }
export type CreateTimePlanEntryMutationHookResult = ReturnType<typeof useCreateTimePlanEntryMutation>;
export type CreateTimePlanEntryMutationResult = Apollo.MutationResult<CreateTimePlanEntryMutation>;
export type CreateTimePlanEntryMutationOptions = Apollo.BaseMutationOptions<CreateTimePlanEntryMutation, CreateTimePlanEntryMutationVariables>;
export const CreateTimeTypeDocument = gql`
    mutation CreateTimeType($data: TimeTypeCreateInput!) {
  createTimeType(data: $data) {
    id
  }
}
    `;
export type CreateTimeTypeMutationFn = Apollo.MutationFunction<CreateTimeTypeMutation, CreateTimeTypeMutationVariables>;

/**
 * __useCreateTimeTypeMutation__
 *
 * To run a mutation, you first call `useCreateTimeTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimeTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimeTypeMutation, { data, loading, error }] = useCreateTimeTypeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTimeTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateTimeTypeMutation, CreateTimeTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTimeTypeMutation, CreateTimeTypeMutationVariables>(CreateTimeTypeDocument, options);
      }
export type CreateTimeTypeMutationHookResult = ReturnType<typeof useCreateTimeTypeMutation>;
export type CreateTimeTypeMutationResult = Apollo.MutationResult<CreateTimeTypeMutation>;
export type CreateTimeTypeMutationOptions = Apollo.BaseMutationOptions<CreateTimeTypeMutation, CreateTimeTypeMutationVariables>;
export const CreateLocationDocument = gql`
    mutation CreateLocation($data: LocationCreateInput!) {
  createLocation(data: $data) {
    id
  }
}
    `;
export type CreateLocationMutationFn = Apollo.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: Apollo.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = Apollo.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = Apollo.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const CreateManualAllocationAdjustmentDocument = gql`
    mutation CreateManualAllocationAdjustment($userId: ID!, $timePolicyId: ID!, $amount: Int!, $effectiveAt: String!, $notes: String) {
  createManualAllocationAdjustment(
    userId: $userId
    timePolicyId: $timePolicyId
    amount: $amount
    effectiveAt: $effectiveAt
    notes: $notes
  ) {
    id
    type
    amount
    effectiveAt
    createdAt
    notes
    createdBy
    timePolicyAllocationId
  }
}
    `;
export type CreateManualAllocationAdjustmentMutationFn = Apollo.MutationFunction<CreateManualAllocationAdjustmentMutation, CreateManualAllocationAdjustmentMutationVariables>;

/**
 * __useCreateManualAllocationAdjustmentMutation__
 *
 * To run a mutation, you first call `useCreateManualAllocationAdjustmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateManualAllocationAdjustmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createManualAllocationAdjustmentMutation, { data, loading, error }] = useCreateManualAllocationAdjustmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      timePolicyId: // value for 'timePolicyId'
 *      amount: // value for 'amount'
 *      effectiveAt: // value for 'effectiveAt'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCreateManualAllocationAdjustmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateManualAllocationAdjustmentMutation, CreateManualAllocationAdjustmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateManualAllocationAdjustmentMutation, CreateManualAllocationAdjustmentMutationVariables>(CreateManualAllocationAdjustmentDocument, options);
      }
export type CreateManualAllocationAdjustmentMutationHookResult = ReturnType<typeof useCreateManualAllocationAdjustmentMutation>;
export type CreateManualAllocationAdjustmentMutationResult = Apollo.MutationResult<CreateManualAllocationAdjustmentMutation>;
export type CreateManualAllocationAdjustmentMutationOptions = Apollo.BaseMutationOptions<CreateManualAllocationAdjustmentMutation, CreateManualAllocationAdjustmentMutationVariables>;
export const CreateTimePolicyDocument = gql`
    mutation CreateTimePolicy($data: TimePolicyMutationInput!, $allocationConfig: TimePolicyAllocationRulesInput) {
  createTimePolicyWithAllocation(data: $data, allocationConfig: $allocationConfig) {
    id
  }
}
    `;
export type CreateTimePolicyMutationFn = Apollo.MutationFunction<CreateTimePolicyMutation, CreateTimePolicyMutationVariables>;

/**
 * __useCreateTimePolicyMutation__
 *
 * To run a mutation, you first call `useCreateTimePolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimePolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimePolicyMutation, { data, loading, error }] = useCreateTimePolicyMutation({
 *   variables: {
 *      data: // value for 'data'
 *      allocationConfig: // value for 'allocationConfig'
 *   },
 * });
 */
export function useCreateTimePolicyMutation(baseOptions?: Apollo.MutationHookOptions<CreateTimePolicyMutation, CreateTimePolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTimePolicyMutation, CreateTimePolicyMutationVariables>(CreateTimePolicyDocument, options);
      }
export type CreateTimePolicyMutationHookResult = ReturnType<typeof useCreateTimePolicyMutation>;
export type CreateTimePolicyMutationResult = Apollo.MutationResult<CreateTimePolicyMutation>;
export type CreateTimePolicyMutationOptions = Apollo.BaseMutationOptions<CreateTimePolicyMutation, CreateTimePolicyMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
    email
    role
    location {
      id
      name
    }
    org {
      id
    }
    startDate
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
export const DecideTimePlanDocument = gql`
    mutation DecideTimePlan($timePlanId: ID!, $decision: TimePlanStatusType!) {
  decideTimePlan(timePlanId: $timePlanId, decision: $decision) {
    id
    status
    decidedAt
  }
}
    `;
export type DecideTimePlanMutationFn = Apollo.MutationFunction<DecideTimePlanMutation, DecideTimePlanMutationVariables>;

/**
 * __useDecideTimePlanMutation__
 *
 * To run a mutation, you first call `useDecideTimePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecideTimePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decideTimePlanMutation, { data, loading, error }] = useDecideTimePlanMutation({
 *   variables: {
 *      timePlanId: // value for 'timePlanId'
 *      decision: // value for 'decision'
 *   },
 * });
 */
export function useDecideTimePlanMutation(baseOptions?: Apollo.MutationHookOptions<DecideTimePlanMutation, DecideTimePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecideTimePlanMutation, DecideTimePlanMutationVariables>(DecideTimePlanDocument, options);
      }
export type DecideTimePlanMutationHookResult = ReturnType<typeof useDecideTimePlanMutation>;
export type DecideTimePlanMutationResult = Apollo.MutationResult<DecideTimePlanMutation>;
export type DecideTimePlanMutationOptions = Apollo.BaseMutationOptions<DecideTimePlanMutation, DecideTimePlanMutationVariables>;
export const DecideTimePlanRepeatDocument = gql`
    mutation DecideTimePlanRepeat($timePlanId: ID!, $decision: TimePlanStatusType!) {
  decideTimePlan(timePlanId: $timePlanId, decision: $decision) {
    id
    status
    decidedAt
    decidedBy {
      id
    }
  }
}
    `;
export type DecideTimePlanRepeatMutationFn = Apollo.MutationFunction<DecideTimePlanRepeatMutation, DecideTimePlanRepeatMutationVariables>;

/**
 * __useDecideTimePlanRepeatMutation__
 *
 * To run a mutation, you first call `useDecideTimePlanRepeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecideTimePlanRepeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decideTimePlanRepeatMutation, { data, loading, error }] = useDecideTimePlanRepeatMutation({
 *   variables: {
 *      timePlanId: // value for 'timePlanId'
 *      decision: // value for 'decision'
 *   },
 * });
 */
export function useDecideTimePlanRepeatMutation(baseOptions?: Apollo.MutationHookOptions<DecideTimePlanRepeatMutation, DecideTimePlanRepeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecideTimePlanRepeatMutation, DecideTimePlanRepeatMutationVariables>(DecideTimePlanRepeatDocument, options);
      }
export type DecideTimePlanRepeatMutationHookResult = ReturnType<typeof useDecideTimePlanRepeatMutation>;
export type DecideTimePlanRepeatMutationResult = Apollo.MutationResult<DecideTimePlanRepeatMutation>;
export type DecideTimePlanRepeatMutationOptions = Apollo.BaseMutationOptions<DecideTimePlanRepeatMutation, DecideTimePlanRepeatMutationVariables>;
export const DeleteTimeTypeDocument = gql`
    mutation DeleteTimeType($id: ID!) {
  deleteTimeType(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteTimeTypeMutationFn = Apollo.MutationFunction<DeleteTimeTypeMutation, DeleteTimeTypeMutationVariables>;

/**
 * __useDeleteTimeTypeMutation__
 *
 * To run a mutation, you first call `useDeleteTimeTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimeTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimeTypeMutation, { data, loading, error }] = useDeleteTimeTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTimeTypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTimeTypeMutation, DeleteTimeTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTimeTypeMutation, DeleteTimeTypeMutationVariables>(DeleteTimeTypeDocument, options);
      }
export type DeleteTimeTypeMutationHookResult = ReturnType<typeof useDeleteTimeTypeMutation>;
export type DeleteTimeTypeMutationResult = Apollo.MutationResult<DeleteTimeTypeMutation>;
export type DeleteTimeTypeMutationOptions = Apollo.BaseMutationOptions<DeleteTimeTypeMutation, DeleteTimeTypeMutationVariables>;
export const DeleteLocationDocument = gql`
    mutation DeleteLocation($id: ID!) {
  deleteLocation(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteLocationMutationFn = Apollo.MutationFunction<DeleteLocationMutation, DeleteLocationMutationVariables>;

/**
 * __useDeleteLocationMutation__
 *
 * To run a mutation, you first call `useDeleteLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLocationMutation, { data, loading, error }] = useDeleteLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLocationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLocationMutation, DeleteLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLocationMutation, DeleteLocationMutationVariables>(DeleteLocationDocument, options);
      }
export type DeleteLocationMutationHookResult = ReturnType<typeof useDeleteLocationMutation>;
export type DeleteLocationMutationResult = Apollo.MutationResult<DeleteLocationMutation>;
export type DeleteLocationMutationOptions = Apollo.BaseMutationOptions<DeleteLocationMutation, DeleteLocationMutationVariables>;
export const DeleteTimePolicyDocument = gql`
    mutation DeleteTimePolicy($where: TimePolicyWhereUniqueInput!) {
  deleteTimePolicy(where: $where) {
    id
  }
}
    `;
export type DeleteTimePolicyMutationFn = Apollo.MutationFunction<DeleteTimePolicyMutation, DeleteTimePolicyMutationVariables>;

/**
 * __useDeleteTimePolicyMutation__
 *
 * To run a mutation, you first call `useDeleteTimePolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimePolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimePolicyMutation, { data, loading, error }] = useDeleteTimePolicyMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteTimePolicyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTimePolicyMutation, DeleteTimePolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTimePolicyMutation, DeleteTimePolicyMutationVariables>(DeleteTimePolicyDocument, options);
      }
export type DeleteTimePolicyMutationHookResult = ReturnType<typeof useDeleteTimePolicyMutation>;
export type DeleteTimePolicyMutationResult = Apollo.MutationResult<DeleteTimePolicyMutation>;
export type DeleteTimePolicyMutationOptions = Apollo.BaseMutationOptions<DeleteTimePolicyMutation, DeleteTimePolicyMutationVariables>;
export const HolidaysDocument = gql`
    query Holidays($locationId: ID!, $start: String!, $end: String!) {
  holidays(locationId: $locationId, start: $start, end: $end) {
    date
    title
  }
}
    `;

/**
 * __useHolidaysQuery__
 *
 * To run a query within a React component, call `useHolidaysQuery` and pass it any options that fit your needs.
 * When your component renders, `useHolidaysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHolidaysQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useHolidaysQuery(baseOptions: Apollo.QueryHookOptions<HolidaysQuery, HolidaysQueryVariables> & ({ variables: HolidaysQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HolidaysQuery, HolidaysQueryVariables>(HolidaysDocument, options);
      }
export function useHolidaysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HolidaysQuery, HolidaysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HolidaysQuery, HolidaysQueryVariables>(HolidaysDocument, options);
        }
export function useHolidaysSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HolidaysQuery, HolidaysQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HolidaysQuery, HolidaysQueryVariables>(HolidaysDocument, options);
        }
export type HolidaysQueryHookResult = ReturnType<typeof useHolidaysQuery>;
export type HolidaysLazyQueryHookResult = ReturnType<typeof useHolidaysLazyQuery>;
export type HolidaysSuspenseQueryHookResult = ReturnType<typeof useHolidaysSuspenseQuery>;
export type HolidaysQueryResult = Apollo.QueryResult<HolidaysQuery, HolidaysQueryVariables>;
export const LocationDocument = gql`
    query Location($id: ID!) {
  location(where: {id: $id}) {
    id
    name
    timezone
    workingDays
    weekStartDay
    holidayCountry
    usersCount
    org {
      id
      locationsCount
    }
  }
}
    `;

/**
 * __useLocationQuery__
 *
 * To run a query within a React component, call `useLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLocationQuery(baseOptions: Apollo.QueryHookOptions<LocationQuery, LocationQueryVariables> & ({ variables: LocationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
      }
export function useLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationQuery, LocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
        }
export function useLocationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LocationQuery, LocationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
        }
export type LocationQueryHookResult = ReturnType<typeof useLocationQuery>;
export type LocationLazyQueryHookResult = ReturnType<typeof useLocationLazyQuery>;
export type LocationSuspenseQueryHookResult = ReturnType<typeof useLocationSuspenseQuery>;
export type LocationQueryResult = Apollo.QueryResult<LocationQuery, LocationQueryVariables>;
export const LocationsDocument = gql`
    query Locations {
  locations {
    id
    name
    timezone
    workingDays
    weekStartDay
    holidayCountry
  }
}
    `;

/**
 * __useLocationsQuery__
 *
 * To run a query within a React component, call `useLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocationsQuery(baseOptions?: Apollo.QueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
      }
export function useLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
        }
export function useLocationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
        }
export type LocationsQueryHookResult = ReturnType<typeof useLocationsQuery>;
export type LocationsLazyQueryHookResult = ReturnType<typeof useLocationsLazyQuery>;
export type LocationsSuspenseQueryHookResult = ReturnType<typeof useLocationsSuspenseQuery>;
export type LocationsQueryResult = Apollo.QueryResult<LocationsQuery, LocationsQueryVariables>;
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
export const PendingTimePlanApprovalsDocument = gql`
    query PendingTimePlanApprovals {
  pendingTimePlanApprovals {
    timePlan {
      id
      startAt
      endAt
      status
      reason
      isAllDay
      duration
      durationUnit
      repeatMode
      repeatInterval
      repeatDay
      user {
        id
        email
        firstName
        lastName
      }
      timeType {
        id
        name
        color
        icon
        isAway
      }
      timePolicy {
        id
        name
      }
    }
    sortKey
  }
}
    `;

/**
 * __usePendingTimePlanApprovalsQuery__
 *
 * To run a query within a React component, call `usePendingTimePlanApprovalsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingTimePlanApprovalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingTimePlanApprovalsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingTimePlanApprovalsQuery(baseOptions?: Apollo.QueryHookOptions<PendingTimePlanApprovalsQuery, PendingTimePlanApprovalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingTimePlanApprovalsQuery, PendingTimePlanApprovalsQueryVariables>(PendingTimePlanApprovalsDocument, options);
      }
export function usePendingTimePlanApprovalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingTimePlanApprovalsQuery, PendingTimePlanApprovalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingTimePlanApprovalsQuery, PendingTimePlanApprovalsQueryVariables>(PendingTimePlanApprovalsDocument, options);
        }
export function usePendingTimePlanApprovalsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PendingTimePlanApprovalsQuery, PendingTimePlanApprovalsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PendingTimePlanApprovalsQuery, PendingTimePlanApprovalsQueryVariables>(PendingTimePlanApprovalsDocument, options);
        }
export type PendingTimePlanApprovalsQueryHookResult = ReturnType<typeof usePendingTimePlanApprovalsQuery>;
export type PendingTimePlanApprovalsLazyQueryHookResult = ReturnType<typeof usePendingTimePlanApprovalsLazyQuery>;
export type PendingTimePlanApprovalsSuspenseQueryHookResult = ReturnType<typeof usePendingTimePlanApprovalsSuspenseQuery>;
export type PendingTimePlanApprovalsQueryResult = Apollo.QueryResult<PendingTimePlanApprovalsQuery, PendingTimePlanApprovalsQueryVariables>;
export const TimePoliciesDocument = gql`
    query TimePolicies {
  timePolicies {
    id
    name
    timeType {
      id
      name
      color
      icon
      isAway
    }
    locations {
      id
      name
      timezone
      holidayCountry
    }
    isAllocationManaged
    timePolicyAllocations(orderBy: {effectiveAt: desc}, take: 1) {
      id
      allocation
      carryoverLimit
      overdraftLimit
      effectiveAt
    }
  }
}
    `;

/**
 * __useTimePoliciesQuery__
 *
 * To run a query within a React component, call `useTimePoliciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimePoliciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimePoliciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimePoliciesQuery(baseOptions?: Apollo.QueryHookOptions<TimePoliciesQuery, TimePoliciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimePoliciesQuery, TimePoliciesQueryVariables>(TimePoliciesDocument, options);
      }
export function useTimePoliciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimePoliciesQuery, TimePoliciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimePoliciesQuery, TimePoliciesQueryVariables>(TimePoliciesDocument, options);
        }
export function useTimePoliciesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimePoliciesQuery, TimePoliciesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimePoliciesQuery, TimePoliciesQueryVariables>(TimePoliciesDocument, options);
        }
export type TimePoliciesQueryHookResult = ReturnType<typeof useTimePoliciesQuery>;
export type TimePoliciesLazyQueryHookResult = ReturnType<typeof useTimePoliciesLazyQuery>;
export type TimePoliciesSuspenseQueryHookResult = ReturnType<typeof useTimePoliciesSuspenseQuery>;
export type TimePoliciesQueryResult = Apollo.QueryResult<TimePoliciesQuery, TimePoliciesQueryVariables>;
export const TimePoliciesForUsersDocument = gql`
    query TimePoliciesForUsers {
  timePolicies {
    id
    name
  }
}
    `;

/**
 * __useTimePoliciesForUsersQuery__
 *
 * To run a query within a React component, call `useTimePoliciesForUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimePoliciesForUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimePoliciesForUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimePoliciesForUsersQuery(baseOptions?: Apollo.QueryHookOptions<TimePoliciesForUsersQuery, TimePoliciesForUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimePoliciesForUsersQuery, TimePoliciesForUsersQueryVariables>(TimePoliciesForUsersDocument, options);
      }
export function useTimePoliciesForUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimePoliciesForUsersQuery, TimePoliciesForUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimePoliciesForUsersQuery, TimePoliciesForUsersQueryVariables>(TimePoliciesForUsersDocument, options);
        }
export function useTimePoliciesForUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimePoliciesForUsersQuery, TimePoliciesForUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimePoliciesForUsersQuery, TimePoliciesForUsersQueryVariables>(TimePoliciesForUsersDocument, options);
        }
export type TimePoliciesForUsersQueryHookResult = ReturnType<typeof useTimePoliciesForUsersQuery>;
export type TimePoliciesForUsersLazyQueryHookResult = ReturnType<typeof useTimePoliciesForUsersLazyQuery>;
export type TimePoliciesForUsersSuspenseQueryHookResult = ReturnType<typeof useTimePoliciesForUsersSuspenseQuery>;
export type TimePoliciesForUsersQueryResult = Apollo.QueryResult<TimePoliciesForUsersQuery, TimePoliciesForUsersQueryVariables>;
export const TimePolicyDocument = gql`
    query TimePolicy($id: ID!) {
  timePolicy(where: {id: $id}) {
    id
    name
    timeType {
      id
      name
      isAway
      color
      icon
    }
    locations {
      id
      name
      timezone
      workingDays
      weekStartDay
      holidayCountry
    }
    isAllocationManaged
    timePolicyAllocations(orderBy: {effectiveAt: desc}, take: 1) {
      id
      allocation
      carryoverLimit
      overdraftLimit
      effectiveAt
      notes
    }
  }
}
    `;

/**
 * __useTimePolicyQuery__
 *
 * To run a query within a React component, call `useTimePolicyQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimePolicyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimePolicyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTimePolicyQuery(baseOptions: Apollo.QueryHookOptions<TimePolicyQuery, TimePolicyQueryVariables> & ({ variables: TimePolicyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimePolicyQuery, TimePolicyQueryVariables>(TimePolicyDocument, options);
      }
export function useTimePolicyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimePolicyQuery, TimePolicyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimePolicyQuery, TimePolicyQueryVariables>(TimePolicyDocument, options);
        }
export function useTimePolicySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimePolicyQuery, TimePolicyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimePolicyQuery, TimePolicyQueryVariables>(TimePolicyDocument, options);
        }
export type TimePolicyQueryHookResult = ReturnType<typeof useTimePolicyQuery>;
export type TimePolicyLazyQueryHookResult = ReturnType<typeof useTimePolicyLazyQuery>;
export type TimePolicySuspenseQueryHookResult = ReturnType<typeof useTimePolicySuspenseQuery>;
export type TimePolicyQueryResult = Apollo.QueryResult<TimePolicyQuery, TimePolicyQueryVariables>;
export const TimePolicyAllocationHistoryDocument = gql`
    query TimePolicyAllocationHistory($timePolicyId: ID!) {
  timePolicyAllocationHistory(timePolicyId: $timePolicyId) {
    id
    effectiveAt
    allocation
    carryoverLimit
    overdraftLimit
    notes
    createdAt
    createdBy
  }
}
    `;

/**
 * __useTimePolicyAllocationHistoryQuery__
 *
 * To run a query within a React component, call `useTimePolicyAllocationHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimePolicyAllocationHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimePolicyAllocationHistoryQuery({
 *   variables: {
 *      timePolicyId: // value for 'timePolicyId'
 *   },
 * });
 */
export function useTimePolicyAllocationHistoryQuery(baseOptions: Apollo.QueryHookOptions<TimePolicyAllocationHistoryQuery, TimePolicyAllocationHistoryQueryVariables> & ({ variables: TimePolicyAllocationHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimePolicyAllocationHistoryQuery, TimePolicyAllocationHistoryQueryVariables>(TimePolicyAllocationHistoryDocument, options);
      }
export function useTimePolicyAllocationHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimePolicyAllocationHistoryQuery, TimePolicyAllocationHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimePolicyAllocationHistoryQuery, TimePolicyAllocationHistoryQueryVariables>(TimePolicyAllocationHistoryDocument, options);
        }
export function useTimePolicyAllocationHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimePolicyAllocationHistoryQuery, TimePolicyAllocationHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimePolicyAllocationHistoryQuery, TimePolicyAllocationHistoryQueryVariables>(TimePolicyAllocationHistoryDocument, options);
        }
export type TimePolicyAllocationHistoryQueryHookResult = ReturnType<typeof useTimePolicyAllocationHistoryQuery>;
export type TimePolicyAllocationHistoryLazyQueryHookResult = ReturnType<typeof useTimePolicyAllocationHistoryLazyQuery>;
export type TimePolicyAllocationHistorySuspenseQueryHookResult = ReturnType<typeof useTimePolicyAllocationHistorySuspenseQuery>;
export type TimePolicyAllocationHistoryQueryResult = Apollo.QueryResult<TimePolicyAllocationHistoryQuery, TimePolicyAllocationHistoryQueryVariables>;
export const RequestTimePlanDocument = gql`
    mutation RequestTimePlan($timeTypeId: ID!, $startDateTime: String!, $endDateTime: String!, $isHalfDay: Boolean, $reason: String) {
  requestTimePlan(
    timeTypeId: $timeTypeId
    startDateTime: $startDateTime
    endDateTime: $endDateTime
    isHalfDay: $isHalfDay
    reason: $reason
  ) {
    id
    timeType {
      id
      name
      color
      icon
      isAway
    }
    status
    startAt
    endAt
    isAllDay
    user {
      id
      email
      firstName
      lastName
    }
    decidedBy {
      id
    }
    decidedAt
    reason
  }
}
    `;
export type RequestTimePlanMutationFn = Apollo.MutationFunction<RequestTimePlanMutation, RequestTimePlanMutationVariables>;

/**
 * __useRequestTimePlanMutation__
 *
 * To run a mutation, you first call `useRequestTimePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestTimePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestTimePlanMutation, { data, loading, error }] = useRequestTimePlanMutation({
 *   variables: {
 *      timeTypeId: // value for 'timeTypeId'
 *      startDateTime: // value for 'startDateTime'
 *      endDateTime: // value for 'endDateTime'
 *      isHalfDay: // value for 'isHalfDay'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRequestTimePlanMutation(baseOptions?: Apollo.MutationHookOptions<RequestTimePlanMutation, RequestTimePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestTimePlanMutation, RequestTimePlanMutationVariables>(RequestTimePlanDocument, options);
      }
export type RequestTimePlanMutationHookResult = ReturnType<typeof useRequestTimePlanMutation>;
export type RequestTimePlanMutationResult = Apollo.MutationResult<RequestTimePlanMutation>;
export type RequestTimePlanMutationOptions = Apollo.BaseMutationOptions<RequestTimePlanMutation, RequestTimePlanMutationVariables>;
export const UpdateTimePlanEntryDocument = gql`
    mutation UpdateTimePlanEntry($input: TimePlanEntryUpdateInput!) {
  updateTimePlanEntry(input: $input) {
    id
    status
    startAt
    endAt
    duration
    durationUnit
    isAllDay
    reason
    repeatMode
    repeatInterval
    repeatDay
    timeType {
      id
      name
      color
      icon
      isAway
    }
    timePolicy {
      id
      name
    }
  }
}
    `;
export type UpdateTimePlanEntryMutationFn = Apollo.MutationFunction<UpdateTimePlanEntryMutation, UpdateTimePlanEntryMutationVariables>;

/**
 * __useUpdateTimePlanEntryMutation__
 *
 * To run a mutation, you first call `useUpdateTimePlanEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimePlanEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimePlanEntryMutation, { data, loading, error }] = useUpdateTimePlanEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTimePlanEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTimePlanEntryMutation, UpdateTimePlanEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTimePlanEntryMutation, UpdateTimePlanEntryMutationVariables>(UpdateTimePlanEntryDocument, options);
      }
export type UpdateTimePlanEntryMutationHookResult = ReturnType<typeof useUpdateTimePlanEntryMutation>;
export type UpdateTimePlanEntryMutationResult = Apollo.MutationResult<UpdateTimePlanEntryMutation>;
export type UpdateTimePlanEntryMutationOptions = Apollo.BaseMutationOptions<UpdateTimePlanEntryMutation, UpdateTimePlanEntryMutationVariables>;
export const UpdateTimeTypeDocument = gql`
    mutation UpdateTimeType($id: ID!, $data: TimeTypeUpdateInput!) {
  updateTimeType(where: {id: $id}, data: $data) {
    id
  }
}
    `;
export type UpdateTimeTypeMutationFn = Apollo.MutationFunction<UpdateTimeTypeMutation, UpdateTimeTypeMutationVariables>;

/**
 * __useUpdateTimeTypeMutation__
 *
 * To run a mutation, you first call `useUpdateTimeTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimeTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimeTypeMutation, { data, loading, error }] = useUpdateTimeTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTimeTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTimeTypeMutation, UpdateTimeTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTimeTypeMutation, UpdateTimeTypeMutationVariables>(UpdateTimeTypeDocument, options);
      }
export type UpdateTimeTypeMutationHookResult = ReturnType<typeof useUpdateTimeTypeMutation>;
export type UpdateTimeTypeMutationResult = Apollo.MutationResult<UpdateTimeTypeMutation>;
export type UpdateTimeTypeMutationOptions = Apollo.BaseMutationOptions<UpdateTimeTypeMutation, UpdateTimeTypeMutationVariables>;
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($id: ID!, $data: LocationUpdateInput!) {
  updateLocation(where: {id: $id}, data: $data) {
    id
  }
}
    `;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($id: ID!, $data: OrganizationUpdateInput!) {
  updateOrganization(where: {id: $id}, data: $data) {
    id
  }
}
    `;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, options);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = Apollo.MutationResult<UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const UpdateTimePolicyDocument = gql`
    mutation UpdateTimePolicy($id: ID!, $data: TimePolicyMutationInput!, $allocationConfig: TimePolicyAllocationRulesInput) {
  updateTimePolicyWithAllocation(
    id: $id
    data: $data
    allocationConfig: $allocationConfig
  ) {
    id
  }
}
    `;
export type UpdateTimePolicyMutationFn = Apollo.MutationFunction<UpdateTimePolicyMutation, UpdateTimePolicyMutationVariables>;

/**
 * __useUpdateTimePolicyMutation__
 *
 * To run a mutation, you first call `useUpdateTimePolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimePolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimePolicyMutation, { data, loading, error }] = useUpdateTimePolicyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *      allocationConfig: // value for 'allocationConfig'
 *   },
 * });
 */
export function useUpdateTimePolicyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTimePolicyMutation, UpdateTimePolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTimePolicyMutation, UpdateTimePolicyMutationVariables>(UpdateTimePolicyDocument, options);
      }
export type UpdateTimePolicyMutationHookResult = ReturnType<typeof useUpdateTimePolicyMutation>;
export type UpdateTimePolicyMutationResult = Apollo.MutationResult<UpdateTimePolicyMutation>;
export type UpdateTimePolicyMutationOptions = Apollo.BaseMutationOptions<UpdateTimePolicyMutation, UpdateTimePolicyMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
  updateUser(where: {id: $id}, data: $data) {
    id
    role
    location {
      id
      name
    }
    isActive
    startDate
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
    location {
      id
      name
      timezone
      holidayCountry
      workingDays
      weekStartDay
      timePolicies {
        id
        name
        timeType {
          id
          name
          isAway
          color
          icon
        }
        isAllocationManaged
        timePolicyAllocations(orderBy: {effectiveAt: desc}, take: 1) {
          id
          allocation
          carryoverLimit
          overdraftLimit
          effectiveAt
        }
      }
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
export const UserAllocationBalanceDocument = gql`
    query UserAllocationBalance($userId: ID!, $timePolicyId: ID!, $year: Int!) {
  userAllocationBalance(userId: $userId, timePolicyId: $timePolicyId, year: $year) {
    year
    base
    carryoverIn
    manualAdjustments
    retroAdjustments
    used
    available
    timePolicyAllocationId
    allocationRate
    carryoverLimit
    overdraftLimit
    breakdown {
      timePolicyAllocationId
      effectiveAt
      from
      to
      daysInSegment
      portionOfPeriod
      allocationRate
      contribution
    }
  }
}
    `;

/**
 * __useUserAllocationBalanceQuery__
 *
 * To run a query within a React component, call `useUserAllocationBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAllocationBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAllocationBalanceQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      timePolicyId: // value for 'timePolicyId'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useUserAllocationBalanceQuery(baseOptions: Apollo.QueryHookOptions<UserAllocationBalanceQuery, UserAllocationBalanceQueryVariables> & ({ variables: UserAllocationBalanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserAllocationBalanceQuery, UserAllocationBalanceQueryVariables>(UserAllocationBalanceDocument, options);
      }
export function useUserAllocationBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserAllocationBalanceQuery, UserAllocationBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserAllocationBalanceQuery, UserAllocationBalanceQueryVariables>(UserAllocationBalanceDocument, options);
        }
export function useUserAllocationBalanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserAllocationBalanceQuery, UserAllocationBalanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserAllocationBalanceQuery, UserAllocationBalanceQueryVariables>(UserAllocationBalanceDocument, options);
        }
export type UserAllocationBalanceQueryHookResult = ReturnType<typeof useUserAllocationBalanceQuery>;
export type UserAllocationBalanceLazyQueryHookResult = ReturnType<typeof useUserAllocationBalanceLazyQuery>;
export type UserAllocationBalanceSuspenseQueryHookResult = ReturnType<typeof useUserAllocationBalanceSuspenseQuery>;
export type UserAllocationBalanceQueryResult = Apollo.QueryResult<UserAllocationBalanceQuery, UserAllocationBalanceQueryVariables>;
export const UserAllocationEventLogDocument = gql`
    query UserAllocationEventLog($userId: ID!, $timePolicyId: ID!, $year: Int) {
  userAllocationEventLog(
    userId: $userId
    timePolicyId: $timePolicyId
    year: $year
  ) {
    id
    type
    amount
    effectiveAt
    createdAt
    notes
    createdBy
    timePolicyAllocationId
  }
}
    `;

/**
 * __useUserAllocationEventLogQuery__
 *
 * To run a query within a React component, call `useUserAllocationEventLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAllocationEventLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAllocationEventLogQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      timePolicyId: // value for 'timePolicyId'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useUserAllocationEventLogQuery(baseOptions: Apollo.QueryHookOptions<UserAllocationEventLogQuery, UserAllocationEventLogQueryVariables> & ({ variables: UserAllocationEventLogQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserAllocationEventLogQuery, UserAllocationEventLogQueryVariables>(UserAllocationEventLogDocument, options);
      }
export function useUserAllocationEventLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserAllocationEventLogQuery, UserAllocationEventLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserAllocationEventLogQuery, UserAllocationEventLogQueryVariables>(UserAllocationEventLogDocument, options);
        }
export function useUserAllocationEventLogSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserAllocationEventLogQuery, UserAllocationEventLogQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserAllocationEventLogQuery, UserAllocationEventLogQueryVariables>(UserAllocationEventLogDocument, options);
        }
export type UserAllocationEventLogQueryHookResult = ReturnType<typeof useUserAllocationEventLogQuery>;
export type UserAllocationEventLogLazyQueryHookResult = ReturnType<typeof useUserAllocationEventLogLazyQuery>;
export type UserAllocationEventLogSuspenseQueryHookResult = ReturnType<typeof useUserAllocationEventLogSuspenseQuery>;
export type UserAllocationEventLogQueryResult = Apollo.QueryResult<UserAllocationEventLogQuery, UserAllocationEventLogQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  user(where: {id: $id}) {
    id
    firstName
    lastName
    email
    displayName
    role
    location {
      id
      name
    }
    isActive
    startDate
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
    location {
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    