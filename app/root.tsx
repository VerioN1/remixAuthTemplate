import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { createEmotionCache } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import styles from './styles/global.css';
import TwStyles from './styles/app.css';
import { isDarkMode } from '~/utils/cookies';
import AppProviders from '~/components/AppProviders/AppProviders';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'SWAI',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
    return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: TwStyles }];
}

createEmotionCache({ key: 'mantine' });

export const action: ActionFunction =async ({request}) => {
    const cookieHeader = request.headers.get("Cookie");
    const userColorMode = await isDarkMode.parse(cookieHeader);

    if(userColorMode === 'dark'){
        return json({},
            {
                headers: {
                    "Set-Cookie": await isDarkMode.serialize("light")
                }
            })
    }else{
        return json({},
            {
                headers: {
                    "Set-Cookie": await isDarkMode.serialize("dark")
                }
            })
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const message = await isDarkMode.parse(cookieHeader)

    return json({message});
}

export default function App() {
    const {message}  = useLoaderData();


    return (
    <AppProviders initialColorMode={message}>
        <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </body>
        </html>
</AppProviders>
  );
}
