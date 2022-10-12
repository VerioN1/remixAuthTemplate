import {Loader} from '@mantine/core';
import type {
	ActionFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { createUserSession, getUserToken } from "~/services/user.service";
import { safeRedirect } from "~/utils/helperFunctions";
import {Button, Checkbox, PasswordInput, TextInput} from '~/lib';

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await getUserToken(request);
	if (userId) return redirect("/");
	return null;
};

interface ActionData {
	errors?: {
		email?: string;
		password?: string;
	};
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const redirectTo = safeRedirect('/', "/");
	const remember = formData.get("remember");

	if (typeof password !== "string" || password.length === 0) {
		return json<ActionData>(
			{ errors: { password: "Password is required" } },
			{ status: 400 }
		);
	}

	if (password.length < 8) {
		return json<ActionData>(
			{ errors: { password: "Password is too short" } },
			{ status: 400 }
		);
	}
	const user = {
		email,
		jwt: 'hello'
	};

	if (!user) {
		return json<ActionData>(
			{ errors: { email: "Invalid email or password" } },
			{ status: 400 }
		);
	}

	return createUserSession({
		request,
		userJwt: user.jwt,
		remember: remember === "on",
		redirectTo,
	});
};

export const meta: MetaFunction = () => {
	return {
		title: "Login",
	};
};

export default function LoginPage() {
	const [searchParams] = useSearchParams();
	const actionData = useActionData() as ActionData;
	const emailRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (actionData?.errors?.email) {
			emailRef.current?.focus();
		} else if (actionData?.errors?.password) {
			passwordRef.current?.focus();
		}
	}, [actionData]);

	return (
		<div className="flex min-h-full flex-col justify-center">
			<div className="mx-auto w-full max-w-md px-8">
				<Form method="post" className="space-y-6" noValidate>
						<div className="mt-1">
							<TextInput
								required
								autoFocus={true}
								name="email"
								label="Email address"
								type="email"
								autoComplete="email"
							/>
						</div>
						<PasswordInput
							required
							name="password"
							label="Password"
							error={actionData?.errors?.password}
						/>
					<Button type="submit">Log in</Button>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Checkbox label="Remember me" name="remember" />
						</div>
						<div className="text-center ml-2 text-sm text-gray-500">
							Don't have an account?{" "}
							<Link
								className="text-blue-500 underline"
								to={{
									pathname: "/join",
									search: searchParams.toString(),
								}}
							>
								Sign up
							</Link>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}
