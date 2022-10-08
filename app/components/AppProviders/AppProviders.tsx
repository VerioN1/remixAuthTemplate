import type { ReactNode} from 'react';
import React, { useState } from 'react';
import type { ColorScheme} from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import customTheme from '~/styles/customTheme';

type Props = {
	initialColorMode: ColorScheme,
	children: ReactNode
}

const AppProviders = ({initialColorMode, children}: Props) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorMode || 'light');

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
	};

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={customTheme(colorScheme)} withCSSVariables withGlobalStyles>
				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default AppProviders;
