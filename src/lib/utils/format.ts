export function formatNumberToWhatsappLink(number: string | undefined) {
    if (!number) return "";

    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, "");

    // If starts with 0, replace with 234 (Nigeria country code)
    const formattedNumber = cleanNumber.startsWith("0")
        ? "234" + cleanNumber.slice(1)
        : cleanNumber;

    return `https://wa.me/+${formattedNumber}`;
}

export function formatTimeTo12Hour(time: string) {
    const [hourPart, minutePart = "00"] = time.split(":");
    const hour = Number(hourPart);
    const minute = Number(minutePart);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
        return time;
    }

    const period = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 || 12;
    const formattedMinute = String(minute).padStart(2, "0");

    return `${normalizedHour}:${formattedMinute} ${period}`;
}
