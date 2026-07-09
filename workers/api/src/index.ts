/**
 * AWS Lambda entry point for the minesweeper API.
 *
 * Placeholder skeleton only — the runtime framework (e.g. Hono + Lambda
 * adapter vs. a plain handler) and the IaC/deployment tooling are still TBD.
 * See README.md.
 */

export interface LambdaResult {
  statusCode: number
  headers: Record<string, string>
  body: string
}

export const handler = async (): Promise<LambdaResult> => ({
  statusCode: 200,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ message: 'minesweeper api: ok' }),
})
