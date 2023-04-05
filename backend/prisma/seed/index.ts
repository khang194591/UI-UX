const main = async () => {
  // await (await import('./000-permission')).default();
  // await (await import('./001-role')).default();
  await (await import('./002-account')).default();
  await (await import('./003-profile')).default();
  // await (await import('./999-playground')).default();
};

main();
