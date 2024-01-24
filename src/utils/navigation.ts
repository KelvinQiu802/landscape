import { locales } from '@/i18n';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

/* https://next-intl-docs.vercel.app/docs/routing/navigation */

export const localePrefix = 'always'; // Default

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: locales, localePrefix });
