export const getEnLocalesFromModules = () => {
  const results: Record<string, any> = {};
  const files = import.meta.glob("/**/modules/**/en.json", {
    eager: true,
    import: "default",
  });
  for (const key in files) {
    const module = key.split("/")[3];
    results[module] = files[key];
  }
  return results;
};

export const getViLocalesFromModules = () => {
  const results: Record<string, any> = {};
  const files = import.meta.glob("/**/modules/**/vi.json", {
    eager: true,
    import: "default",
  });
  for (const key in files) {
    const module = key.split("/")[3];
    results[module] = files[key];
  }
  return results;
};
