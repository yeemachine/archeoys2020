import App from './App.svelte';

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
}

const app = new App({
	target: document.body
});

export default app;
