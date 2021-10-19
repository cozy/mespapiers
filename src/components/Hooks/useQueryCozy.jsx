import { useQuery, isQueryLoading } from 'cozy-client'

export const useQueryCozy = query => {
  const { data, ...rest } = useQuery(query.definition, query.options)

  return {
    isQueryLoading: isQueryLoading(rest),
    data: data || []
  }
}
