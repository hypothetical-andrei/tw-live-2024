export function navigateTo(path, params = {}) {
	const queryString = new URLSearchParams(params).toString();
	window.location.hash = `${path}${queryString ? `?${queryString}` : ''}`;
}