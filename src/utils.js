/**
 * Generates a unique ID for a task
 * @returns {number} Unique ID
 */
export const generateID = () => {
  return Date.now() + Math.floor(Math.random() * 10000);
};
