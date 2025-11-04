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
