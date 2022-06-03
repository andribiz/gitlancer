import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export enum ApplicantState {
  Accepted = 'ACCEPTED',
  Progress = 'PROGRESS',
  Rejected = 'REJECTED'
}

export enum BiddingType {
  OpenBid = 'OPEN_BID',
  OpenFix = 'OPEN_FIX',
  VerifiedBid = 'VERIFIED_BID',
  VerifiedFix = 'VERIFIED_FIX',
  WhitelistBid = 'WHITELIST_BID',
  WhitelistFix = 'WHITELIST_FIX'
}

export enum JobState {
  Draft = 'DRAFT',
  Finished = 'FINISHED',
  Progress = 'PROGRESS',
  Tender = 'TENDER'
}

export type JobsApplicant = {
  __typename?: 'JobsApplicant';
  bidPrice: Scalars['Float'];
  job?: Maybe<JobsData>;
  jobID: Scalars['String'];
  state: ApplicantState;
  userID: Scalars['String'];
};

export type JobsData = {
  __typename?: 'JobsData';
  applicants?: Maybe<Array<JobsApplicant>>;
  biddingType: BiddingType;
  body: Scalars['String'];
  contractAddress?: Maybe<Scalars['String']>;
  createdAt: Scalars['Time'];
  creator: UsersProfile;
  finishedAt?: Maybe<Scalars['Time']>;
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  state: JobState;
  title: Scalars['String'];
};

export type JobsDataInput = {
  biddingType: BiddingType;
  body: Scalars['String'];
  creatorID: Scalars['String'];
  link?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ConfirmJob: JobsData;
  CreateJobsData: JobsData;
  CreateUserByWallet: UsersProfile;
  UpdateUserProfile?: Maybe<UsersProfile>;
};


export type MutationConfirmJobArgs = {
  id: Scalars['String'];
};


export type MutationCreateJobsDataArgs = {
  input: JobsDataInput;
};


export type MutationCreateUserByWalletArgs = {
  wallet: Scalars['String'];
};


export type MutationUpdateUserProfileArgs = {
  id: Scalars['String'];
  input: UsersProfileInput;
};

export type Query = {
  __typename?: 'Query';
  GetJobsDataID?: Maybe<JobsData>;
  GetUserByID?: Maybe<UsersProfile>;
  GetUserByWallet?: Maybe<UsersProfile>;
  SearchJobsData?: Maybe<Array<Maybe<JobsData>>>;
};


export type QueryGetJobsDataIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByWalletArgs = {
  wallet: Scalars['String'];
};


export type QuerySearchJobsDataArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type UsersProfile = {
  __typename?: 'UsersProfile';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  wallet: Scalars['String'];
};

export type UsersProfileInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateJobsDataMutationVariables = Exact<{
  input: JobsDataInput;
}>;


export type CreateJobsDataMutation = { __typename?: 'Mutation', CreateJobsData: { __typename?: 'JobsData', id: string, title: string, body: string, biddingType: BiddingType, createdAt: any, state: JobState, price: number, creator: { __typename?: 'UsersProfile', id: string, wallet: string } } };

export type GetJobsDataByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetJobsDataByIdQuery = { __typename?: 'Query', GetJobsDataID?: { __typename?: 'JobsData', id: string, title: string, body: string, biddingType: BiddingType, createdAt: any, state: JobState, price: number, creator: { __typename?: 'UsersProfile', id: string, wallet: string } } | null };

export type CreateUserByWalletMutationVariables = Exact<{
  wallet: Scalars['String'];
}>;


export type CreateUserByWalletMutation = { __typename?: 'Mutation', CreateUserByWallet: { __typename?: 'UsersProfile', id: string, name?: string | null, wallet: string } };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', GetUserByID?: { __typename?: 'UsersProfile', id: string, name?: string | null, wallet: string, email?: string | null } | null };

export type GetUserByWalletQueryVariables = Exact<{
  wallet: Scalars['String'];
}>;


