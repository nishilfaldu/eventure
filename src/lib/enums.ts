import { z } from "zod";


// Define a tuple type that matches the expected type
type Tuple = [string, ...string[]];


// Your array of states
const states: readonly string[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
  "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const roles: readonly string[] = ["USER", "ADMIN"];

const eventTypes: readonly string[] = [
  "Birthday", "Wedding",
];


// Convert the readonly string[] to the expected tuple type
export const statesTuple: Tuple = states as Tuple;
export const rolesTuple: Tuple = roles as Tuple;
export const eventTypesTuple: Tuple = eventTypes as Tuple;

export const EventTypesEnum = z.enum(eventTypes as [string]);
