import type { ApiResponse } from '@/lib/types'

async function request<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string }> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json = (await res.json()) as ApiResponse<T>

  if (!res.ok || !json.success) {
    if (res.status === 401) return { error: 'Unauthorized' }
    return { error: json.error || 'Request failed' }
  }
  return { data: json.data }
}

export async function get<T>(url: string) {
  return request<T>(url, { method: 'GET' })
}

export async function post<T>(url: string, body?: unknown) {
  return request<T>(url, { method: 'POST', body: JSON.stringify(body ?? {}) })
}

export async function put<T>(url: string, body?: unknown) {
  return request<T>(url, { method: 'PUT', body: JSON.stringify(body ?? {}) })
}

export async function patch<T>(url: string, body?: unknown) {
  return request<T>(url, { method: 'PATCH', body: JSON.stringify(body ?? {}) })
}

export async function del<T>(url: string) {
  return request<T>(url, { method: 'DELETE' })
}
