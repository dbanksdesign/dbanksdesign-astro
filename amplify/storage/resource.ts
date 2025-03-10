import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
	name: 'storage',
	access: (allow) => ({
		'personal/{entity_id}/*': [allow.entity('identity').to(['read', 'write', 'delete'])],
		'public/*': [
			allow.authenticated.to(['read', 'write', 'delete']),
			allow.guest.to(['read', 'write', 'delete']),
		],
	}),
});
