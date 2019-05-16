# Change Log

All notable changes to the "mongo-snippets-for-node-js" extension will be documented in this file.

## [Unreleased]

- Snippets for more queries.
- Issue resolution.

## v1.0.1

- Feature Enhancement: Supports more mongoose queries: 
   * **!mdbmr**
   * **!mdbp**
   * **!mdbcr**
   * **!mdbcc**
   * **!mdbim**.
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