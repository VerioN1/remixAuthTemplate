import { useMatchesData } from '~/hooks/useMatchesData';
import type { User } from '~/types/user.type';

export function useOptionalUser(): User | undefined {
	const data = useMatchesData("root");
	if (!data) {
		return undefined;
	}
	return data.user as User;
}

export function useUser(): User {
	const maybeUser = useOptionalUser();
	if (!maybeUser) {
		throw new Error(
			"No user found in root loader. If user is optional, try useOptionalUser instead."
		);
	}
	return maybeUser;
}