export type GetUserByWalletQuery = { __typename?: 'Query', GetUserByWallet?: { __typename?: 'UsersProfile', id: string, name?: string | null, wallet: string, email?: string | null } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  id: Scalars['String'];
  input: UsersProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', UpdateUserProfile?: { __typename?: 'UsersProfile', id: string, name?: string | null, wallet: string } | null };


export const CreateJobsDataDocument = gql`
    mutation CreateJobsData($input: JobsDataInput!) {
  CreateJobsData(input: $input) {
    id
    title
    body
    biddingType
    createdAt
    creator {
      id
      wallet
    }
    state
    price
  }
}
    `;
export type CreateJobsDataMutationFn = Apollo.MutationFunction<CreateJobsDataMutation, CreateJobsDataMutationVariables>;

/**
 * __useCreateJobsDataMutation__
 *
 * To run a mutation, you first call `useCreateJobsDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobsDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobsDataMutation, { data, loading, error }] = useCreateJobsDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobsDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateJobsDataMutation, CreateJobsDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJobsDataMutation, CreateJobsDataMutationVariables>(CreateJobsDataDocument, options);
      }
export type CreateJobsDataMutationHookResult = ReturnType<typeof useCreateJobsDataMutation>;
export type CreateJobsDataMutationResult = Apollo.MutationResult<CreateJobsDataMutation>;
export type CreateJobsDataMutationOptions = Apollo.BaseMutationOptions<CreateJobsDataMutation, CreateJobsDataMutationVariables>;
export const GetJobsDataByIdDocument = gql`
    query getJobsDataByID($id: String!) {
  GetJobsDataID(id: $id) {
    id
    title
    body
    biddingType
    createdAt
    creator {
      id
      wallet
    }
    state
    price
  }
}
    `;

/**
 * __useGetJobsDataByIdQuery__
 *
 * To run a query within a React component, call `useGetJobsDataByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobsDataByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobsDataByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJobsDataByIdQuery(baseOptions: Apollo.QueryHookOptions<GetJobsDataByIdQuery, GetJobsDataByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobsDataByIdQuery, GetJobsDataByIdQueryVariables>(GetJobsDataByIdDocument, options);
      }
export function useGetJobsDataByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobsDataByIdQuery, GetJobsDataByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobsDataByIdQuery, GetJobsDataByIdQueryVariables>(GetJobsDataByIdDocument, options);
        }
export type GetJobsDataByIdQueryHookResult = ReturnType<typeof useGetJobsDataByIdQuery>;
export type GetJobsDataByIdLazyQueryHookResult = ReturnType<typeof useGetJobsDataByIdLazyQuery>;
export type GetJobsDataByIdQueryResult = Apollo.QueryResult<GetJobsDataByIdQuery, GetJobsDataByIdQueryVariables>;
export const CreateUserByWalletDocument = gql`
    mutation createUserByWallet($wallet: String!) {
  CreateUserByWallet(wallet: $wallet) {
    id
    name
    wallet
  }
}
    `;
export type CreateUserByWalletMutationFn = Apollo.MutationFunction<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>;

/**
 * __useCreateUserByWalletMutation__
 *
 * To run a mutation, you first call `useCreateUserByWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserByWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserByWalletMutation, { data, loading, error }] = useCreateUserByWalletMutation({
 *   variables: {
 *      wallet: // value for 'wallet'
 *   },
 * });
 */
export function useCreateUserByWalletMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>(CreateUserByWalletDocument, options);
      }
export type CreateUserByWalletMutationHookResult = ReturnType<typeof useCreateUserByWalletMutation>;
export type CreateUserByWalletMutationResult = Apollo.MutationResult<CreateUserByWalletMutation>;
export type CreateUserByWalletMutationOptions = Apollo.BaseMutationOptions<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>;
export const GetUserByIdDocument = gql`
    query getUserByID($id: String!) {
  GetUserByID(id: $id) {
    id
    name
    wallet
    email
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
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserByWalletDocument = gql`
    query getUserByWallet($wallet: String!) {
  GetUserByWallet(wallet: $wallet) {
    id
    name
    wallet
    email
  }
}
    `;

/**
 * __useGetUserByWalletQuery__
 *
 * To run a query within a React component, call `useGetUserByWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByWalletQuery({
 *   variables: {
 *      wallet: // value for 'wallet'
 *   },
 * });
 */
export function useGetUserByWalletQuery(baseOptions: Apollo.QueryHookOptions<GetUserByWalletQuery, GetUserByWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByWalletQuery, GetUserByWalletQueryVariables>(GetUserByWalletDocument, options);
      }
export function useGetUserByWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByWalletQuery, GetUserByWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByWalletQuery, GetUserByWalletQueryVariables>(GetUserByWalletDocument, options);
        }
export type GetUserByWalletQueryHookResult = ReturnType<typeof useGetUserByWalletQuery>;
export type GetUserByWalletLazyQueryHookResult = ReturnType<typeof useGetUserByWalletLazyQuery>;
export type GetUserByWalletQueryResult = Apollo.QueryResult<GetUserByWalletQuery, GetUserByWalletQueryVariables>;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($id: String!, $input: UsersProfileInput!) {
  UpdateUserProfile(id: $id, input: $input) {
    id
    name
    wallet
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;