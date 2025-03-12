import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const data = [
	{ name: 'Nov', conv: 2500, gen: 6100 },
	{ name: 'Dec', conv: 5100, gen: 9200 },
	{ name: 'Jan', conv: 6800, gen: 29000 },
	{ name: 'Feb', conv: 14100, gen: 32500 },
];

export function AIKitRequests() {
	return (
		<LineChart width={400} height={400} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line dataKey="gen" stroke="var(--color-brand-secondary)" strokeWidth={2} />
			<Line dataKey="conv" stroke="var(--color-brand-primary)" strokeWidth={2} />
		</LineChart>
	);
}
