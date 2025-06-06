import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
    preset: 'ts-jest',
    testMatch: ['**.test.ts'],
    rootDir: '../',
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/configs/jest-setup.js'],
    // jest resolves to the ESM variant of these packages, breaking the tests
    // by forcing the resolve via Node, the commonjs variant is used
    moduleNameMapper: {
        '^vscode-languageserver-types': require.resolve('vscode-languageserver-types'),
        '^msgpackr': require.resolve('msgpackr'),
    }
});
