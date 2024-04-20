export const formatDateString = (date: string) => {
  const options : Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  return new Date(date).toLocaleDateString('en-US', options)
}