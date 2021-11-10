export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "This is a sample Geolocation server.  the server will help you to find distance between 2 cities, you can update the distance as well.  \n We also monitor the requests so you can find the most popular search",
        "version": "1.0.0",
        "title": "Swagger Geolocttion Service",
        "contact": {
            "email": "mymail@gmail.com"
        }
    },
    "host": "localhost:8080/hello",
    "tags": [
        {
            "name": "distance",
            "description": "Distance between 2 cities"
        },
        {
            "name": "popularsearch",
            "description": "Popular serach information"
        },
        {
            "name": "health",
            "description": "Service health status"
        },
        {
            "name": "hello",
            "description": "Dummy url"
        }
    ],
    "schemes": [
        "http"
    ],
    "paths": {
        "/distance": {
            "post": {
                "tags": [
                    "distance"
                ],
                "summary": "Upsert a new distance to the store",
                "description": "",
                "operationId": "addPet",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "CitiesDistance object that needs to be upsert to the store",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/CitiesDistance"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Indicate the action completed successfully",
                        "schema": {
                            "$ref": "#/definitions/CitiesDistanceHits"
                        }
                    },
                    "400": {
                        "description": "Invalid input"
                    },
                    "500": {
                        "description": "Internal Service Error"
                    }
                }
            },
            "get": {
                "tags": [
                    "distance"
                ],
                "summary": "Finds distance by source and destination",
                "operationId": "findDistance",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "source",
                        "in": "query",
                        "description": "Source city",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "destination",
                        "in": "query",
                        "description": "Destination city",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "distance": {
                                    "type": "integer",
                                    "format": "float",
                                    "description": "The distance between the cities",
                                    "example": 2.3
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid parameters"
                    },
                    "404": {
                        "description": "Error, no available route"
                    },
                    "500": {
                        "description": "Internal Service Error"
                    }
                }
            }
        },
        "/popularsearch": {
            "get": {
                "tags": [
                    "popularsearch"
                ],
                "summary": "Finds the most popular search",
                "description": "Find the search with the highest hits",
                "operationId": "getPopularSearch",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "The most popular search",
                        "schema": {
                            "$ref": "#/definitions/CitiesDistanceHits"
                        }
                    },
                    "204": {
                        "description": "popular search not found"
                    },
                    "500": {
                        "description": "Internal Service Error"
                    }
                }
            }
        },
        "/health": {
            "get": {
                "tags": [
                    "health"
                ],
                "summary": "Get the service health status",
                "description": "Check if there is a connection to the db",
                "operationId": "helathStatus",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "There is a connection to the DB"
                    },
                    "500": {
                        "description": "No connection to DB"
                    }
                }
            }
        },
        "/hello": {
            "get": {
                "tags": [
                    "hello"
                ],
                "summary": "Dummy url",
                "description": "Check if service available",
                "operationId": "helloStatus",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "There service is alive"
                    },
                    "500": {
                        "description": "No connection to DB"
                    }
                }
            }
        }
    },
    "definitions": {
        "CitiesDistance": {
            "type": "object",
            "required": [
                "source",
                "destination",
                "distance"
            ],
            "properties": {
                "source": {
                    "type": "string",
                    "example": "RAMAT GAN"
                },
                "destination": {
                    "type": "string",
                    "example": "BNEI BRAK"
                },
                "distance": {
                    "type": "number",
                    "example": 12.3
                }
            },
            "xml": {
                "name": "CitiesDistance"
            }
        },
        "CitiesDistanceHits": {
            "type": "object",
            "required": [
                "source",
                "destination",
                "hits"
            ],
            "properties": {
                "source": {
                    "type": "string",
                    "example": "JERUSALEM"
                },
                "destination": {
                    "type": "string",
                    "example": "TEL AVIV"
                },
                "hits": {
                    "type": "number",
                    "format": "float",
                    "example": 20
                }
            },
            "xml": {
                "name": "CitiesDistanceHits"
            }
        }
    }
}