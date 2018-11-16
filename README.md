# merginator-gitlab

Merginator will automatically merge your Gitlab merge request once everything is fine by watching them. Launch it, then let it wait and merge for you.

💣 💣 💣 Use at your own risk, your colleagues may not like when you merge too fast... Tell them to review if they are not happy 💣 💣 💣

## Why?

Because you can merge your merge requests automatically in some cases, even when not in front of your computer, and because I wanted to play with [RxJS](https://rxjs-dev.firebaseapp.com/).

## How to use merginator

Install from `npm`:

```
npm install -g merginator-gitlab
```

Launch it:

```
merginator-gitlab --upvotes 2 --gitlab https://YOUR_GITLAB_INSTANCE --token 1234567890
```

Where:

- `upvotes`: Is the minimum number of upvotes you need to merge a merge request (defaults to 2). Nothing will be merged until your merge request reach this number of 👍
- `gitlab`: Is the base URL of your gitlab instance. If not defined, it will try to get it from your `GITLAB_URL` environemtn variable, then will default to `https://gitlab.com`
- `token`: Is your Gitlab token. You can get it from your Gitlab profile `https://YOUR_GITLAB_INSTANCE/profile/personal_access_tokens`. If not defined, it will try to get it from your `GITLAB_TOKEN` environment variable.

For more details, check help:

```
merginator-gitlab --help
```

## License

MIT