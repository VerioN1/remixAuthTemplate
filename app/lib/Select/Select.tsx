import type { SelectProps } from '@mantine/core/lib/Select';
import { Select as MSelect } from '@mantine/core';

import React from 'react';

type Props = SelectProps

const Select = (props: Props) => {
	return (
		<MSelect {...props}/>
	);
};

export default Select;
