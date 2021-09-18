import { useQuery as useQueryCozy, isQueryLoading } from 'cozy-client'

export const useQuery = query => {
  const { data, ...rest } = useQueryCozy(query.definition, query.options)

  return {
    isQueryLoading: isQueryLoading(rest),
    data: data || []
  }
}
