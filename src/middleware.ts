import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en',
})

/* Turn ['en', 'zh'] into 'en|zh' */
function getLocalsString(locales: string[]) {
  return locales.join('|')
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', `/(${getLocalsString(locales)})/:path*`],
}
