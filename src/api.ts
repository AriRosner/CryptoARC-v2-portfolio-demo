export function backupDatabase(): void {
  window.alert("Portfolio demo: database backup is disabled in this mock build.");
}

export function exportUrl(target: string): string {
  const payload = {
    target,
    mode: "portfolio-demo",
    exported_at: new Date().toISOString(),
    note: "This export was generated from the public portfolio demo and contains mock data only."
  };
  return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
}

export async function updatePassword(): Promise<void> {
  return Promise.resolve();
}

export async function setupTotp(): Promise<{ secret: string; provisioning_uri: string }> {
  return Promise.resolve({
    secret: "PORTFOLIO-DEMO-TOTP",
    provisioning_uri: "otpauth://totp/CryptoARC%20Demo?secret=PORTFOLIO-DEMO-TOTP"
  });
}

export async function verifyTotp(): Promise<void> {
  return Promise.resolve();
}

export async function disableTotp(): Promise<void> {
  return Promise.resolve();
}
