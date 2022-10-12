import React, {useEffect, useRef, useState} from 'react';
import type { PasswordInputProps} from '@mantine/core';
import {createStyles, PasswordInput as MPassInput} from '@mantine/core';

type Props = PasswordInputProps;

const useStyles = (error: boolean) => createStyles((theme) => ({
	root: {
		position: 'relative',
	},
	label:{
		position: 'absolute',
		fontSize: '1.2rem',
		left: 0,
		pointerEvents: 'none',
		letterSpacing: '0.1rem',
		transition: '0.2s',
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
	},
	innerInput:{
		padding: '0',
	}
}));

const PasswordInput = (props: Props) => {
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
		<MPassInput ref={ref} {...props} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
					className={`${hasFocus ? 'on-text-input-focus' : ''} ${props.className}`}
			// @ts-ignore
					labelProps={{className: `${(hasFocus||ref?.current?.value.length > 0 ) ? 'on-input-focus' : ''}`}}
					radius="xl"  variant="unstyled" classNames={classes}/>
	);
};

export default PasswordInput;
