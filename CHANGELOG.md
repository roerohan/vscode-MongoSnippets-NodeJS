# Change Log

All notable changes to the "mongo-snippets-for-node-js" extension will be documented in this file.

## [Unreleased]

- Suggested features
- Issues (if any)

### v1.0.9
- Bug Fix: Description mistake, improved description
- New Icon Added
Features: Same as [v1.0.8](#v1.0.8)

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