import { AIConversation } from '@aws-amplify/ui-react-ai';
import { client, useAIConversation } from './client';
import ReactMarkdown from 'react-markdown';
import { ConversationsContext } from './ConversationsContext';
import { useContext } from 'react';

export const Chat = () => {
	const { currentConversation } = useContext(ConversationsContext);

	return <AIChat key={currentConversation?.id} id={currentConversation?.id} />;
};

const AIChat = ({ id }: { id?: string }) => {
	const [
		{
			data: { messages, conversation },
			isLoading,
			hasError,
			messages: errorMessages,
		},
		sendMessage,
	] = useAIConversation('chat', { id });
	const { updateConversation } = useContext(ConversationsContext);

	if (hasError && errorMessages) {
		return (
			<div>
				<h2>Error</h2>
				<ul>
					{errorMessages.map((message, i) => (
						<li key={i}>{message.message}</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<AIConversation
			messages={messages}
			isLoading={isLoading}
			handleSendMessage={(message) => {
				if (!conversation?.name) {
					client.generations
						.chatNamer({
							content: message.content
								.map((content) => ('text' in content ? (content.text ?? '') : ''))
								.join(''),
						})
						.then((res) => {
							if (res.data?.name) {
								if (conversation?.id) {
									updateConversation({
										id: conversation.id,
										name: res.data.name,
									});
								}
							}
						});
				}
				sendMessage(message);
			}}
			allowAttachments
			messageRenderer={{
				text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
			}}
			welcomeMessage=""
		/>
	);
};
