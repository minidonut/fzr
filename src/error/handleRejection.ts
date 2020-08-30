export async function handleRejection(e: Error): Promise<void> {
  console.log(e);
  process.exit(1);
}
