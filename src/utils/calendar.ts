/**
 * Helper to generate Google Calendar links and iCal (.ics) downloads
 */

export function getGoogleCalendarUrl(
  title: string,
  description: string,
  location: string,
  isoDateString: string
): string {
  const startDate = new Date(isoDateString);
  // Default wedding duration: 8 hours
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

  const formatIsoForGCal = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const startStr = formatIsoForGCal(startDate);
  const endStr = formatIsoForGCal(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: location,
    dates: `${startStr}/${endStr}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(
  title: string,
  description: string,
  location: string,
  isoDateString: string
): void {
  const startDate = new Date(isoDateString);
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

  const formatIsoForIcs = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Invitacion de Boda//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${formatIsoForIcs(startDate)}`,
    `DTEND:${formatIsoForIcs(endDate)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'boda-invitacion.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
