# Change Log

All notable changes to the "mongo-snippets-for-node-js" extension will be documented in this file.

## [Unreleased]

- Suggested features
- Issues (if any)

- Allow mongo queries on display of Database as JSON

- Feature: Add snippet for replaceOne() mongo query.
- Fix: 
   * snippet for updateOne() mongo query
   * snippet for updateMany() mongo query

### v1.3.5

- Fix:
  * Bump lodash to newer version.

### v1.3.4

- Fix:
   * GitHub release action issues fixed.

### v1.3.3

- Feat:
   * GitHub release action added.

### v1.3.2

- Feat:
   * Use VSCE to publish.
   * Publish using GitHub actions.

### v1.3.1

- Fix:
   * CompletionItemProvider code optimization.
   * General working of the extension.


### v1.3.0

- Feat:
   * Get `sourceDir` from `.vscode/settings.json` under key `mongosnippets`.

- Fix:
   * Set up boilerplate, make folders awaited.

### v1.2.5

- Refactor:
   * Lots of code refactor, remove lint warnings and errors.
   * Code quality improvements.

- Feat:
   * Code should run faster now.
   * Should take lesser processing power.
   * Typescript support for existing features.

### v1.2.4

- Fix:
   * Export snippets.json to dist folder.

### v1.2.3

- Fix:
   * Required node_modules/ folder added back to vsce package.


### v1.2.2

- Fix:
   * VSCode version requirements.
   * Typescript mongoose error.

### v1.2.1

- Feat:
   * Port to typescript.

### v1.2.0

- Fix:
   * Code Cleanup
   * Most of the code converted to Async await from promises
   * Better modularity

### v1.0.23

- Fix: Dependencies updated

### v1.0.22

- Fix:
   * Node modules with vulnerabilities updated

### v1.0.21

- Feature: More intelligent fieldname suggestions within {...}.
- Fix: 
   * Undocumented changes
   * Diff version update

### v1.0.20

- Bug Fix: Security Vulnerability

### v1.0.19

- Feature Enhancement:
   * Formatted JSON on mongo connect
- Bug Fix: More intelligent fieldname suggestions within {...}.

### v1.0.18

- Feature Enhancement:
   * Mongo Connect (beta): Displays collection as a JSON.
- Bug Fix: Improved unambiguous project structure in src folder.

### v1.0.17

- Feature Enhancement:
   * Mongoose methods - !mdbmethod
   * Mongoose statics - !mdbstatic
- Bug fix:
   * Changed one instance of !doc to docs.length===0.
- Issues resolved
- Features:

### **Snippets:**

