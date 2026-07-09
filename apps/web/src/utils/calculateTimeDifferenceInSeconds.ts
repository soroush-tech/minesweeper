export const calculateTimeDifferenceInSeconds = (
  startDate: string,
  endDate?: string | null,
): number => {
  const startTime = new Date(startDate)
  const endTime = endDate != null ? new Date(endDate) : new Date()

  // Calculate the difference in milliseconds
  const timeDifferenceInMilliseconds = endTime.getTime() - startTime.getTime()

  // Convert the difference to seconds
  return timeDifferenceInMilliseconds / 1000
}
