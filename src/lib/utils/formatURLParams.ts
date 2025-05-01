export const formatURLParam = (param: string) => {
   return param.replace(/[,.]/g, "").replace(/ /g, "-").toLowerCase()
}

export const formatApiParams = (param: string) => {
   return param.replace(/-/g, " ").toLowerCase()
}
