import { Button as MButton, createStyles } from '@mantine/core';
import type {ButtonProps, MantineColor } from '@mantine/core';
import { useEffect, useState } from 'react';

const useStyles = (color: MantineColor|undefined, shadow: boolean | undefined) => createStyles((theme) => ({
	root: {
		backgroundColor:theme.colors[color || theme.primaryColor][6],
		border: 0,
		position: 'relative',
		overflow:'hidden',
		paddingLeft: 20,
		paddingRight: 20,
		boxShadow: shadow ? `0 4px 14px 0 ${theme.colors[color || theme.primaryColor][6]}` : 'none',
		'&:hover': {
			backgroundColor: theme.fn.darken(theme.colors[color || theme.primaryColor][6], 0.05),
		},
	}
}));


const Button = (props: ButtonProps & {onClick?: Function, shadow?: boolean}) => {
	const {onClick, color, shadow} = props;
	const { classes } = useStyles(color, shadow)();
	const [coords, setCoords] = useState({ x: -1, y: -1 });
	const [isRippling, setIsRippling] = useState(false);

	useEffect(() => {
		if (coords.x !== -1 && coords.y !== -1) {
			setIsRippling(true);
			setTimeout(() => setIsRippling(false), 300);
		} else setIsRippling(false);
	}, [coords]);

	useEffect(() => {
		if (!isRippling) setCoords({ x: -1, y: -1 });
	}, [isRippling]);


	return (
		<MButton {...props}
			radius="xl"
				 color={color}
			classNames={classes}
				 onClick={(e: any) => {
					 const rect = e.target.getBoundingClientRect();
					 setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
					 onClick && onClick(e);
				 }}>
			{isRippling ? (
				<span
					className="ripple"
					style={{
						left: coords.x,
						top: coords.y
					}}
				/>
			) : (
				''
			)}
			<span className="content">{props.children}</span>
		</MButton>
	);
};

export default Button;
