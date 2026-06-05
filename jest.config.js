module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.base.json' }],
	},
	modulePathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/packages/.*/dist/'
	],
	moduleNameMapper: {
		// Map "packages/" imports to actual package paths for integration tests
		'^packages/(.*)$': '<rootDir>/packages/$1',

		// Map @jsbarcode/ scoped workspace packages directly to their TS sources
		'^@jsbarcode/renderer-canvas$': '<rootDir>/packages/renderer/canvas/src',
		'^@jsbarcode/renderer-svg$': '<rootDir>/packages/renderer/svg/src',
		'^@jsbarcode/core$': '<rootDir>/packages/core/src',
		'^@jsbarcode/(.*)$': '<rootDir>/packages/barcodes/$1/src',
	}
};
