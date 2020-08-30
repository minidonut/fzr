export async function handleException(e: Error): Promise<void> {
  console.log(e);
  process.exit(1);
}
