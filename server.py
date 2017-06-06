# Notice: This computer software was prepared by Battelle Memorial Institute,
# hereinafter the Contractor, under Contract No. DE-AC05-76RL01830 with the
# Department of Energy (DOE).  All rights in the computer software are
# reserved by DOE on behalf of the United States Government and the Contractor
# as provided in the Contract.  You are authorized to use this computer software
# for Governmental purposes but it is not to be released or distributed to the
# public.  NEITHER THE GOVERNMENT NOR THE CONTRACTOR MAKES ANY WARRANTY, EXPRESS
# OR IMPLIED, OR ASSUMES ANY LIABILITY FOR THE USE OF THIS SOFTWARE.  This
# notice including this sentence must appear on any copies of this computer
# software.


import os, json, glob

import flask
from flask import request, jsonify
from flask.helpers import send_file

import pandas as pd

from functools import lru_cache

MODEL_PATH = 'data'
CLIENT_PATH = 'dist'

app = flask.Flask(__name__)
app.secret_key = os.urandom(2557555)

from sklearn.neighbors import BallTree

class Embedding:
    def __init__(self, name, region):
        path = os.path.join(MODEL_PATH, name, region) + '.pkl'
        self.df = pd.read_pickle(path)
        self.trees = [(t, dft, BallTree(dft.values))
                      for t,dft in self.df.groupby(level=1)]
        self.times = self.df.index.get_level_values(1).unique()

    def query(self, word, k=10):
        for time, dft, tree in self.trees:
            words = dft.index.get_level_values(0)
            if word in words:
                y = dft.loc[word].values
                D,I = tree.query(y, k=(k + 1), sort_results=True)
                yield words[I[0, 1:]].tolist()

@lru_cache()
def get_embedding(name, region):
    return Embedding(name, region)

@app.route('/')
@app.route('/<path:path>')
def send_static(path='index.html'):
    return flask.send_from_directory(CLIENT_PATH, path)

@app.route('/api/')
def send_api_choices():
    names = [os.path.basename(path) for path in glob.glob('%s/*'%MODEL_PATH)]
    return jsonify(modelNames=names)

@app.route('/api/<name>')
def send_api_model(name):
    path = os.path.join(MODEL_PATH, name, 'model.json')
    print(path)
    with open(path) as fp:
        model = json.load(fp)
        return jsonify(model)

@app.route('/api/<name>/<region>/<word>')
def send_api_word(name, region, word):
    model = get_embedding(name, region)
    return jsonify(name=name,
                   region=region,
                   word=word,
                   neighbors=list(model.query(word)),
                   times=model.times.astype(str).tolist())

@app.errorhandler(Exception)
def all_exception_handler(error):
    app.logger.error(error, exc_info=True)
    return 'Internal Server Error: ' + str(error.message), 500

@app.errorhandler(404)
def not_found(error=None):
    message = {
            'status': 404,
            'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--port', help='port', default=8801, type=int)
    parser.add_argument('-d', '--debug', default=False, help='run as debug', action='store_true')
    parser.add_argument('-o', '--host', default=None, help='host')

    parser.add_argument('-m', '--model', default=MODEL_PATH, help='path to pickled embedding data')

    args = parser.parse_args()

    MODEL_PATH = args.model

    print(' * starting app')
    print('   *', args)

    app.run(threaded=True, port=args.port, debug=args.debug, host=args.host)
