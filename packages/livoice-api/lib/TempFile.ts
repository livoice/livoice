import { randomBytes } from 'crypto';
import { promises as fs, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { basename, join } from 'path';

const PACKAGE_NAME = (() => {
  const pkgJson = readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
  const pkg = JSON.parse(pkgJson) as { name?: string };
  return pkg.name ?? 'package';
})();
const PREFIX_BASE = PACKAGE_NAME.replace(/[^A-Za-z0-9\-]+/g, '');

export class TempFile {
  private readonly dir: string;
  readonly path: string;
  private contentPromise?: Promise<string>;

  private constructor(path: string, dir: string) {
    this.path = path;
    this.dir = dir;
  }

  static async create() {
    const dir = await fs.mkdtemp(join(tmpdir(), `${PREFIX_BASE}-`));
    const name = `${randomBytes(4).toString('hex')}`;
    const path = join(dir, name);
    return new TempFile(path, dir);
  }

  public async content(suffix = '') {
    this.contentPromise =
      this.contentPromise ??
      fs.readFile(`${this.path}${suffix}`, 'utf-8').finally(() =>
        this.cleanup().catch(() => {
          console.error(`[TempFile] cleanup failed for ${this.dir}`);
        })
      );

    return this.contentPromise;
  }

  public async contentOfSuffix(suffixPattern: string): Promise<string> {
    const files = await fs.readdir(this.dir);
    const base = basename(this.path);
    const match = files.find(f => f.startsWith(base) && f.endsWith(suffixPattern));

    if (!match) throw new Error(`No file matching suffix pattern "${suffixPattern}" in ${this.dir}`);

    return this.content(match.slice(base.length));
  }

  private async cleanup() {
    await fs.rm(this.dir, { recursive: true, force: true });
  }
}
