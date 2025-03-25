_This issue is a Request For Comments (RFC). It is intended to elicit community feedback regarding a proposed change to the library. Please feel free to post comments or questions here._

## Summary

The existing `@aws-amplify/ui-*` packages successfully reduced the level of effort to create cross-framework components (e.g. [`<Chatbot>`](https://github.com/aws-amplify/amplify-js/pull/6684)) for web, but led to certain technical limitations (e.g. fine-grained customizability of the UI styling, password manager support) that prevented customers from using the Authenticator in production apps.

The next major release of the `Authenticator` resolves long-standing customers issues ([Related Issues](https://quip-amazon.com/pZMSAzbx44dc#GXZ9CAGdaFG)) with the existing `@aws-amplify/ui-*` packages and creates a foundation to ensure cross-framework (e.g. Angular, React, React Native, Vue) and cross-platform (e.g. Android, iOS, Flutter) feature parity & stability.

## Goals

- **Zero-config** – The Authenticator automatically infers Amplify CLI & Admin UI settings to work out-of-the-box.
- **Native** – The Authenticator is implemented in its respective framework (e.g. Angular, React, Vue) for consistency & familiarity.
- **Stable** – Existing & upcoming Authenticator behavior is captured & tested to reduce & prevent regressions.
- **Interoperable** – Work with password managers, autofill, existing styles, & other common features.
- **Customizable** – More ways to customize the UI & behavior without losing the benefits of the Authenticator.
- **Reproducible** – Authentication is complex. The Authenticator is is developed & tested against a myriad of Amplify backends, example apps, and specifications.

## Getting Started Examples

Customers can wrap their single-page app (SPA) or pages to gate content behind Authentication.

### React & React Native

```jsx
import { withAuthenticator } from '@aws-amplify/ui-react';
// or
import { withAuthenticator } from '@aws-amplify/ui-react-native';

function App({ user }) {
	return <h1>Welcome {user.username}</h1>;
}

export default withAuthenticator(App);
```

### Vue.js v3

```vue
<authenticator>
  <template v-slot="{ user }">
    <h1>
        Welcome, {{ user.username }}
    </h1>
  </template>
</authenticator>
```

### Angular

Customers can use `amplify-authenticator` to add basic authentication:

```html
<amplify-authenticator>
	<ng-template amplifySlot="authenticated" let-user="user">
		<h1>Welcome, {{ user.username }}</h1>
	</ng-template>
</amplify-authenticator>
```

## Headless UI Examples

All of the functionality of the the Authenticator is available to customers without a requiring the default UI. This allows full control over state, transitions, and access to the Authenticator’s `user` or `session`.

### React & React Native

```jsx
import { Authenticator, useAuth } from '@aws-amplify/ui-react';
// or
import { Authenticator, useAuth } from '@aws-amplify/ui-react-native';

export default function App() {
	const { state, user, signOut } = useAuthenticator();

	if (state !== 'authenticated') {
		return <Authenticator />;
	}

	return (
		<>
			<h1>Welcome {user.username}!</h1>
			<button onClick={signOut}>Sign Out</button>
		</>
	);
}
```

### Vue.js v3

```vue
<template>
	<authenticator>
		<h1>Welcome {{ user.username }}!</h1>
		<button @click="signOut">Sign Out</button>
	</authenticator>
</template>

... setup() { const { user, signOut } = useAuth() return { user, signOut } }
```

### Angular

```ts
// app.component.ts
import { AuthContextService } from '@aws-amplify/ui-angular';

export class AppComponent {
	constructor(private authContext: AuthContextService) {}

	signOut() {
		this.authContext.services.signOut();
	}
}
```

```html
// app.component.html
<amplify-authenticator *ngIf="authContext.state !== 'authenticated'" />

<ng-container *ngIf="authContext.state === 'authenticated'">
	<h1>
		<h1>Welcome {authContext.user.username}!</h1>
		<button (click)="signOut()">Sign Out</button>
	</h1>
</ng-container>
```

## Styling Examples

### React, Angular, & Vue

By default, the Authenticator is unstyled. Customers deploying web apps can opt-in to styles in their application with:

```tsx
import '@aws-amplify/ui-react/styles.css';
// or
import '@aws-amplify/ui-vue/styles.css';
// or
import '@aws-amplify/ui-angular/styles.css';
```

The Authenticator’s UI inherits a default theme generated from our design tokens. These values will customize the appearance of all Amplify UI components:

```html
<style>
	:root {
		--amplify-accent-color: rebecaapurple;
	}
</style>
```

The Authenticator’s elements can be customized via traditional classes:

```css
.amplify-authenticator .amplify-button[type='submit'] {
	background: rebecaapurple;
	border-radius: 3px;
}
```

Or with `data-*` attributes, which reflect the current state of a component:

```css
[data-amplify-authenticator='signup.pending'] .amplify-button {
	opacity: 0.5;
}
```

### React Native

The Authenticator supports a `theme` object based on our design tokens and can be customized with a top-level `AmplifyProvider`:

```tsx
import { AmplifyProvider, withAuthenticator } from '@aws-amplify/ui-react-native';

function App() {
	return <AmplifyProvider theme={{ accentColor: '#663399' }}>...</AmplifyProvider>;
}

export default withAuthenticator(App);
```

## Custom Component Examples

Customizing the appearance of the Authenticator is a common need – whether this means replacing buttons, adding fields to a form, or replacing a screen entirely.

To accomplish this, customers can replace named “slots” in the Authenticator entirely, or prepend/append their own UI.

_(More complex examples will be provided in our documentation)_

### React & React Native

```tsx
export default function App() {
	return (
		<AmplifyProvider
			components={{
				AuthenticatorSignUp: MyCustomSignUpScreen,
			}}
		>
			...
		</AmplifyProvider>
	);
}
```

### Vue.js v3

```vue
<authenticator>
  <template #sign-up>...</template>
</authenticator>
```

### Angular

```html
<amplify-authenticator>
	<ng-template amplifySlot="signUp">...</ng-template>
</amplify-authenticator>
```

## Detailed Design

The primary changes are that native framework implementations are powered by an underlying state machine. This state machine ensures consistency & correctness of authentication flows across all platforms, while also being available for customers to use with or without the Authenticator’s default UI.

> ![amplify-ui](https://user-images.githubusercontent.com/15182/130264714-9cde13f7-06dc-4321-a853-58461df8a935.png) > <img width="977" alt="Screen Shot 2021-04-07 at 11 55 45 AM" src="https://user-images.githubusercontent.com/15182/130264719-808367da-f88a-467e-bc16-76eb3a7b3b1c.png">

## Drawbacks

- Theme tokens & CSS Variables will change (see: [Theming](https://docs.amplify.aws/ui/customization/theming/q/framework/react/)) to match our new design system.
- Web Component implementation doesn’t exist by default – this will require a new release of `@aws-amplify/ui-components`.
- Each framework has a different answer for component customization (e.g. `AmplifyProvider` for React, `ng-template` for Angular, `template` for Vue). We opted for consistency with the underlying framework vs. consistency with across all Authenticator APIs.
- New features & frameworks require separate implementations. For JS implementations, this only means a light UI layer. However, v2 includes feature specifications & tests for tracking feature parity & regressions.

## Adoption Strategy

1. Solicit feedback to RFCs.
2. Publish technical preview releases to `@next` on NPM.
3. Interact with customers' issues to gather feedback & validation for `@next`.
4. Once resolving sufficient feedback, promote `@next` to `@latest`.

- Non-Authenticator components (e.g. `S3Image`, `Chatbot`) are re-exporting their existing implementation alongside the new Authenticator.
- `aws-amplify-react` (etc.) are already deprecated as “legacy” packages. No further changes will be made to them.

## Related Issues

- [Auth components don't support scopes](https://github.com/aws-amplify/amplify-js/issues/5703#)
- [Automatically infer `usernameAttribute` (name may change) from `aws-exports.js`](https://github.com/aws-amplify/amplify-cli/issues/3550)
- [Allow deep-linking initial state (e.g. “Forgot Password”)](https://github.com/aws-amplify/amplify-js/issues/7668) ([2](https://github.com/aws-amplify/amplify-js/issues/6641), [Email Verification](https://github.com/aws-amplify/amplify-js/issues/4890), [TOTP](https://github.com/aws-amplify/amplify-js/issues/8575))
- [Not show “Create Account” link if user signups are disabled](https://github.com/aws-amplify/amplify-js/issues/7685) ([2](https://github.com/aws-amplify/amplify-js/issues/7357))
- [Support custom “Confirm Password” on Sign Up screen](https://github.com/aws-amplify/amplify-js/issues/5828) ([2](https://github.com/aws-amplify/amplify-js/issues/7249))
- Support formatting inputs (e.g. trimming space, lowercasing emails) before proceeding
- [Support both Cognito IDP & CUP for federation](https://github.com/aws-amplify/amplify-js/issues/7622) ([2](https://github.com/aws-amplify/amplify-js/issues/6760))
- [Only bundle components used](https://github.com/aws-amplify/amplify-js/issues/7484)
- [Support customization via CSS selectors](https://github.com/aws-amplify/amplify-js/issues/7410) ([2](https://github.com/aws-amplify/amplify-js/issues/6351))
- [Not show errors as toast notifications](https://github.com/aws-amplify/amplify-js/issues/7259)
- [Have accessible error messages](https://github.com/aws-amplify/amplify-js/issues/5304)
- [Auto-dismiss toast notifications](https://github.com/aws-amplify/amplify-js/issues/7259)
- [Support custom footer (e.g. legal text)](https://github.com/aws-amplify/amplify-js/issues/7239)
- [Show Google/Facebook/etc. buttons on Sign Up](https://github.com/aws-amplify/amplify-js/issues/7238) ([2](https://github.com/aws-amplify/amplify-js/issues/5253), [3](https://github.com/aws-amplify/amplify-js/issues/5651))
- [Combine Sign Up / Sign In screen](https://github.com/aws-amplify/amplify-js/issues/7238) ([2](https://github.com/aws-amplify/amplify-js/issues/4637))
- [Hide “Sign in with AWS” button](https://github.com/aws-amplify/amplify-js/issues/7199)
- [Support custom subtitle on TOTP screen](https://github.com/aws-amplify/amplify-js/issues/7186)
- [Re-render when I18n has changed](https://github.com/aws-amplify/amplify-js/issues/6986)
- [Should prompt to save password on submit](https://github.com/aws-amplify/amplify-js/issues/6782) ([2](https://github.com/aws-amplify/amplify-js/issues/7837))
- [Support headless UI](https://github.com/aws-amplify/amplify-js/issues/6751) ([2](https://github.com/aws-amplify/amplify-js/issues/4637), [3](https://github.com/aws-amplify/amplify-js/issues/3470), [4](https://github.com/aws-amplify/amplify-js/issues/2075), [5](https://github.com/aws-amplify/amplify-js/issues/1031), [6](https://github.com/aws-amplify/amplify-js/issues/474), [7](https://github.com/aws-amplify/amplify-js/issues/3196), [8](https://github.com/aws-amplify/amplify-js/issues/940), [10](https://github.com/aws-amplify/amplify-js/issues/2691), [11](https://github.com/aws-amplify/amplify-js/issues/1436), [12](https://github.com/aws-amplify/amplify-js/issues/2691), [13](https://github.com/aws-amplify/amplify-js/issues/474))
- [Use custom input `type`s](https://github.com/aws-amplify/amplify-js/issues/6689)
- [Disable autocomplete on username](https://github.com/aws-amplify/amplify-js/issues/5048)
- [Support password managers](https://github.com/aws-amplify/amplify-js/issues/5782) ([2](https://github.com/aws-amplify/amplify-js/issues/3050), [3](https://github.com/aws-amplify/amplify-js/issues/4374))
- [Support `autoConfirmUser` in Sign Up flow](https://github.com/aws-amplify/amplify-js/issues/5314)
- [Support `PreSignup` lambda error messages](https://github.com/aws-amplify/amplify-js/issues/5911)
- [Not render `<App />` by default when not signed in](https://github.com/aws-amplify/amplify-js/issues/6087)
- [Handle expired verification codes](https://github.com/aws-amplify/amplify-js/issues/6402)
- [Support Terms of Service that disables signup](https://github.com/aws-amplify/amplify-js/issues/6440) ([2](https://github.com/aws-amplify/amplify-js/pull/6502))
- [Customize components](https://github.com/aws-amplify/amplify-js/issues/6479) ([2](https://github.com/aws-amplify/amplify-js/issues/3936), [3](https://github.com/aws-amplify/amplify-js/issues/1436))
- [Support custom fields on Sign Up](https://github.com/aws-amplify/amplify-js/issues/6603)
- Hook into events for analytics
- [Customize phone input](https://github.com/aws-amplify/amplify-js/issues/4291) ([2](https://github.com/aws-amplify/amplify-js/issues/2632))
- [Works seamlessly with Material UI and other ui libraries](https://github.com/aws-amplify/amplify-js/issues/7794) ([2](https://github.com/aws-amplify/amplify-js/issues/6388))
- Pass in client metadata for `<AmplifySignUp />`:
- And more...
  - https://github.com/aws-amplify/amplify-js/issues/6570
  - https://github.com/aws-amplify/amplify-js/issues/3815
  - https://github.com/aws-amplify/amplify-js/issues/6668
  - https://github.com/aws-amplify/amplify-js/issues/4291
  - https://github.com/aws-amplify/amplify-js/issues/2632
  - https://github.com/aws-amplify/amplify-js/issues/3279
  - https://github.com/aws-amplify/amplify-js/milestone/13
