# LOC

Stop wondering how many lines of code your projects have. Count them!

LOC is a simple, lightweight and very fast tool to count the lines of code in your projects.🚀

## Installation
Clone the repo:
```bash
git clone git@github.com:niclas-timm/loc.git;
```

Navigate into the project and install the dependencies:
```bash
npm install

cd loc
```

That’s pretty much it. You’re ready to go 🥳!

## Usage
Loc only offers a single command, which you can execute like this:
```bash
node loc absolue/path/to/your/project/directory {options}
```

### Options
| Option                     | Description                                                  | Type     | Example                |
|----------------------------|--------------------------------------------------------------|----------|------------------------|
| -d, --excludeDirs          | A comma-separated list of directories you want to exclude. Files in these directories will not be counted. | `string` | -d "vendor,node_modules" |
| -e,--excludeExtensions     | A comma-separated list of file extensions you want to exclude. | `string` | -e "woff,png"            |
| -dd,--useDefaultIgnoreDirs | Instead of typing the directories you want to exclude manually, you can also use a preset of directories you *probably* want to ignore. You can find that list under `src/loc.js`. | `bool`   | `-dd`                  |
| -de,--useDefaultIgnoreExt  | Instead of typing the file extensions you want to exclude manually, you can also use a preset of extensions you *probably* want to ignore. You can find that list under `src/loc.js`. | `bool`   | `-de`                  |

## Example
```bash
node loc --useDefaultIgnoreDirs --useDefaultIgnoreExt --excludeDirs "storage,bootstrap,cache" --excludeExtensions "js,css"
```