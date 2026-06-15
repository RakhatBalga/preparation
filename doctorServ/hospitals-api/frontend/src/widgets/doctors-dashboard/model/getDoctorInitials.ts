export function getDoctorInitials(name: string) {
  return name
    .replace('Dr.', '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
