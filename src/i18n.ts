import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported Languages
export const locales = ['en', 'zh'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
