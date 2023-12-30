https://zs-loot-tracker.netlify.app

# About

In the current build of Zero Sievert you can highlight items you need to collect, but the game continues to highlight items you already have enough of. And sometimes multiple quests need the same item which can be difficult to mentally track (infomercial cutaway here).

This is essentially a niche todo app with the assumptions that:

1. Goals (or quests) are comprised of tasks to gather things.
2. Most tasks will require gathering the same things.
3. It would be nice to highlight 1 big list so it's easy to see counts at a glance.

## Notes for Use

I find it best to not check things off as complete until you exfil with them. It can get confusing unchecking things upon death.

-   Uses local storage only, no accounts or cross device saves.

# Development

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Netlify Functions

Adding quests from the pre-built list will only work if you set up a netlify account and run the app locally with the `netlify-dev` command.

Ran with a global install of netlify functions - I did add it to dev dependencies so it may be possible to use without a global install. See Netlify Docs page for info on how to authenticate your netlify account.

Site should work locally without netlify setup with `npm run dev` but console errors for the failed request will log.
Or you could comment out the Add Quests Dialog/Button component to remove any netlify functions dependent code.

.env file with the following properties is needed:
`SHEET_ID=_your_google_sheets_id_`
`GOOG_CREDENTIALS=_credentials_JSON_on_one_line_`

See https://github.com/z-s-kusz/google-sheets-cms-test for more details.

### Notes to Self / Troubleshooting

Netlify Functions get started guide recommended using `Netlify.env.get("MY_API_KEY");` to access .env variables.
However, I was getting errors back in my api call that "Netlify is not defined" pointing to the line with `Netlify.env.get("MY_API_KEY");`.
After further reading I found that Netlify.env is only available in edge functions and `process.env` should be used elsewhere.
Further, edge functions seem to have access to process.env so I'm not sure why the Netlify specific syntax is recommended for env variables in the get started guide.
