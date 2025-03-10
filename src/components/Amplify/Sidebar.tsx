import * as React from 'react';
import { Flex, ScrollView, View } from '@aws-amplify/ui-react';
import { ConversationsContext } from './ConversationsContext';
import { ConversationItem } from './ConversationItem';
import { defineComponentTheme } from '@aws-amplify/ui-react/server';

export const sidebarTheme = defineComponentTheme({
	name: 'sidebar',
	theme: (tokens) => ({
		borderInlineEnd: `1px solid ${tokens.colors.border.secondary}`,
		height: '100%',
		width: '400px',
		display: 'flex',
		flexDirection: 'column',
	}),
});

export const Sidebar = () => {
	const { conversations } = React.useContext(ConversationsContext);

	return (
		<View className={sidebarTheme.className()}>
			<ScrollView flex="1">
				<Flex direction="column" padding="medium">
					{conversations.map((conversation) => (
						<ConversationItem key={conversation.id} conversation={conversation} />
					))}
				</Flex>
			</ScrollView>
		</View>
	);
};
