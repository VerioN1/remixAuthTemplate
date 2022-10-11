import React from 'react';
import type { SwitchProps } from '@mantine/core';
import { Switch as MSwitch } from '@mantine/core';

type Props = SwitchProps

const Switch = (props: Props) => {
	return (
		<MSwitch {...props}/>
	);
};

export default Switch;
