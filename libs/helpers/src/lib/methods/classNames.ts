type IClassNames = (
  entries:
  | string
  | (string | boolean | undefined)[]
  | { [key: string]: boolean }
) => string;

const classNames: IClassNames = (entries) =>
  // eslint-disable-next-line no-nested-ternary
  (typeof entries === 'string'
    ? [entries]
    : Array.isArray(entries)
      ? (entries as []).filter(Boolean)
      : Object.entries(entries)
        .filter(([, value]) => value)
        .map(([key]) => key)
  ).join(' ');

export { classNames, classNames as cn };
