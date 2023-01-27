export default function isLastestNotice(date) {
	const now = new Date();
	const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
	const koreaTimeDiff = 9 * 60 * 60 * 1000;
	let today = new Date(utcNow + koreaTimeDiff);

	let yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	yesterday = yesterday.toISOString().substring(0, 10);
	today = today.toISOString().substring(0, 10);
	if (date === today || date === yesterday)
		return true;
	else
		return false;
}
