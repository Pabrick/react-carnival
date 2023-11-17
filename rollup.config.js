import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import styles from 'rollup-plugin-styles';
import dts from 'rollup-plugin-dts';

import * as packageJson from './package.json';

const commonJsConfig = {
	file: packageJson.main,
	format: 'cjs',
	sourcemap: true,
};
const esModuleConfig = {
	file: packageJson.module,
	format: 'es',
	sourcemap: true,
};

const rollupConfig = [
	{
		input: 'src/index.ts',
		output: [commonJsConfig, esModuleConfig],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			styles({
				mode: 'inject',
			}),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				declarationDir: packageJson.buildFolder,
				exclude: ['**/workbench/*.*', '**/tests/*.*'],
			}),
			terser(),
			json(),
		],
		external: ['react', 'react-dom'],
	},
	{
		input: `${packageJson.buildFolder}/${esModuleConfig.format}/index.d.ts`,
		output: [{ file: packageJson.types, format: esModuleConfig.format }],
		external: [/\.(sass|scss|css)$/],
		plugins: [dts.default()],
	},
];

export default rollupConfig;
