import Toast from 'react-native-simple-toast';

// Define types
export type EmptyValue =
  | string
  | number
  | null
  | undefined
  | Record<string, any>;

export const isEmpty = (value: EmptyValue): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value === '0') ||
  (typeof value === 'number' && value === 0) ||
  (typeof value === 'string' && value.trim().length === 0);



export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Transgender", value: "transgender" },
];


export const formatPickupDateTime = (value: any) => {
  let dateObj;

  if (typeof value === "number") {
    // timestamp
    dateObj = new Date(value);
  } else if (value instanceof Date) {
    // Date object
    dateObj = value;
  } else if (typeof value === "string") {
    // "date | time" format
    const [datePart, timePart] = value.split(" | ");
    dateObj = new Date(`${datePart} ${timePart}`);
  }

  if (!dateObj) {
    throw new Error("Invalid date value");
  }

  const pickupDate = new Date(dateObj).toISOString();
  const pickupTime = dateObj.toISOString();

  return { pickupDate, pickupTime };
};