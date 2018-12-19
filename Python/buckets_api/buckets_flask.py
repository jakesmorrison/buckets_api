from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api
from cassandra.cluster import Cluster

# export FLASK_APP=buckets_flask.py
# flask run --host=0.0.0.0

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"*": {"origins": "*"}})

class DraftResults(Resource):
    def get(self, todo_id):
        cassandra_to_api = []
        cluster = Cluster()
        session = cluster.connect('buckets')
        rows = session.execute('SELECT * FROM draft_results')
        for row in rows:
            cassandra_to_api.append({'over_under':row.over_under, 'owner':row.owner, 'points':row.points, 'team':row.team})
        return cassandra_to_api

    def post(self, todo_id):
        pass
        

api.add_resource(DraftResults, '/api/<string:todo_id>')
if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='137.201.50.151', port=5010)