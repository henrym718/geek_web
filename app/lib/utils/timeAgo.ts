export function timeAgo(date: Date) {
   const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

   const minutes = Math.floor(diff / 60)
   const hours = Math.floor(diff / 3600)
   const days = Math.floor(diff / 86400)
   const weeks = Math.floor(diff / 604800)
   const months = Math.floor(diff / 2592000)

   if (months > 0) {
      return `hace ${months} meses`
   } else if (weeks > 0) {
      return `hace ${weeks} semanas`
   } else if (days > 0) {
      return `hace ${days} dias`
   } else if (hours > 0) {
      return `hace ${hours} horas`
   } else if (minutes > 0) {
      return `hace ${minutes} minutos`
   } else {
      return `hace un momento`
   }
}
