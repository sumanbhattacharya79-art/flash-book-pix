/**
 * In-app view tracking (auto-wired by intentlm-bootstrap when route map exists).
 */
export function setAppView(viewId: string): void {
  if (typeof window === 'undefined') return
  const ilm = (window as Window & { intentLM?: { setView: (id: string) => void } }).intentLM
  ilm?.setView(viewId)
}

function globToRegExp(glob: string): RegExp {
  const DEEP = '\x00D\x00'
  const escaped = glob
    .replace(/\*\*/g, DEEP)
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '[^/]*')
    .replace(new RegExp(DEEP, 'g'), '.*')
    .replace(/:([a-zA-Z_]+)/g, '[^/]+')
  return new RegExp('^' + escaped + '(?:[?#].*)?$')
}

export function setAppViewFromPath(
  pathname: string,
  routeViews: Record<string, string>,
): void {
  const path = pathname.split('#')[0] ?? pathname
  const entries = Object.entries(routeViews).sort(
    (a, b) => b[0].length - a[0].length || b[0].localeCompare(a[0]),
  )
  for (const [glob, viewId] of entries) {
    if (globToRegExp(glob).test(path)) {
      setAppView(viewId)
      return
    }
  }
}

/** Call once after intentLM.init — keeps views in sync with URL (any SPA router). */
export function wireIntentLMRouteSync(
  routeViews: Record<string, string>,
): void {
  if (typeof window === 'undefined') return
  const sync = () =>
    setAppViewFromPath(window.location.pathname + window.location.search, routeViews)

  sync()

  const origPush = history.pushState.bind(history)
  history.pushState = function (...args: Parameters<History['pushState']>) {
    origPush(...args)
    sync()
  }
  const origReplace = history.replaceState.bind(history)
  history.replaceState = function (...args: Parameters<History['replaceState']>) {
    origReplace(...args)
    sync()
  }
  window.addEventListener('popstate', sync)
}
