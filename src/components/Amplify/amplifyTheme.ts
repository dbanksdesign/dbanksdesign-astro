import { createTheme, defineComponentTheme } from '@aws-amplify/ui-react/server';
import { sidebarTheme } from './Sidebar';

const aiConversationTheme = defineComponentTheme({
	name: 'ai-conversation',
	theme: (tokens) => {
		return {
			// height: '100vh',
		};
	},
});

export const theme = createTheme({
	name: 'dbanksdesign',
	components: [aiConversationTheme, sidebarTheme],
	tokens: {
		colors: {
			background: {
				primary: 'var(--color-background-primary)',
				secondary: 'var(--color-background-secondary)',
				tertiary: 'var(--color-background-tertiary)',
				info: 'hsl(from var(--color-brand-primary) h s l/ 0.1)',
				success: 'hsl(from var(--color-brand-success) h s l/ 0.1)',
				error: 'hsl(from var(--color-brand-error) h s l/ 0.1)',
			},
			font: {
				primary: 'var(--color-font-primary)',
				secondary: 'var(--color-font-secondary)',
				tertiary: 'var(--color-font-tertiary)',
				info: 'hsl(from var(--color-brand-primary) h s l/ 0.9)',
				success: 'hsl(from var(--color-brand-success) h s l/ 0.9)',
				error: 'hsl(from var(--color-brand-error) h s l/ 0.9)',
			},
			border: {
				primary: 'var(--color-border-primary)',
				secondary: 'var(--color-border-secondary)',
				tertiary: 'var(--color-border-tertiary)',
			},
			primary: {
				10: 'hsl(from var(--color-brand-primary) h s l/ 0.1)',
				20: 'hsl(from var(--color-brand-primary) h s l/ 0.2)',
				40: 'hsl(from var(--color-brand-primary) h s l/ 0.4)',
				60: 'hsl(from var(--color-brand-primary) h s l/ 0.6)',
				80: 'hsl(from var(--color-brand-primary) h s l/ 0.8)',
				90: 'hsl(from var(--color-brand-primary) h s l/ 0.9)',
				100: 'var(--color-brand-primary)',
			},
		},
		radii: {
			xxs: '0',
			xs: '0',
			small: '0',
			medium: '0',
			large: '0',
		},
		components: {
			checkbox: {
				button: {
					before: {
						borderRadius: '0',
						borderWidth: '1px',
					},
				},
			},
		},
	},
});
