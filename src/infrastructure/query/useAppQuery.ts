import { Services } from 'core/services';
import { AnyServiceParsedError } from 'infrastructure/request/types';
import {
  QueryFunctionContext,
  QueryFunctionData,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { useQueryEnhancer } from './useQueryEnhancer';

/**
 * A tiny wrapper around useQuery
 * Purposes:
 * 1. Add an appliaction services to a queryFunction args
 * 2. dehydrate a query state on client side in case of a stream rendering
 */
/** @TODO may be change type of the error?
 * What if an Error will be thrown during response parse? */
export const useAppQuery = <TResult, TError extends AnyServiceParsedError>(
  key: QueryKey,
  queryFunction: (params: {
    services: Services;
    context: QueryFunctionContext<QueryKey>;
  }) => QueryFunctionData<TResult> | Promise<QueryFunctionData<TResult>>,
  options?: Omit<UseQueryOptions<TResult, TError>, 'queryKey' | 'queryFn'>,
) => {
  const { queryFunctionWithServices } = useQueryEnhancer(key, queryFunction);

  return useQuery<TResult, TError>(key, queryFunctionWithServices, options);
};
