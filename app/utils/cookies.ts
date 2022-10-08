import { createCookie } from '@remix-run/node';

export const isDarkMode = createCookie('color-scheme-dark',{ maxAge: 60 * 60 * 24 * 30 } );
