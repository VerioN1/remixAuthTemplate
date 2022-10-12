import type { ReactNode } from 'react';
import React from 'react';
import { useOptionalUser } from '~/hooks/useUser';
import {
	AppShell,
	Group,
	Header,
	Navbar,
	Title,
	Anchor,
	Text,
	Stack,
} from "@mantine/core";
import { Button } from '~/lib';
import { Link } from '@remix-run/react';
import DarkModeSwitch from '~/components/DarkModeSwitch/DarkModeSwitch';

type Props = {
	children: ReactNode
}

const Layout = ({children} : Props) => {
	const user = useOptionalUser()
	if(user){
		return (
			<AppShell
				padding="md"

				header={
					<Header height={60}>
						<Group sx={{ height: "100%" }} px={20} position="apart">
							<Anchor component={Link} to="." variant="gradient">
								<Title order={1}>SoftwareAeye</Title>
							</Anchor>

							<Text>user email</Text>

							<Group>
								<DarkModeSwitch/>

							</Group>
						</Group>
					</Header>
				}
				styles={(theme) => ({
					main: {
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				})}
			>
				{children}
			</AppShell>
		)
	}
	return (
		<div className="flex justify-center items-center h-screen">
			{children}
		</div>
	);
};

export default Layout;
