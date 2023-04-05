export const getRoutesFromModules = () => {
  const results: Record<string, any> = {}
  const files = import.meta.glob('/**/modules/**/*.router.ts', {
    eager: true,
    import: 'default',
  })
  for (const key in files) {
    const module = key.split('/')[3]
    results[module] = files[key]
  }
  return results
}

export const modulesRoutes = getRoutesFromModules()
