export const formatDateRange = (timestamp: number, duration: number): string => {
    const startDate = new Date(timestamp * 1000)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + duration)

    const formatDate = (date: Date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const month = months[date.getMonth()]
        const day = date.getDate()
        const year = date.getFullYear()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedHours = hours % 12 || 12
        const formattedMinutes = minutes.toString().padStart(2, '0')
        const formattedSeconds = seconds.toString().padStart(2, '0')

        return { month, day, year, hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds, ampm }
    }

    const start = formatDate(startDate)
    const end = formatDate(endDate)

    const formattedStartDate = `${start.month} ${start.day} (${start.hours}:${start.minutes}:${start.seconds} ${start.ampm})`
    const formattedEndDate = start.month === end.month
        ? `${end.day} (${end.hours}:${end.minutes}:${end.seconds} ${end.ampm}), ${end.year}`
        : `${end.month} ${end.day} (${end.hours}:${end.minutes}:${end.seconds} ${end.ampm}), ${end.year}`

    return `${formattedStartDate} - ${formattedEndDate}`
}
