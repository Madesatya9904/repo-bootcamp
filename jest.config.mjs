import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  dir: "./"
})

/**@type {import('jest').Config} */
const config = {
  modulePaths: ["<rootDir>/src"],
  collectCoverage: false,
  collectCoverageFrom : [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/*.type.ts",
    "!<rootDir>/.next/**",
    "!<rootDir>/.config.js"
  ],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": `<rootDir>/src/$1`,
  }
}

export default createJestConfig(config);