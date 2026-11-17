// A template re-mounts on every navigation (a layout does not), so its CSS animation replays per page.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
