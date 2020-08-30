export function handleRejection(e: Error): Promise<void> {
  // catch promise rejection to exception handler
  throw e;
}
