import type { PropsWithChildren } from 'react';
import { Authenticator, Button, Card, Flex, View } from '@aws-amplify/ui-react';
import { ThemeStyle } from '@aws-amplify/ui-react/server';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import resourceConfig from '../../../amplify_outputs.json';
import { theme } from './amplifyTheme';
import { signOut } from 'aws-amplify/auth';

Amplify.configure(resourceConfig);

export const AmplifyThemeWrapper = ({ children }: PropsWithChildren) => {
	return (
		<View height="100%" width="100%" {...theme.containerProps()}>
			<Card variation="outlined" height="100%">
				{children}
			</Card>
			<ThemeStyle theme={theme} />
		</View>
	);
};

export const AmplifyWrapper = ({ children }: PropsWithChildren) => {
	return (
		<View height="800px" width="100%" padding="large" {...theme.containerProps()}>
			<Card variation="outlined" height="100%">
				<Authenticator>
					<Flex direction="column" width="100%" height="100%" overflow="hidden">
						<Button
							onClick={() => {
								signOut();
							}}
						>
							Sign out
						</Button>
						<View flex="1">{children}</View>
					</Flex>
				</Authenticator>
				<ThemeStyle theme={theme} />
			</Card>
		</View>
	);
};
