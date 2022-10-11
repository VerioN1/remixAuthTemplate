import type { CheckboxProps } from '@mantine/core';
import { Checkbox as MCheckbox, createStyles } from '@mantine/core';

type Props = CheckboxProps

const Checkbox = (props: Props) => {
	const {children} = props;
	return (
		<MCheckbox {...props} sx={(theme) => ({root: {
				border: 0,
				color: theme.colors.red[2],
			},
			input: {
				cursor:'pointer'
			},
			label: {
				cursor:'pointer'
			}
		})}>
			{children}
		</MCheckbox>
	);
};

export default Checkbox;
