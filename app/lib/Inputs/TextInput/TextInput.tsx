import React, {useEffect, useRef, useState} from 'react';
import type {TextInputProps} from '@mantine/core';
import {createStyles, TextInput as MTextInput} from '@mantine/core';

type Props = TextInputProps


const useStyles = (error: boolean) => createStyles((theme, params) => ({
	root: {
		position: 'relative'
	},
	label: {
		position: 'absolute',
		fontSize: '1.2rem',
		left: 0,
		pointerEvents: 'none',
		letterSpacing: '0.1rem',
		transition: '0.2s'
	},
	wrapper: {
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
			height: `${error ? 0 : '2px'}`,
			background: 'var(--mantine-color-dark-2)'
		}
	},
	input: {
		position: 'relative',
		borderBottom: '2px solid'
	}
}));

const TextInput = ({children, ...props}: Props) => {
	const {classes} = useStyles(!!props.error)();
	const ref = useRef<HTMLInputElement>(null);
	const [hasFocus, setFocus] = useState(false);

	useEffect(() => {
		// @ts-ignore
		if (document.hasFocus() && ref.current && ref.current.contains(document.activeElement)) {
			setFocus(true);
		}
	}, []);

	return (
		<MTextInput ref={ref} {...props} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
					wrapperProps={{className: `asd asd asd asd${hasFocus ? 'on-text-input-focus' : ''}`}}
			// @ts-ignore
					labelProps={{className: `${(hasFocus || ref?.current?.value.length > 0) ? 'on-input-focus' : ''}`}}
					radius="xl" variant="unstyled" classNames={classes}>
			{children}
		</MTextInput>
	);
};

export default TextInput;