|       **Type/No.**       |   **Snippet**  |        **Stands For**       |          **Function**          |
|:------------------------:|:--------------:|:---------------------------:|:------------------------------:|
|       **Generic:**       |                |                             |                                |
|            1.            |    **!mdbc**   |       MongoDB Connect       |  MongoDB connect on port 27017 |
|            2.            |   **!mdbgum**  | MongoDB Generate User Model |   Generate typical user model  |
|            3.            |    **!mdba**   |      MongoDB Aggregate      |     *Model.aggregate* query    |
|            4.            |   **!mdbcd**   |    MongoDB CountDocuments   |  *Model.countDocuments* query  |
|            5.            |   **!mdbmr**   |      MongoDB MapReduce      |     *Model.mapReduce* query    |
|            6.            |    **!mdbp**   |       MongoDB Populate      |     *Model.populate* query     |
|            7.            |   **!mdbbw**   |      MongoDB BulkWrite      |     *Model.bulkWrite* query    |
|    **Create/Insert:**    |                |                             |                                |
|            1.            |   **!mdbcr**   |        MongoDB Create       |      *Model.create* query      |
|            2.            |   **!mdbcc**   |   MongoDB CreateCollection  | *Model.createCollection* query |
|            3.            |   **!mdbim**   |      MongoDB InsertMany     |    *Model.insertMany* query    |
|         **Find:**        |                |                             |                                |
|            1.            |    **!mdbf**   |         MongoDB Find        |       *Model.find* query       |
|            2.            |   **!mdbfo**   |       MongoDB FindOne       |      *Model.findOne* query     |
|            3.            |   **!mdbfbi**  |       MongoDB FindById      |     *Model.findById* query     |
|        **Update:**       |                |                             |                                |
|            1.            |  **!mdbfoau**  |   MongoDB FindOneAndUpdate  | *Model.findOneAndUpdate* query |
|            2.            |   **!mdbuo**   |      MongoDB UpdateOne      |     *Model.updateOne* query    |
|            3.            |   **!mdbum**   |      MongoDB UpdateMany     |    *Model.updateMany* query    |
|        **Delete:**       |                |                             |                                |
|            1.            |  **!mdbfoad**  |   MongoDB FindOneAndDelete  | *Model.findOneAndDelete* query |
|            2.            |   **!mdbdo**   |      MongoDB DeleteOne      |     *Model.deleteOne* query    |
|            3.            |   **!mdbdm**   |      MongoDB DeleteMany     |    *Model.deleteMany* query    |
| **Methods and Statics:** |                |                             |                                |
|            1.            | **!mdbmethod** |       MongoDB Methods       |    *schema.methods.function*   |
|            2.            | **!mdbstatic** |       MongoDB Statics       |    *schema.statics.function*   |

