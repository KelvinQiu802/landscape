import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: {
    locale: string
  }
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
