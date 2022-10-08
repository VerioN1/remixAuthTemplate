import React from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { Button } from '~/lib';
import { useSubmit } from '@remix-run/react';

const DarkModeSwitch = () => {
	const submit = useSubmit();
	const { toggleColorScheme } = useMantineColorScheme();
	const onClick = (event: any) =>{
		submit(null,{ method: "post", action:'/' })
		toggleColorScheme()
	}
	return (
			<Button type="submit" onClick={onClick}>
				switch mode
			</Button>
	);
};

export default DarkModeSwitch;
