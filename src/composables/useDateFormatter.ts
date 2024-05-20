export const useDateFormatter = (options?: Intl.DateTimeFormatOptions) => {

  const format = (dateString: string): string => {
    const date = new Date(dateString);

    const defaultOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };

    return options?  date.toLocaleDateString("en-US", options) : date.toLocaleDateString("en-US", defaultOptions);
  };

  return {format}
}
