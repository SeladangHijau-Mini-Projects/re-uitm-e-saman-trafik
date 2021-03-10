# RE: UiTM E-Saman Trafik

## Introduction
Remake of UiTM E-Saman Trafik

# Project Setup

## Rag CLI
This boilerplate will use `bin/rag.sh` to scaffold some common tasks. 

Accepted commands:

| Command       | Alias       |
| ------------- |-------------|
| scaffold      | s           |
| help          | -h          |
| version       | -v          |

To begin development, you can use this commands:

### For Windows

```
$ bin\rag.sh -h 
```
**Notice on Windows**

You can use `git-bash` as your default terminal. In fact, when you execute this command, it will 
open up git-bash (if it is installed).

Open up `git-bash`, change directory to your working project, and execute the above command.

### For MacOS & Linux

```
$ bin/rag.sh -h 
```

# Database Setup
## For MySQL
```bash
# following command will copy the dependencies and copy the files accordingly
sh setup/mysql.sh
```

Make sure includes env key in the `.env`
```
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```

## For MongoDB
```bash
# following command will copy the dependencies and copy the files accordingly
sh setup/mongodb.sh
```

Make sure includes env key in the `.env`
```
MONGODB_ENDPOINT=
```

# Guidelines

## Coding standard
It is recommended to read [Coding Guideline](https://carsome.atlassian.net/wiki/spaces/TECH/pages/371490826/Coding+Standard) if you are not familiar.

## Controller
The responsibility of the controller should:
- Define the endpoint
- Input validation (Suppose handle by DTO. Special case validation if DTO cant handle.)
- Accept request input and peform transformation (if any) and pass to service.
- Response transformation
Note: No business logic at this layer

## Service
The responsibility of the service should:
- Business logic
- Perform database query via ORM (Mongoose/ TypeORM). Where 
- Throw business logic error
- Calling to other API if any

## Model
The model is referring to Mongoose or TypeORM. The responsibility of it should:
- Connection to DB
- Perform query
It is recommend that Model for that particular domain should only accessible by same domain service. Eg: `User` model should in `UserService` only. Any perform to `User` should do via `UserService` to separate out the concern.

## DTO
The responsibility of it should:
- Request validation, by utilise the [Class Validator library](https://github.com/typestack/class-validator). Any database validation such as checking the provided ID is exists, can be perform at `Controller` layer
- Response transformation. Kindly refer [bidding @fromModel](https://gitlab.com/carsome/api/v4b-tinker-bidding-service/-/blob/develop/src/app/car/dto/car.dto.ts) for the example.
- It is advisable that to separate out the `request` and `response` DTO for maintainbility. 

## Exception
The responsibility of it should:
- Throw the exception for the given scenario. 
- Refer [here](https://carsome.atlassian.net/wiki/spaces/TECH/pages/146800710/Error+Response) for more information about error


# Folder Structure
src<br/>
<p style="padding-left:10px">--main.ts // NestJS application boostrap script.
<p style="padding-left:10px">--required-env.ts // Script to ensure required env will be included during app startup. It is recommended to insert the new entry here when introduce new env to system.
<p style="padding-left:10px">|-- app // all your application domain will be under this folder </p>
<p style="padding-left:25px">|-- {module} // resource domain under here. Eg: User, all user related codes under this folder</p>
<p style="padding-left:30px">-- {module}.service.ts -- business logic resides here</p>
<p style="padding-left:30px">-- {module}.model.ts -- database model. eg: mongoose/typeorm</p>
<p style="padding-left:30px">-- {module}.module.ts</p>
<p style="padding-left:30px">-- {module}.controller.ts -- routing logic only. Simple validation can be done here too. Data transformation handling should under here too.</p>
<p style="padding-left:40px">|-- dto // contains all the request/response/query-params of the dto. Validation logic using class-validator</p>
<p style="padding-left:40px">|-- exception // contains the resource exception</p>
<p style="padding-left:40px">|-- query-filter // contains the query filter, helpers to do the dynamic filter based on query params</p>
<p style="padding-left:40px">|-- validator // contains custom validator using class-validator</p>
<p style="padding-left:10px">|-- common // application level common codes. Recommend not to add anything else under here or modify the codes. Seek for advise if needed.</p>
<p style="padding-left:30px">|-- enum // contains the application level enum. The resource based enum should under its resource folder itself</p>
<p style="padding-left:30px">|-- exception // contains the application exception class. Note: Do not place service based exception here.</p>
<p style="padding-left:30px">|-- filter // application level NestJS filter </p>
<p style="padding-left:30px">|-- interceptor // application level NestJS intercepter </p>
<p style="padding-left:30px">|-- logger // application level logger lib. Recommend to use this logger </p>
<p style="padding-left:30px">|-- pagination // application level pagination helper. </p>
<p style="padding-left:30px">|-- query params // application level query params helper. </p>
<p style="padding-left:30px">|-- util // application level utilities helper. May put your helpers here that is keep using by different services in the application itself </p>