[Remaining features](#v1.0.13) are unchanged.

### v1.0.16

- Bug Fixes: Reveal mongoose model declaration upon selection in Command Palette.

### v1.0.15

- Features: 
   * Identification of field names of existing models.
   * Field name suggestions for models, after occurence of `modelname.` and within `{...}`.
- Bug fixes: Modelname suggestions work again.
- Features:

### **Command Palette:**

> Note: Ctrl+Shift+P or Command+Shift+P opens Command Palette in VSCode.

- Mongo Snippets: Refer to Mongoose Documentation
   * Opens the [Mongoose Documentation](https://mongoosejs.com/docs/api.html#Model) on a web browser.

- Mongo Snippets: Refer to Extension Documentation
   * Opens the [Repository](https://github.com/roerohan/vscode-MongoSnippets-NodeJS) on a web browser.

- Mongo Snippets: Set up Mongo Boilerplate Code
   * Sets up folders named `routes` and `models` if they do not exist, in the workspace root directory with files containing boilerplate.

- Mongo Snippets: Show Existing Models
   * Shows a list of names of models present in the `models` folder in the `workspace root directory`.
   * Highlights the model definition in the file where it had been created.
   * Suggests field names for models. E.G. if the model `User` has a field `name`, on typing `User.`, `name` is suggested.
   * Field names are also suggested inside `{...}`.

See remaining features [here](#v1.0.8)

### v1.0.14

- Bug fixes: Direct to source file on select


### v1.0.13

- Feature: 
   * Changed icon and banner color
   * Optimized code
   * Files where the models were created are identified
   * Modelname selection in quickPick takes to model source
- Bug fixes: Asynchronous code which might not have worked always
- Features:

### **Command Palette:**

> Note: Ctrl+Shift+P or Command+Shift+P opens Command Palette in VSCode.

- Mongo Snippets: Refer to Mongoose Documentation
   * Opens the [Mongoose Documentation](https://mongoosejs.com/docs/api.html#Model) on a web browser.

- Mongo Snippets: Refer to Extension Documentation
   * Opens the [Repository](https://github.com/roerohan/vscode-MongoSnippets-NodeJS) on a web browser.

- Mongo Snippets: Set up Mongo Boilerplate Code
   * Sets up folders named `routes` and `models` if they do not exist, in the workspace root directory with files containing boilerplate.

- Mongo Snippets: Show Existing Models
   * Shows a list of names of models present in the `models` folder in the `workspace root directory`.
   * Highlights the model definition in the file where it had been created.

[Remaining features](#v1.0.8) are unchanged.

### v1.0.12

* Bug Fixes: See existing models command activates extension

### v1.0.11
- Feature: 
   * Models reload within 5 seconds after they are changed or new models are added
   * Mongo Snippets: Show Existing Models
- Bug fixes: Code optimization, changed regex.

### v1.0.10

- Bug Fix: Fixes in model generation promises
- Feature Enhancement: 
   * Mongo Snippets: See Existing Models

### **Command Palette:**

> Note: Ctrl+Shift+P or Command+Shift+P opens Command Palette in VSCode.

- Mongo Snippets: Refer to Mongoose Documentation
- Mongo Snippets: Refer to Extension Documentation
- Mongo Snippets: Set up Mongo Boilerplate Code
- Mongo Snippets: Show Existing Models

### **Completion Suggestions:**

> Note: This is a `beta` feature, updates will be coming soon

- Model name suggestions:
   * First it identifies the names of the models in a folder named models (if any)
   * It stores the modelnames and provides completion suggestions when you start typing the name of a model.

### **Snippets:**

Same as [v1.0.8](#v1.0.8)

### v1.0.9
- Bug Fix: Description mistake, improved description
- Feature Enhancement: New Icon Added
- Features: Same as [v1.0.8](#v1.0.8)

## v1.0.8
- Feature Enhancement:
   * **Suggestions for model names in './models' directory (if any) in the only the directory containing the models folder**
- Upcoming: 
   * Model name suggestions in files in any directory
   * Field name suggestions for individual models
- Features:

### **Command Palette:**

> Note: Ctrl+Shift+P or Command+Shift+P opens Command Palette in VSCode.

- Mongo Snippets: Refer to Mongoose Documentation
- Mongo Snippets: Refer to Extension Documentation
- Mongo Snippets: Set up Mongo Boilerplate Code

### **Completion Suggestions:**

> Note: This is a `beta` feature, updates will be coming soon

- Model name suggestions:
   * First it identifies the names of the models in a folder named models (if any)
   * It stores the modelnames and provides completion suggestions when you start typing the name of a model.

### **Snippets:**

The following are some of the snippets that can be generated with this extension.

> Note: Type the following snippets and press 'Tab' OR 'Ctrl/Command + Space; Enter' for auto-completion.

|    **Type/No.**    |  **Snippet** |        **Stands For**       |          **Function**          |
|:------------------:|:------------:|:---------------------------:|:------------------------------:|
|    **Generic:**    |              |                             |                                |
|         1.         |   **!mdbc**  |       MongoDB Connect       |  MongoDB connect on port 27017 |
|         2.         |  **!mdbgum** | MongoDB Generate User Model |   Generate typical user model  |
|         3.         |   **!mdba**  |      MongoDB Aggregate      |     *Model.aggregate* query    |
|         4.         |  **!mdbcd**  |    MongoDB CountDocuments   |  *Model.countDocuments* query  |
|         5.         |  **!mdbmr**  |      MongoDB MapReduce      |     *Model.mapReduce* query    |
|         6.         |   **!mdbp**  |       MongoDB Populate      |     *Model.populate* query     |
|         7.         |  **!mdbbw**  |      MongoDB BulkWrite      |     *Model.bulkWrite* query    |
| **Create/Insert:** |              |                             |                                |
|         1.         |  **!mdbcr**  |        MongoDB Create       |      *Model.create* query      |
|         2.         |  **!mdbcc**  |   MongoDB CreateCollection  | *Model.createCollection* query |
|         3.         |  **!mdbim**  |      MongoDB InsertMany     |    *Model.insertMany* query    |
|      **Find:**     |              |                             |                                |
|         1.         |   **!mdbf**  |         MongoDB Find        |       *Model.find* query       |
|         2.         |  **!mdbfo**  |       MongoDB FindOne       |      *Model.findOne* query     |
|         3.         |  **!mdbfbi** |       MongoDB FindById      |     *Model.findById* query     |
|     **Update:**    |              |                             |                                |
|         1.         | **!mdbfoau** |   MongoDB FindOneAndUpdate  | *Model.findOneAndUpdate* query |
|         2.         |  **!mdbuo**  |      MongoDB UpdateOne      |     *Model.updateOne* query    |
|         3.         |  **!mdbum**  |      MongoDB UpdateMany     |    *Model.updateMany* query    |
|     **Delete:**    |              |                             |                                |
|         1.         | **!mdbfoad** |   MongoDB FindOneAndDelete  | *Model.findOneAndDelete* query |
|         2.         |  **!mdbdo**  |      MongoDB DeleteOne      |     *Model.deleteOne* query    |
|         3.         |  **!mdbdm**  |      MongoDB DeleteMany     |    *Model.deleteMany* query    |


## v1.0.7
- Feature Enhancement:
   * Improved Boilerplate Code
   * Changed banner color
- Bug Fix: Fixed .gitignore and .vscodeignore
- Features:

**Command Palette:**

> Note: Ctrl+Shift+P or Command+Shift+P opens Command Palette in VSCode.

- Mongo Snippets: Refer to Mongoose Documentation
- Mongo Snippets: Refer to Extension Documentation
- Mongo Snippets: Set up Mongo Boilerplate Code

**Snippets:**

The following are some of the snippets that can be generated with this extension.

> Note: Type the following snippets and press 'Tab' OR 'Ctrl/Command + Space; Enter' for auto-completion.

|    **Type/No.**    |  **Snippet** |        **Stands For**       |          **Function**          |
|:------------------:|:------------:|:---------------------------:|:------------------------------:|
|    **Generic:**    |              |                             |                                |
|         1.         |   **!mdbc**  |       MongoDB Connect       |  MongoDB connect on port 27017 |
|         2.         |  **!mdbgum** | MongoDB Generate User Model |   Generate typical user model  |
|         3.         |   **!mdba**  |      MongoDB Aggregate      |     *Model.aggregate* query    |
|         4.         |  **!mdbcd**  |    MongoDB CountDocuments   |  *Model.countDocuments* query  |
|         5.         |  **!mdbmr**  |      MongoDB MapReduce      |     *Model.mapReduce* query    |
|         6.         |   **!mdbp**  |       MongoDB Populate      |     *Model.populate* query     |
|         7.         |  **!mdbbw**  |      MongoDB BulkWrite      |     *Model.bulkWrite* query    |
| **Create/Insert:** |              |                             |                                |
|         1.         |  **!mdbcr**  |        MongoDB Create       |      *Model.create* query      |
|         2.         |  **!mdbcc**  |   MongoDB CreateCollection  | *Model.createCollection* query |
|         3.         |  **!mdbim**  |      MongoDB InsertMany     |    *Model.insertMany* query    |
|      **Find:**     |              |                             |                                |
|         1.         |   **!mdbf**  |         MongoDB Find        |       *Model.find* query       |
|         2.         |  **!mdbfo**  |       MongoDB FindOne       |      *Model.findOne* query     |
|         3.         |  **!mdbfbi** |       MongoDB FindById      |     *Model.findById* query     |
|     **Update:**    |              |                             |                                |
|         1.         | **!mdbfoau** |   MongoDB FindOneAndUpdate  | *Model.findOneAndUpdate* query |
|         2.         |  **!mdbuo**  |      MongoDB UpdateOne      |     *Model.updateOne* query    |
|         3.         |  **!mdbum**  |      MongoDB UpdateMany     |    *Model.updateMany* query    |
|     **Delete:**    |              |                             |                                |
|         1.         | **!mdbfoad** |   MongoDB FindOneAndDelete  | *Model.findOneAndDelete* query |
|         2.         |  **!mdbdo**  |      MongoDB DeleteOne      |     *Model.deleteOne* query    |
|         3.         |  **!mdbdm**  |      MongoDB DeleteMany     |    *Model.deleteMany* query    |


## v1.0.6

- Bug Fix: More minor bug fixes
- Features: Same as [v1.0.4](#v1.0.4)

## v1.0.5

- Bug Fix: Command Palette features not working
- Features: Same as [v1.0.4](#v1.0.4)

## v1.0.4

- Feature Enhancement: Command Palette:
   * **Mongo Snippets: Refer to Mongoose Documentation**
   * **Mongo Snippets: Refer to Extension Documentation**
   * **Mongo Snippets: Set up Mongo Boilerplate Code**
- Fix: Minor bug fixes
- Features:

|    **Type/No.**    |  **Snippet** |        **Stands For**       |          **Function**          |
|:------------------:|:------------:|:---------------------------:|:------------------------------:|
|    **Generic:**    |              |                             |                                |
|         1.         |   **!mdbc**  |       MongoDB Connect       |  MongoDB connect on port 27017 |
|         2.         |  **!mdbgum** | MongoDB Generate User Model |   Generate typical user model  |
|         3.         |   **!mdba**  |      MongoDB Aggregate      |     *Model.aggregate* query    |
|         4.         |  **!mdbcd**  |    MongoDB CountDocuments   |  *Model.countDocuments* query  |
|         5.         |  **!mdbmr**  |      MongoDB MapReduce      |     *Model.mapReduce* query    |
|         6.         |   **!mdbp**  |       MongoDB Populate      |     *Model.populate* query     |
|         7.         |  **!mdbbw**  |      MongoDB BulkWrite      |     *Model.bulkWrite* query    |
| **Create/Insert:** |              |                             |                                |
|         1.         |  **!mdbcr**  |        MongoDB Create       |      *Model.create* query      |
|         2.         |  **!mdbcc**  |   MongoDB CreateCollection  | *Model.createCollection* query |
|         3.         |  **!mdbim**  |      MongoDB InsertMany     |    *Model.insertMany* query    |
|      **Find:**     |              |                             |                                |
|         1.         |   **!mdbf**  |         MongoDB Find        |       *Model.find* query       |
|         2.         |  **!mdbfo**  |       MongoDB FindOne       |      *Model.findOne* query     |
|         3.         |  **!mdbfbi** |       MongoDB FindById      |     *Model.findById* query     |
|     **Update:**    |              |                             |                                |
|         1.         | **!mdbfoau** |   MongoDB FindOneAndUpdate  | *Model.findOneAndUpdate* query |
|         2.         |  **!mdbuo**  |      MongoDB UpdateOne      |     *Model.updateOne* query    |
|         3.         |  **!mdbum**  |      MongoDB UpdateMany     |    *Model.updateMany* query    |
|     **Delete:**    |              |                             |                                |
|         1.         | **!mdbfoad** |   MongoDB FindOneAndDelete  | *Model.findOneAndDelete* query |
|         2.         |  **!mdbdo**  |      MongoDB DeleteOne      |     *Model.deleteOne* query    |
|         3.         |  **!mdbdm**  |      MongoDB DeleteMany     |    *Model.deleteMany* query    |


## v1.0.3

- Feature Enhancement: Supports more mongoose queries:
   * **!mdbbw**
- Fix: Indentation in Changelog and Readme

|    **Type/No.**    |  **Snippet** |        **Stands For**       |          **Function**          |
|:------------------:|:------------:|:---------------------------:|:------------------------------:|
|    **Generic:**    |              |                             |                                |
|         1.         |   **!mdbc**  |       MongoDB Connect       |  MongoDB connect on port 27017 |
|         2.         |  **!mdbgum** | MongoDB Generate User Model |   Generate typical user model  |
|         3.         |   **!mdba**  |      MongoDB Aggregate      |     *Model.aggregate* query    |
|         4.         |  **!mdbcd**  |    MongoDB CountDocuments   |  *Model.countDocuments* query  |
|         5.         |  **!mdbmr**  |      MongoDB MapReduce      |     *Model.mapReduce* query    |
|         6.         |   **!mdbp**  |       MongoDB Populate      |     *Model.populate* query     |
|         7.         |  **!mdbbw**  |      MongoDB BulkWrite      |     *Model.bulkWrite* query    |
| **Create/Insert:** |              |                             |                                |
|         1.         |  **!mdbcr**  |        MongoDB Create       |      *Model.create* query      |
|         2.         |  **!mdbcc**  |   MongoDB CreateCollection  | *Model.createCollection* query |
|         3.         |  **!mdbim**  |      MongoDB InsertMany     |    *Model.insertMany* query    |
|      **Find:**     |              |                             |                                |
|         1.         |   **!mdbf**  |         MongoDB Find        |       *Model.find* query       |
|         2.         |  **!mdbfo**  |       MongoDB FindOne       |      *Model.findOne* query     |
|         3.         |  **!mdbfbi** |       MongoDB FindById      |     *Model.findById* query     |
|     **Update:**    |              |                             |                                |
|         1.         | **!mdbfoau** |   MongoDB FindOneAndUpdate  | *Model.findOneAndUpdate* query |
|         2.         |  **!mdbuo**  |      MongoDB UpdateOne      |     *Model.updateOne* query    |
|         3.         |  **!mdbum**  |      MongoDB UpdateMany     |    *Model.updateMany* query    |
|     **Delete:**    |              |                             |                                |
|         1.         | **!mdbfoad** |   MongoDB FindOneAndDelete  | *Model.findOneAndDelete* query |
|         2.         |  **!mdbdo**  |      MongoDB DeleteOne      |     *Model.deleteOne* query    |
|         3.         |  **!mdbdm**  |      MongoDB DeleteMany     |    *Model.deleteMany* query    |

## v1.0.2

- Feat: GIF Added in README.md.
- Fix: Bugs in snippets and documentation
- Features:

|    **Type/No.**   	|  **Snippet** 	|        **Stands For**       	|          **Function**          	|
|:-----------------:	|:------------:	|:---------------------------:	|:------------------------------:	|
|    **Generic:**   	|              	|                             	|                                	|
|         1.        	|   **!mdbc**  	|       MongoDB Connect       	|  MongoDB connect on port 27017 	|
|         2.        	|  **!mdbgum** 	| MongoDB Generate User Model 	|   Generate typical user model  	|
|         3.        	|   **!mdba**  	|      MongoDB Aggregate      	|     *Model.aggregate* query    	|
|         4.        	|  **!mdbcd**  	|    MongoDB CountDocuments   	|  *Model.countDocuments* query  	|
|         5.        	|  **!mdbmr**  	|      MongoDB MapReduce      	|     *Model.mapReduce* query    	|
|         6.        	|   **!mdbp**  	|       MongoDB Populate      	|     *Model.populate* query     	|
| **Create/Insert** 	|              	|                             	|                                	|
|         1.        	|  **!mdbcr**  	|        MongoDB Create       	|      *Model.create* query      	|
|         2.        	|  **!mdbcc**  	|   MongoDB CreateCollection  	| *Model.createCollection* query 	|
|         3.        	|  **!mdbim**  	|      MongoDB InsertMany     	|    *Model.insertMany* query    	|
|     **Find:**     	|              	|                             	|                                	|
|         1.        	|   **!mdbf**  	|         MongoDB Find        	|       *Model.find* query       	|
|         2.        	|  **!mdbfo**  	|       MongoDB FindOne       	|      *Model.findOne* query     	|
|         3.        	|  **!mdbfbi** 	|       MongoDB FindById      	|     *Model.findById* query     	|
|    **Update:**    	|              	|                             	|                                	|
|         1.        	| **!mdbfoau** 	|   MongoDB FindOneAndUpdate  	| *Model.findOneAndUpdate* query 	|
|         2.        	|  **!mdbuo**  	|      MongoDB UpdateOne      	|     *Model.updateOne* query    	|
|         3.        	|  **!mdbum**  	|      MongoDB UpdateMany     	|    *Model.updateMany* query    	|
|    **Delete:**    	|              	|                             	|                                	|
|         1.        	| **!mdbfoad** 	|   MongoDB FindOneAndDelete  	| *Model.findOneAndDelete* query 	|
|         2.        	|  **!mdbdo**  	|      MongoDB DeleteOne      	|     *Model.deleteOne* query    	|
|         3.        	|  **!mdbdm**  	|      MongoDB DeleteMany     	|    *Model.deleteMany* query    	|

## v1.0.1

- Feature Enhancement: Supports more mongoose queries: 
   * **!mdbmr**
   * **!mdbp**
   * **!mdbcr**
   * **!mdbcc**
   * **!mdbim**
- Fix: README.md error, description, CHANGELOG.md error.
- Features:

|    **Type/No.**   	|  **Snippet** 	|        **Stands For**       	|          **Function**          	|
|:-----------------:	|:------------:	|:---------------------------:	|:------------------------------:	|
|    **Generic:**   	|              	|                             	|                                	|
|         1.        	|   **!mdbc**  	|       MongoDB Connect       	|  MongoDB connect on port 27017 	|
|         2.        	|  **!mdbgum** 	| MongoDB Generate User Model 	|   Generate typical user model  	|
|         3.        	|   **!mdba**  	|      MongoDB Aggregate      	|     *Model.aggregate* query    	|
|         4.        	|  **!mdbcd**  	|    MongoDB CountDocuments   	|  *Model.countDocuments* query  	|
|         5.        	|  **!mdbmr**  	|      MongoDB MapReduce      	|     *Model.mapReduce* query    	|
|         6.        	|   **!mdbp**  	|       MongoDB Populate      	|     *Model.populate* query     	|
| **Create/Insert** 	|              	|                             	|                                	|
|         1.        	|  **!mdbcr**  	|        MongoDB Create       	|      *Model.create* query      	|
|         2.        	|  **!mdbcc**  	|   MongoDB CreateCollection  	| *Model.createCollection* query 	|
|         3.        	|  **!mdbim**  	|      MongoDB InsertMany     	|    *Model.insertMany* query    	|
|     **Find:**     	|              	|                             	|                                	|
|         1.        	|   **!mdbf**  	|         MongoDB Find        	|       *Model.find* query       	|
|         2.        	|  **!mdbfo**  	|       MongoDB FindOne       	|      *Model.findOne* query     	|
|         3.        	|  **!mdbfbi** 	|       MongoDB FindById      	|     *Model.findById* query     	|
|    **Update:**    	|              	|                             	|                                	|
|         1.        	| **!mdbfoau** 	|   MongoDB FindOneAndUpdate  	| *Model.findOneAndUpdate* query 	|
|         2.        	|  **!mdbuo**  	|      MongoDB UpdateOne      	|     *Model.updateOne* query    	|
|         3.        	|  **!mdbum**  	|      MongoDB UpdateMany     	|    *Model.updateMany* query    	|
|    **Delete:**    	|              	|                             	|                                	|
|         1.        	| **!mdbfoad** 	|   MongoDB FindOneAndDelete  	| *Model.findOneAndDelete* query 	|
|         2.        	|  **!mdbdo**  	|      MongoDB DeleteOne      	|     *Model.deleteOne* query    	|
|         3.        	|  **!mdbdm**  	|      MongoDB DeleteMany     	|    *Model.deleteMany* query    	|

## v1.0.0

- First Update
- Supports Generic, Find, Update, and Delete Queries


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

## v0.0.1

- Initial Release
- Supports **MongoDB Connect**
- Supports **MongoDB Generate Generic User Model**
