# System Design Capstone #
Building out a REST API for the Reviews & Ratings module of a previously built front-end application.

### Tech Stack ###
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
) ![JEST](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

### Objectives ###
* Design and compare two database options (PostgreSQL and MongoDB) - analyze and compare the pros and cons prior to selecting one database.
* Transform and load the existing application data by performing an ETL process.
* Design and build an API that returns the data to the client in the format specified in the API documentation to be compatible with the existing front-end application.
* Optimize individual service via local testing - k6.
* Deploy API service and integrate with existing front-end application.
* Optimize deployed service with additional testing to improve performance - loader.io.

### Installation ###
Ensure that Postgresql is installed on your computer.

```
npm install
```

Rename the `example.env` file to `.env` and configure the variables within.

```
npm run server-dev
```

### API Endpoints ###
#### GET/reviews ####
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| product_id| Integer | Specify the product you want reviews for. Required
| page      | Integer | Selects the page of results to return. Default 1.         |
| count     | Integer | Specifies how many results to return. Default 5.|
| sort     | String | Specifies how to sort the reviews from "helpfulness", "relevant", "date"|

##### Response #####
```
200 status code
```

#### GET/reviews/meta ####
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| product_id| Integer | Specify the product you want reviews for. Required

##### Response #####
```
200 status code
```

#### POST/reviews ####
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| product_id| Integer | Specify the product you want to post reviews for. Required |
| rating| Integer | Integer indicating the review rating. Required |
| summary| text | Summary of the review. Required |
| body| text | The full text of the review. Required |
| recommend| bool | True or false, depending on if you recommend it or not. Required |
| name| text | Username for question asker. Required |
| email| text | Email address for question asker. Required |
| photos| [text] | Array of photo urls to images uploaded. |
| characteristics| object | Object of keys representing characteristic_id with corresponding values from 1-5. Required |

##### Response #####
```
201 status code
```

#### PUT/reviews/:review_id/helpful ####
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| review_id| Integer | ID of the review to update. Required

##### Response #####
```
204 status code
```

#### PUT/reviews/:review_id/report ####
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| review_id| Integer | ID of the review to update. Required

##### Response #####
```
204 status code
```
