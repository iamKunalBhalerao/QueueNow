export const getScheduledDateTime = (data: { date: Date; selectedTime: string }) => {
  const { date, selectedTime } = data;
  if (!date || !selectedTime) return null;

  // Parse the time string (e.g., "10:00 AM" or "02:30 PM")
  const [time, period] = selectedTime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format
  let hours24 = hours;
  if (period === "AM" && hours === 12) {
    hours24 = 0; // 12 AM = 0
  } else if (period === "PM" && hours !== 12) {
    hours24 = hours + 12; // Add 12 to PM times (except 12 PM)
  }

  // Create the scheduled datetime
  const scheduledAt = new Date(date);
  scheduledAt.setHours(hours24, minutes, 0, 0);

  return scheduledAt;
};