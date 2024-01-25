import { getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title'),
    description: t('desc'),
    keywords: t('keywords'),
  };
}

const inter = Inter({ subsets: ['latin'] });

export default function LocaleLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
