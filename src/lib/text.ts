const TODO_PREFIX = "TODO:";

export function hasRealText(value: string | null | undefined): value is string {
  if (!value) {
    return false;
  }

  return !value.trim().toUpperCase().startsWith(TODO_PREFIX);
}

export function hasItems<T>(value: T[] | null | undefined): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

export function formatOptionalDate(value: string | null | undefined): string | null {
  if (!hasRealText(value)) {
    return null;
  }

  const asDate = new Date(value);
  if (Number.isNaN(asDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(asDate);
}

export function uniqueItems(values: string[]): string[] {
  return [...new Set(values)];
}
