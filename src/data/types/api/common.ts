export type ApiResponse<T> = SuccessApiResponse<T> | FailureApiResponse

export type SuccessApiResponse<T> = {
   success: true
   data: T
}
export type FailureApiResponse = {
   success: false
   message: string
}
