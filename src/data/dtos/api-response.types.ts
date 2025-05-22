export type ApiResponse<T> = SuccessApiResponse<T> | FailureApiResponse

export type SuccessApiResponse<T> = {
   success: true
   data: T
   details?: string
}
export type FailureApiResponse = {
   success: false
   message: string
}
