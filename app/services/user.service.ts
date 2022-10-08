import {createCookieSessionStorage, redirect} from '@remix-run/node';
import jwt_decode from 'jwt-decode';
import invariant from 'tiny-invariant';

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '__session',
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secrets: [process.env.SESSION_SECRET],
		secure: process.env.NODE_ENV === 'production'
	}
});

const USER_SESSION_KEY = 'user-token';

export async function getSession(request: Request) {
	const cookie = request.headers.get('Cookie');
	return sessionStorage.getSession(cookie);
}

export async function getUserToken(
	request: Request
): Promise<string | undefined> {
	const session = await getSession(request);
	return session.get(USER_SESSION_KEY);
}

export async function requireUserToken(
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) {
	const userJwt = await getUserToken(request);
	if (!userJwt) {
		const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
		throw redirect(`/login?${searchParams}`);
	}
	return jwt_decode(userJwt);
}

export async function createUserSession({
											request,
											userJwt,
											remember,
											redirectTo
										}: {
	request: Request;
	userJwt: string;
	remember: boolean;
	redirectTo: string;
}) {
	const session = await getSession(request);
	session.set(USER_SESSION_KEY, userJwt);
	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session, {
				maxAge: remember
					? 60 * 60 * 24 * 7 // 7 days
					: undefined
			})
		}
	});
}

export async function logout(request: Request) {
	const session = await getSession(request);
	return redirect('/', {
		headers: {
			'Set-Cookie': await sessionStorage.destroySession(session)
		}
	});
}
