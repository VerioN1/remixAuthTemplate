import {useFocusWithin} from '@mantine/hooks';
import React, {useRef, useState} from 'react';
import type { TextInputProps } from '@mantine/core';
import { createStyles, TextInput as MTextInput } from '@mantine/core';

type Props = TextInputProps


const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
	},
	label:{
		position: 'absolute',
		left: 0,
		padding: '0.7rem 0 0.5rem',
		pointerEvents: 'none',
		letterSpacing: '0.1rem',
		transition: '0.2s',
	},
	input: {
		borderBottom: '2px solid',
		background: 'transparent',
		'&:focus': {
			borderColor: theme.primaryColor
		},
	}
}));

const TextInput = ({children ,...props} : Props) => {
	const {classes} = useStyles()
	const { ref, focused } = useFocusWithin();
	console.log(focused);
	const [isFocus, setIsFocus] = useState(false);
	return (
		<MTextInput ref={ref} onFocus={() => setIsFocus(true)} {...props} radius="xl" labelProps={{className: `${focused ? 'on-input-focus' : ''}`}} variant="unstyled" classNames={classes} >
			{children}
		</MTextInput>
	);
};

export default TextInput;
