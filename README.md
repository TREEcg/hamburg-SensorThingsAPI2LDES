# RDFC Pipeline to ingest Hamburg mobility counting data
This repository includes a RDFC Pipeline that converts a provided observation list from the SensorThings API, 
and converts it into an RDF Linked Data Event Stream using the RDF-Connect framework.

## Configure

The configuration of the data published as an LDES is found in `docker-compose.yml`.
Concretely, the parameters are passed as environment variables to the relevant docker container.
The pageSize indicates the size of the pages retrieved from the SensorThings API.
The URL parameter is the URL of the Observations page that is to be converted to an LDES.
```

  hamburg:
    ...
    environment:
      - URL=<URL>
      - pageSize=<pageSize>
```

## Setup
To run this, you need to have docker-compose installed

```
docker-compose up
```

## Consume
To run the client, run

```
bash client/run.sh
```

## Todo

- [ ] Implement socket solution to keep streaming new members as the underlying stream is updated.