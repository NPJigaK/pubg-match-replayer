function getTelemetryUrl(pubgMatch) {
  const assetId = pubgMatch.data.relationships.assets.data[0].id
  const asset = pubgMatch.included.find(
      i => i.type === 'asset' && i.id === assetId)
  return asset.attributes.URL
}

function check(pubgMatches) {
  const filteredMatches = pubgMatches.filter(
      m => m.data.attributes.duration <= 10000)
  if (!_.isEmpty(filteredMatches)) {
    return filteredMatches
  }
}

function getMatches(pubgMatches) {
  let filteredMatches = check(pubgMatches);

  let matchData = [];
  for (const key in filteredMatches) {
    matchData.push({
      id: filteredMatches[key].data.id,
      shardId: filteredMatches[key].data.attributes.shardId,
      gameMode: filteredMatches[key].data.attributes.gameMode,
      playedAt: filteredMatches[key].data.attributes.createdAt,
      mapName: filteredMatches[key].data.attributes.mapName,
      durationSeconds: filteredMatches[key].data.attributes.duration,
      telemetryUrl: getTelemetryUrl(filteredMatches[key]),
      players: getMatchPlayer(filteredMatches[key]),
    });
  }

  return matchData;
}

function getMatchPlayer(pubgMatch) {
  let matchPlayer = [];
  pubgMatch.included
  .filter(i => i.type === "participant")
  .map(i =>
      matchPlayer.push({
        matchId: pubgMatch.data.id,
        id: i.attributes.stats.playerId,
        name: i.attributes.stats.name,
        rosterId: pubgMatch.included.find(i2 => {
          if (i2.type === "roster") {
            return i2.relationships.participants.data.some(d => {
              return d.id === i.id;
            });
          }

          return false;
        }).id,
        stats: _.pick(i.attributes.stats, ["winPlace", "kills"])
      })
  );

  return matchPlayer;
}
