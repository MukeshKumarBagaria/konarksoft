export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[];

/**
 * Joins conditional class names. Deliberately dependency-free: the project only
 * needs conditional joining, not Tailwind conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input && input !== 0) continue;

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
      continue;
    }

    classes.push(String(input));
  }

  return classes.join(" ");
}
