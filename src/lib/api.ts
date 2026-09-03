import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/lib/types'

export function ok<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, message })
}

export function created<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, message }, { status: 201 })
}

export function fail(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error }, { status })
}

export function notFound(message = 'Not found'): NextResponse<ApiResponse> {
  return fail(message, 404)
}

export function unauthorized(message = 'Unauthorized'): NextResponse<ApiResponse> {
  return fail(message, 401)
}
