export function isCabinetRoute(pathname: string) {
  return (
    pathname.startsWith("/login")
    || pathname.startsWith("/register")
    || pathname.startsWith("/dashboard")
  );
}
