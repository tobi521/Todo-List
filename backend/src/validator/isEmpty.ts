export default (value: any): boolean => 
  (typeof value === "object" && Object.keys(value).length === 0) || 
  (typeof value === "string" && value.trim().length === 0) || 
  typeof value === "undefined" || 
  value === null