export interface Requirement {
  id: string;
  name: string;
  status: "eligible" | "ineligible" | "pending";
}
