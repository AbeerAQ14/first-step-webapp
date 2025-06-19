/**
 * Formats a date string to Arabic locale
 * @param dateString - Date string in ISO format
 * @returns Formatted date string in Arabic
 */
export const formatToArabicDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Calculates the difference in days between two dates
 * @param startDate - Start date string in ISO format
 * @param endDate - End date string in ISO format
 * @returns Number of days between dates
 */
export const getDaysDifference = (startDate: string, endDate: string): number => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
  } catch (error) {
    console.error('Error calculating date difference:', error);
    return 0;
  }
};

/**
 * Gets the current date in ISO format
 * @returns Current date in YYYY-MM-DD format
 */
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Validates if a date string is in the future
 * @param dateString - Date string to validate
 * @returns Boolean indicating if the date is in the future
 */
export const isFutureDate = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
    return date > today;
  } catch (error) {
    console.error('Error validating date:', error);
    return false;
  }
};
