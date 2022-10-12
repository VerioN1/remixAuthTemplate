import type {ButtonStylesParams, MantineTheme} from '@mantine/core';
import type { MantineThemeOverride } from '@mantine/core';
import type { ColorScheme } from '@mantine/core';

export default ((colorScheme: ColorScheme) => ({
	fontFamily: "Nunito, sans-serif",
	primaryColor: 'violet',
	components: {
		Button: {
			defaultProps:{
				variant: 'light',
				radius: 'xl',
			},
			styles: (theme: MantineTheme, params: ButtonStylesParams & { shadow: boolean }) => ({
				root: {
					border: 0,
					position: 'relative',
					overflow: 'hidden',
					paddingLeft: 20,
					paddingRight: 20,
					boxShadow: params.shadow ? `0 4px 14px 0 ${params.color}` : 'none',
				}
			}),
		},
	},
	colors: {
		// blue: ['#10253E' ,'#10253E', '#102C4C', '#0F3158', '#0D3868', '#0A4281', '#0072F5', '#0952A5', '#0072F5', '#3694FF'],
		red: ['#300313', '#300313', '#44041A', '#5C0523', '#6F062B', '#910838', '#F31260', '#F4256D', '#F75F94', '#FDD8E5'],
		green: ['#042F14', '#06381B', '#074A24', '#0A6130', '#0B7439', '#0F9549', '#17C964', '#41EC8B', '#78F2AD', '#ECFDF4'],
	},
	colorScheme,

}) as MantineThemeOverride)
