import {Button as MButton} from '@mantine/core';
import type {ButtonProps} from '@mantine/core';
import {useEffect, useState} from 'react';


const Button = (props: ButtonProps & { onClick?: Function, shadow?: boolean }) => {
	const {onClick} = props;
	const [coords, setCoords] = useState({x: -1, y: -1});
	const [isRippling, setIsRippling] = useState(false);

	useEffect(() => {
		if (coords.x !== -1 && coords.y !== -1) {
			setIsRippling(true);
			setTimeout(() => setIsRippling(false), 300);
		} else setIsRippling(false);
	}, [coords]);

	useEffect(() => {
		if (!isRippling) setCoords({x: -1, y: -1});
	}, [isRippling]);


	return (
		<MButton {...props}
				 onClick={(e: any) => {
					 const rect = e.target.getBoundingClientRect();
					 setCoords({x: e.clientX - rect.left, y: e.clientY - rect.top});
					 onClick && onClick(e);
				 }}>
			{isRippling && (
				<span
					className="ripple"
					style={{
						left: coords.x,
						top: coords.y
					}}
				/>
			)}
			<span className="content">{props.children}</span>
		</MButton>
	);
};

export default Button;
