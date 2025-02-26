declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_PUBLIC_BASE_URL: string;
  readonly NG_APP_PUBLIC_CONSUMER_KEY: string;
  readonly NG_APP_PUBLIC_CONSUMER_SECRET: string;

}
declare interface ImportMeta {
  readonly env: Env;
}
declare const _NGX_ENV_: Env;
