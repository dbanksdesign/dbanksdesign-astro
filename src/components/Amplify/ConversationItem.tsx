import * as React from 'react';
import { Button, Flex, Menu, MenuButton, MenuItem, TextField, View } from '@aws-amplify/ui-react';
// import {
//   LuCheck,
//   LuMoreVertical,
//   LuPencil,
//   LuTrash2,
//   LuX,
// } from "react-icons/lu";

import { ConversationsContext } from './ConversationsContext';
import type { Conversation } from './client';

interface FormElements extends HTMLFormControlsCollection {
	conversationName: HTMLInputElement;
}
interface ConversationFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

export const ConversationItem = ({ conversation }: { conversation: Conversation }) => {
	const { deleteConversation, updateConversation, setCurrentConversation, currentConversation } =
		React.useContext(ConversationsContext);
	const [editing, setEditing] = React.useState(false);
	const isCurrent = currentConversation?.id === conversation.id;

	const handleSubmit = (e: React.FormEvent<ConversationFormElement>) => {
		e.preventDefault();
		updateConversation({
			...conversation,
			name: e.currentTarget.elements.conversationName.value,
		});
		setEditing(false);
	};

	return (
		<Flex data-current={isCurrent} direction="row" key={conversation.id} alignItems="center">
			<Flex direction="column" flex="1">
				{editing ? (
					<View as="form" onSubmit={handleSubmit}>
						<TextField
							label="Conversation name"
							name="conversationName"
							labelHidden
							defaultValue={conversation.name}
							variation="quiet"
							innerEndComponent={
								<>
									<Button
										size="small"
										onClick={() => {
											setEditing(false);
										}}
										variation="link"
									>
										X
									</Button>
									<Button size="small" type="submit" variation="link">
										?
									</Button>
								</>
							}
						/>
					</View>
				) : (
					<Button
						variation="link"
						textAlign="left"
						justifyContent="flex-start"
						onClick={() => {
							setCurrentConversation(conversation);
						}}
					>
						{conversation.name ?? 'New conversation'}
					</Button>
				)}
			</Flex>
			<Menu size="small" trigger={<MenuButton size="small">...</MenuButton>}>
				<MenuItem gap="xs" onClick={() => setEditing(!editing)}>
					<span>Rename</span>
				</MenuItem>
				<MenuItem gap="xs" onClick={() => deleteConversation({ id: conversation.id })}>
					<span>Delete</span>
				</MenuItem>
			</Menu>
		</Flex>
	);
};
