import { useState, useEffect } from 'react'
import { api } from '@/utils/api'

interface UseFetchOptions {
  enabled?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function useFetch<T = any>(url: string, options: UseFetchOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { enabled = true, onSuccess, onError } = options

  const fetchData = async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      const response = await api.get(url)
      const result = response.data.data || response.data
      setData(result)
      
      if (onSuccess) {
        onSuccess(result)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 'An error occurred'
      setError(errorMessage)
      
      if (onError) {
        onError(err)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url, enabled])

  const refetch = () => {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    refetch
  }
}
