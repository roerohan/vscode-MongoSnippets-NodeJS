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

| **Type/No.** 	|  **Snippet** 	|        **Stands For**       	|          **Function**          	|
|:------------:	|:------------:	|:---------------------------:	|:------------------------------:	|
|  **Generic** 	|              	|                             	|                                	|
|      1.      	|   **!mdbc**  	|       MongoDB Connect       	|  MongoDB connect on port 27017 	|
|      2.      	|  **!mdbgum** 	| MongoDB Generate User Model 	|   Generate typical user model  	|
|      3.      	|   **!mdba**  	|      MongoDB Aggregate      	|     *Model.aggregate* query    	|
|      4.      	|  **!mdbcd**  	|    MongoDB CountDocuments   	|  *Model.countDocuments* query  	|
|   **Find:**  	|              	|                             	|                                	|
|      1.      	|   **!mdbf**  	|         MongoDB Find        	|       *Model.find* query       	|
|      2.      	|  **!mdbfo**  	|       MongoDB FindOne       	|      *Model.findOne* query     	|
|      3.      	|  **!mdbfbi** 	|       MongoDB FindById      	|     *Model.findById* query     	|
|  **Update:** 	|              	|                             	|                                	|
|      1.      	| **!mdbfoau** 	|   MongoDB FindOneAndUpdate  	| *Model.findOneAndUpdate* query 	|
|      2.      	|  **!mdbuo**  	|      MongoDB UpdateOne      	|     *Model.updateOne* query    	|
|      3.      	|  **!mdbum**  	|      MongoDB UpdateMany     	|    *Model.updateMany* query    	|
|  **Delete:** 	|              	|                             	|                                	|
|      1.      	| **!mdbfoad** 	|   MongoDB FindOneAndDelete  	| *Model.findOneAndDelete* query 	|
|      2.      	|  **!mdbdo**  	|      MongoDB DeleteOne      	|     *Model.deleteOne* query    	|
|      3.      	|  **!mdbdm**  	|      MongoDB DeleteMany     	|    *Model.deleteMany* query    	|

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
