# mongo-snippets-for-node-js

This Visual Studio Code extension generates MongoDB code snippets for Node-js projects using mongoose library from npm.

## Table of Contents:

- [Features](#features)
- [Requirements](#requirements)
- [Issues](#issues)
- [Release Notes](#release-notes)
- [Contributing](#contributing)
- [License](#license)
- [More information](#for-more-information)

## Features

The following are some of the snippets that can be generated with this extension.

#### Generic:

|   Snippet   |          Stands For         |            Function           |
|:-----------:|:---------------------------:|:-----------------------------:|
|  **!mdbc**  |       MongoDB Connect       | MongoDB connect on port 27017 |
| **!mdbgum** | MongoDB Generate User Model |  Generate typical user model  |
|  **!mdba**  |      MongoDB Aggregate      |    *Model.aggregate* query    |
|  **!mdbcd** |    MongoDB CountDocuments   | *Model.countDocuments* query  |


#### Find:

|   Snippet   |    Stands For    |        Function        |
|:-----------:|:----------------:|:----------------------:|
|  **!mdbf**  |   MongoDB Find   |   *Model.find* query   |
|  **!mdbfo** |  MongoDB FindOne |  *Model.findOne* query |
| **!mdbfbi** | MongoDB FindById | *Model.findById* query |

#### Update: 

|    Snippet   |        Stands For        |            Function            |
|:------------:|:------------------------:|:------------------------------:|
| **!mdbfoau** | MongoDB FindOneAndUpdate | *Model.findOneAndUpdate* query |
|  **!mdbuo**  |     MongoDB UpdateOne    |     *Model.updateOne* query    |
|  **!mdbum**  |    MongoDB UpdateMany    |    *Model.updateMany* query    |

#### Deletion:

|    Snippet   |        Stands For        |            Function            |
|:------------:|:------------------------:|:------------------------------:|
| **!mdbfoad** | MongoDB FindOneAndDelete | *Model.findOneAndDelete* query |
|  **!mdbdo**  |     MongoDB DeleteOne    |     *Model.deleteOne* query    |
|  **!mdbdm**  |    MongoDB DeleteMany    |    *Model.deleteMany* query    |

## Requirements

- mongoose library from npm is required.
This can be installed by executing the following command in the folder where 'package.json' is present.
```bash
npm install mongoose
```
> Make sure mongoose is added as a dependency in package.json

## Issues

This extension is still being tested, please report issues on [vscode-MongoSnippets-NodeJS](https://github.com/roerohan/vscode-MongoSnippets-NodeJS/issues)

## Release Notes

These are the release notes for mongo-snippets-for-node-js. Checkout [CHANGELOG](https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/CHANGELOG.md) for more.

### 1.0.1

* Bug Fix: Typos and Indentation
* Feature Enhancement: To see new features (snippets), see the [CHANGELOG](https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/CHANGELOG.md#v1.0.1).

### 1.0.0

* Generic, Addition, Deletion and Update queries introduced.

-----------------------------------------------------------------------------------------------------------

## Contributing

You can contribute to mongo-snippets-for-node-js on the GitHub page [vscode-MongoSnippets-NodeJS](https://github.com/roerohan/vscode-MongoSnippets-NodeJS). Checkout [CONTRIBUTING.md](https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/CONTRIBUTING.md) for further details.

## License

Click the following hyperlink to view the license.
* [License](https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/LICENSE)

### For more information

You can checkout the source code and contribute on:

* [vscode-MongoSnippets-NodeJS](https://github.com/roerohan/vscode-MongoSnippets-NodeJS)

**Enjoy!**
