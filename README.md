https://zs-loot-tracker.netlify.app
# About
In the current build of Zero Sievert you can highlight items you need to collect for constructing upgrades, but the game doesn't remove items you already have enough of. Plus it was hard to remember if I needed to keep stacking an item for other quests which is important with a low carry capacity.

This is essentially a niche todo app with the assumptions that:
1. Goals (or quests) are comprised of tasks to gather things.
2. Most tasks will require gathering the same things in various quantities.
3. It would be nice to highlight 1 big list composed of all remaining items from all lists.

## Notes for Use
App is spoiler free. Some parts listed in the typeaheads come from looting specific mobs, that's as spoilery as it gets.
The actual quests are not listed, it's up to you to create a quest entry and add all the items you need for it.
I find it best to not check things off as complete until you exfil with them.
* Uses local storage only, no accounts or cross device saves.
* App is installable as a progressive web app, but it has only been tested on ipad.

# Development
## Recommended IDE Setup
- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS
TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
