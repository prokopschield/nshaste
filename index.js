#!/usr/bin/env node

const log = console.log;

Object.assign(console, {
	log: (arg) => {
		log(`https://hastebin.nodesite.eu/${arg}`);
	},
});

if (process.argv.length > 2) {
	process.argv.splice(2, 0, 'upload');
	require('nodesite-cdn/lib/cli');
} else {
	const buffers = [];
	process.stdin.on('data', (chunk) => buffers.push(Buffer.from(chunk)));
	process.stdin.on('end', () =>
		require('nodesite-cdn/lib/upload')
			.upload_buffer(Buffer.concat(buffers))
			.then(console.log)
			.then(() => process.exit(0))
	);
}
