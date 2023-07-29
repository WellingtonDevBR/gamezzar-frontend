export function convertTimeFormat(time: string) {
  const dateObject = new Date(time);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1 to get the correct month.
  const year = dateObject.getFullYear().toString();

  return `${day}/${month}/${year}`;
}
