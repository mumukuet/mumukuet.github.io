# Project rules for Claude

## Contributor identity (always)
Every commit in this repo must have `mumueshrat1` as its contributor, regardless of who runs Claude or what the global git config says.

- Author and committer name: `Eshrat Jahan Mumu`
- Author and committer email: `mumueshrat1@users.noreply.github.com`
- Set it per command, never by changing global git config. Example:
  `GIT_AUTHOR_NAME="Eshrat Jahan Mumu" GIT_AUTHOR_EMAIL="mumueshrat1@users.noreply.github.com" GIT_COMMITTER_NAME="Eshrat Jahan Mumu" GIT_COMMITTER_EMAIL="mumueshrat1@users.noreply.github.com" git commit ...`
- Never commit or push under any other identity (for example the machine user's name or work email). Before pushing, check `git log --format='%an <%ae> | %cn <%ce>'`. If any commit has a different author or committer, rewrite it first.
- Do not add `Co-Authored-By` trailers for other people. The only contributor shown on GitHub must be `mumueshrat1`.

## Remote
- Push only to `https://github.com/mumueshrat1/mumu.github.io.git`, branch `main`.
- Never force-push without asking.

## Licensing
- The project is all rights reserved (see `LICENSE`). Do not add open-source licenses, copied templates or third-party code that conflicts with it.
- Keep the copyright line `Copyright (c) 2026 Eshrat Jahan Mumu` in `LICENSE`, `README.md` and the site footer.

## Secrets
- Never commit tokens, `.env*` files, keychain files or credential files.
