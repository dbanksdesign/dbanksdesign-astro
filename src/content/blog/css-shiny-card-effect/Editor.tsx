import { Sandpack } from '@codesandbox/sandpack-react';

export default function CodeEditor() {
	return (
		<div>
			<Sandpack
				template="static"
				options={{
					showNavigator: true,
				}}
				files={{
					'/index.html': `
<head>
  <title>Parcel Sandbox</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/styles.css" />
</head>

<body>
  <h1>Hello world</h1>
</body>

</html>
          `,
					'/styles.css': `
h1 {
  padding: 10px;
  background: yellow;
}
          `,
				}}
			/>
		</div>
	);
}
