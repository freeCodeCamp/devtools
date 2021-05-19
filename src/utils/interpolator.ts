import { spawnSync, SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns } from "child_process";

/** Matches usage of envvars. */
const ENVVAR_PATTERN = /\${([A-Za-z\d_]+)}/g;

/** Matches usage of system commands. TODO: Allow nested brackets. */
const COMMAND_PATTERN = /\$\((.+?)\)/g;

/** Spawn options when executing command. */
const SPAWN_OPTIONS: SpawnSyncOptionsWithStringEncoding = {
  shell: true,
  stdio: 'pipe',
  encoding: 'utf-8'
}

/**
 * Interpolate environment variables in the string.
 * 
 * An environment variable looks like: ${CYPRESS_BASE_URL}
 * 
 * @param body The string to interpolate.
 * @param variables The pool of variables to use.
 * @returns The input string with variables populated.
 */
export function interpolateVariables(body: string, variables = process.env): string {
  const result = body.replace(ENVVAR_PATTERN, (match, p1) => {
    const value = variables[p1];

    if (!value)
      throw new Error(`Environment variable "${p1}" is not set.`);

    return value;
  });

  return result;
}

/**
 * Interpolate system commands in the string.
 *
 * A system command looks like: $(gp url 8000)
 *
 * @param body The string to interpolate.
 * @returns The input string with commands executed and populated.
 */
export function interpolateCommands(body: string): string {
  const result = body.replace(COMMAND_PATTERN, (match, p1: string) => {
    const child: SpawnSyncReturns<string> = spawnSync(p1, SPAWN_OPTIONS);
    const { stdout, stderr, error } = child;

    if (error)
      throw new Error(`Failed to execute command: ${error}`);

    if (stderr)
      throw new Error(`Failed to interpolate command: ${stderr}`);

    return stdout.trim();
  });

  return result;
}
