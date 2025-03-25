import {
	createStorageBrowser,
	createAmplifyAuthAdapter,
} from '@aws-amplify/ui-react-storage/browser';
import { AmplifyThemeWrapper } from './Wrapper';
import { Amplify } from 'aws-amplify';
import resourceConfig from '../../../amplify_outputs.json';

Amplify.configure(resourceConfig);

const { StorageBrowser } = createStorageBrowser({
	config: createAmplifyAuthAdapter(),
});

export function StorageBrowserDemo() {
	return (
		<AmplifyThemeWrapper>
			<StorageBrowser />
		</AmplifyThemeWrapper>
	);
}
