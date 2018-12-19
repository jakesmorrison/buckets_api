from cassandra.cluster import Cluster

data = [
    {'owner': 'Adam', 'team': 'BKN', 'over_under': 'Over', 'points':'32.5'},
    {'owner': 'Adam', 'team': 'WAS', 'over_under': 'Under', 'points':'45.5'},
    {'owner': 'Adam', 'team': 'NYK', 'over_under': 'Under', 'points':'26.5'},
    {'owner': 'Adam', 'team': 'TOR', 'over_under': 'Under', 'points':'55.5'},
    {'owner': 'Adam', 'team': 'DEN', 'over_under': 'Over', 'points':'48.5'},
    {'owner': 'Adam', 'team': 'PHX', 'over_under': 'Over', 'points':'29.5'},
    {'owner': 'Adam', 'team': 'IND', 'over_under': 'Over', 'points':'47.5'},
    {'owner': 'Adam', 'team': 'HOU', 'over_under': 'Under', 'points':'56.5'},
    {'owner': 'Marty', 'team': 'POR', 'over_under': 'Over', 'points':'42.5'},
    {'owner': 'Marty', 'team': 'LAL', 'over_under': 'Under', 'points':'48.5'},
    {'owner': 'Marty', 'team': 'TOR', 'over_under': 'Over', 'points':'55.5'},
    {'owner': 'Marty', 'team': 'HOU', 'over_under': 'Over', 'points':'56.5'},
    {'owner': 'Marty', 'team': 'UTA', 'over_under': 'Under', 'points':'50.5'},
    {'owner': 'Marty', 'team': 'MEM', 'over_under': 'Over', 'points':'34.5'},
    {'owner': 'Marty', 'team': 'MIA', 'over_under': 'Under', 'points':'43.5'},
    {'owner': 'Marty', 'team': 'CHA', 'over_under': 'Under', 'points':'36.5'},
    {'owner': 'Billy', 'team': 'PHX', 'over_under': 'Under', 'points':'29.5'},
    {'owner': 'Billy', 'team': 'CLE', 'over_under': 'Under', 'points':'31.5'},
    {'owner': 'Billy', 'team': 'MIL', 'over_under': 'Over', 'points':'48.5'},
    {'owner': 'Billy', 'team': 'DEN', 'over_under': 'Under', 'points':'48.5'},
    {'owner': 'Billy', 'team': 'SAS', 'over_under': 'Over', 'points':'42.5'},
    {'owner': 'Billy', 'team': 'SAC', 'over_under': 'Under', 'points':'25.5'},
    {'owner': 'Billy', 'team': 'MIN', 'over_under': 'Over', 'points':'41.5'},
    {'owner': 'Billy', 'team': 'ATL', 'over_under': 'Over', 'points':'22.5'},
    {'owner': 'Zeus', 'team': 'BOS', 'over_under': 'Over', 'points':'58.5'},
    {'owner': 'Zeus', 'team': 'DAL', 'over_under': 'Over', 'points':'33.5'},
    {'owner': 'Zeus', 'team': 'CHI', 'over_under': 'Under', 'points':'29.5'},
    {'owner': 'Zeus', 'team': 'GSW', 'over_under': 'Under', 'points':'62.5'},
    {'owner': 'Zeus', 'team': 'ATL', 'over_under': 'Under', 'points':'22.5'},
    {'owner': 'Zeus', 'team': 'WAS', 'over_under': 'Over', 'points':'45.5'},
    {'owner': 'Zeus', 'team': 'LAC', 'over_under': 'Over', 'points':'36.5'},
    {'owner': 'Zeus', 'team': 'ORL', 'over_under': 'Under', 'points':'30.5'},
    {'owner': 'Jesse', 'team': 'MIA', 'over_under': 'Over', 'points':'43.5'},
    {'owner': 'Jesse', 'team': 'NOP', 'over_under': 'Under', 'points':'45.5'},
    {'owner': 'Jesse', 'team': 'BKN', 'over_under': 'Under', 'points':'32.5'},
    {'owner': 'Jesse', 'team': 'LAC', 'over_under': 'Under', 'points':'36.5'},
    {'owner': 'Jesse', 'team': 'PHI', 'over_under': 'Under', 'points':'53.5'},
    {'owner': 'Jesse', 'team': 'OKC', 'over_under': 'Under', 'points':'48.5'},
    {'owner': 'Jesse', 'team': 'DET', 'over_under': 'Under', 'points':'38.5'},
    {'owner': 'Jesse', 'team': 'POR', 'over_under': 'Under', 'points':'42.5'},
    {'owner': 'Amir', 'team': 'SAS', 'over_under': 'Under', 'points':'42.5'},
    {'owner': 'Amir', 'team': 'LAL', 'over_under': 'Over', 'points':'48.5'},
    {'owner': 'Amir', 'team': 'OKC', 'over_under': 'Over', 'points':'48.5'},
    {'owner': 'Amir', 'team': 'UTA', 'over_under': 'Over', 'points':'50.5'},
    {'owner': 'Amir', 'team': 'MIN', 'over_under': 'Under', 'points':'41.5'},
    {'owner': 'Amir', 'team': 'CLE', 'over_under': 'Over', 'points':'31.5'},
    {'owner': 'Amir', 'team': 'ORL', 'over_under': 'Over', 'points':'30.5'},
    {'owner': 'Amir', 'team': 'NYK', 'over_under': 'Over', 'points':'26.5'},
    {'owner': 'CW', 'team': 'PHI', 'over_under': 'Over', 'points':'53.5'},
    {'owner': 'CW', 'team': 'DET', 'over_under': 'Over', 'points':'38.5'},
    {'owner': 'CW', 'team': 'GSW', 'over_under': 'Over', 'points':'62.5'},
    {'owner': 'CW', 'team': 'IND', 'over_under': 'Under', 'points':'47.5'},
    {'owner': 'CW', 'team': 'CHA', 'over_under': 'Over', 'points':'36.5'},
    {'owner': 'CW', 'team': 'MEM', 'over_under': 'Under', 'points':'34.5'},
    {'owner': 'CW', 'team': 'NOP', 'over_under': 'Over', 'points':'45.5'},
    {'owner': 'CW', 'team': 'SAC', 'over_under': 'Over', 'points':'25.5'},
    {'owner': 'Fans', 'team': 'CHI', 'over_under': 'Over', 'points':'29.5'},
    {'owner': 'Fans', 'team': 'DAL', 'over_under': 'Under', 'points':'33.5'},
    {'owner': 'Fans', 'team': 'MIL', 'over_under': 'Under', 'points':'48.5'},
    {'owner': 'Fans', 'team': 'BOS', 'over_under': 'Under', 'points':'58.5'}
]

cluster = Cluster()
session = cluster.connect('buckets')

for x in data:
    session.execute(
        """
        INSERT INTO buckets.draft_results (id, owner, team, over_under, points)
        VALUES (now(),%s, %s, %s, %s)
        """,
        (x['owner'], x['team'], x['over_under'], x['points'])
    )
