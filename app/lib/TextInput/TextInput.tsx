import React from 'react';
import type { TextInputProps } from '@mantine/core';
import { createStyles, TextInput as MTextInput } from '@mantine/core';

type Props = TextInputProps


const useStyles = createStyles((theme) => ({
	input: {
		borderBottom: '2px solid',
		'&:focus': {
			borderColor: theme.primaryColor
		}
	}
}));

const TextInput = ({children ,...props} : Props) => {
	const {classes} = useStyles()

	return (
		<MTextInput {...props} radius="xl" variant="unstyled" classNames={classes} >
			{children}
		</MTextInput>
	);
};

export default TextInput;
