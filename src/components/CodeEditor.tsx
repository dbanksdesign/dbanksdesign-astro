import {
	SandpackProvider,
	SandpackLayout,
	SandpackFileExplorer,
	SandpackCodeEditor,
	SandpackPreview,
	type SandpackProviderProps,
} from '@codesandbox/sandpack-react';

interface CodeEditorProps extends SandpackProviderProps {
	showTabs?: boolean;
}

export default function CodeEditor({
	template = 'static',
	files = {},
	showTabs = true,
}: CodeEditorProps) {
	return (
		<SandpackProvider files={files} theme="light" template={template}>
			<SandpackLayout>
				<SandpackCodeEditor showTabs={showTabs} />
				<SandpackPreview />
			</SandpackLayout>
		</SandpackProvider>
	);
}
