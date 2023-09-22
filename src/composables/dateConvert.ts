export const dateConvert = (timeStamp: number) => {
  // const localOffset = new Date().getTimezoneOffset() * 60000 //milisecond
  // const utc = timeStamp * 1000 + localOffset
  // const currentTime = utc + 1000 * timezone
  
  return new Date(timeStamp*1000).toLocaleDateString('en-us', { weekday: 'short', day:'2-digit', month: 'long' })
}

export const timeConvert = (timeStamp: number) => {
  // const localOffset = new Date().getTimezoneOffset() * 60000 //milisecond
  // const utc = timeStamp * 1000 + localOffset
  // const currentTime = utc + 1000 * timezone
  
  return new Date(timeStamp*1000).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
}