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
- **!mdbc**: Stands for **MongoDB Connect**, generates code for *MongoDB connection*.
- **!mdbgum**: Stands for **MongoDB Generate User Model**, generates a typical customizable *user model* and code for exporting it.
- **!mdba**: Stands for **MongoDB Aggregate**, generates a code template for *'aggregate'* query in mongoose-js.
- **!mdbcd**: Stands for **MongoDB CountDocuments**, generates a code template for *'countDocuments'* query in mongoose-js.

#### Find:
- **!mdbf**: Stands for **MongoDB Find**, generates a code template for *'find*' query in mongoose-js.
- **!mdbfo**: Stands for **MongoDB FindOne**, generates a code template for *'findOne'* query in mongoose-js.
- **!mdbfbi**: Stands for **MongoDB FindById**, generates a code template for *'findById'* query in mongoose-js.

#### Update: 
- **!mdbfoau**: Stands for **MongoDB FindOneAndUpdate**, generates a code template for *'findOneAndUpdate'* query.
- **!mdbuo**: Stands for **MongoDB UpdateOne**, generates a code template for *'updateOne'* query.
- **!mdbum**: Stands for **MongoDB UpdateMany**, generates a code template for *'updateMany'* query.

#### Deletion:
- **!mdbfoad**: Stands for **MongoDB FindOneAndDelete**, generates a code template for *'findOneAndDelete'* query.
- **!mdbdo**: Stands for **MongoDB DeleteOne**, generates a code template for *'deleteOne'* query.
- **!mdbdm**: Stands for **MongoDB DeleteMany**, generates a code template for *'deleteMany'* query.

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


### 1.0.0

* Generic, Addition, Deletion and Update queries introduced.

-----------------------------------------------------------------------------------------------------------

## Contributing

You can contribute to mongo-snippets-for-node-js on the GitHub page [vscode-MongoSnippets-NodeJS](https://github.com/roerohan/vscode-MongoSnippets-NodeJS). Checkout [CHANGELOG](https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/CONTRIBUTING.md) for further details.

## License

Click the following hyperlink to view the license.
* [License](https://github.com/roerohan/vscode-MongoSnippets-NodeJS/blob/master/LICENSE)

### For more information

You can checkout the source code and contribute on:

* [vscode-MongoSnippets-NodeJS](https://github.com/roerohan/vscode-MongoSnippets-NodeJS)

**Enjoy!**]
