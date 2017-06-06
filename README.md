# ESTEEM: A Novel Framework for Qualitatively Evaluating and Visualizing Spatiotemporal Embeddings in Social Media
## Live Demo
https://esteem.labworks.org

ESTEEM is an interactive web-based prototype visualization tool to allow you to explore dynamic word embeddings across regions using siple keyword queries.

# Getting Started
## Dependencies
To run the demo, install python and the following dependencies:
* Python 3.5
* Flask
* Pandas

We developed and tested our tool in the Anaconda python distribution (download: https://www.continuum.io/downloads), which has all of the above dependencies.

## Data
Make sure you put some embedding data in the appropraite folder. By default, ESTEEM will look for data in esteem/data following the examples from the paper:

```
esteem
    server.py
    package.json
    src
    ...
    data
        Brussels                 <- name of dataset that appears in esteem
            Belgium.pkl          <- name of region that appears in esteem
            France.pkl
            United Kingdom.pkl
        News
            unverified.pkl
            verified.pkl
```

The names of the files and folders determine how the regions and datasets appear in the tool. Each region gets its own pickle file.

The embeddings are stored as pickles of a multi-indexed pandas DataFrames with the following format:
* The first index is the keyword
* The second index is the timestamp (pandas DatetimeIndex)
* The columns are the embedding dimensions. Column names are ignored.


## Server
Once the data is in place and the depencencies are installed, you can start up the python server as follows:

```
python server.py
```

and then go to:

http://localhost:8801

## Development
The development server can be started with the command

```
npm start
```

The development server will perform live browser reloads when the JavaScript or CSS code changes. The development server hosts the demo at:

http://localhost:8800