import { Flex } from '@aws-amplify/ui-react';
import { AmplifyWrapper } from './Wrapper';
import { Sidebar } from './Sidebar';
import { Chat } from './Chat';
import { ConversationsProvider } from './ConversationsContext';

export const AIKitDemo = () => {
	return (
		<AmplifyWrapper>
			<ConversationsProvider>
				<Flex direction="row" width="100%" height="100%" overflow="hidden">
					<Sidebar />
					<Chat />
				</Flex>
			</ConversationsProvider>
		</AmplifyWrapper>
	);
};
