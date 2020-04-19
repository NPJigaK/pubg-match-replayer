let app;
let viewport;
let worldScale;
let teamGraphicsArr = [];
let flightPathContainer;
let phaseCircleGraphicsArr = [];
let blueZoneGraphics;
let oldTimeMsec = 0;
let nowTimeMsec = 0;

function currentPhase(nowTime) {
  for (let i = 1; i < isGame.allPhase.length; i++) {
    if (isGame.allPhase[i].msSinceEpoch > nowTime) {
      return i - 1;
    }
  }
  return isGame.allPhase.length - 1
}

function removeTrackingLine(num) {
  _.forEach(teamGraphicsArr[num].member, member => {
    _.forEach(member.polygons, polygon => {
      polygon.points.length = 0;
    });
    member.graphics.visible = false;
    member.graphics.geometry.invalidate();
    member.circleGraphics.visible = false;
    member.basicText.visible = false;
    // console.log(member)
  })
}

function drawTrackingLine(num) {
  _.forEach(teamGraphicsArr[num].member, member => {
    for (let i = 0; i < nowTimeMsec; i += 500) {
      if (i > member.landingTime) {
        let stateAt = _stateAt(i);
        let location = stateAt.playerLocations[member.name];
        member.polygons[currentPhase(i)].points.push(location.x / 100,
            location.y / 100);
      }
    }
    member.graphics.visible = true;
    member.graphics.geometry.invalidate();
    member.circleGraphics.visible = true;
    member.basicText.visible = true;
    // console.log(member)
  })
}

function updateCircle(blueZone, isGame) {
  for (let i = 0; i < phaseCircleGraphicsArr.length; i++) {
    if (isGame && isGame.now >= i + 1) {
      phaseCircleGraphicsArr[i].graphics.visible = true;
    } else {
      phaseCircleGraphicsArr[i].graphics.visible = false;
    }
  }
  if (blueZoneGraphics) {
    blueZoneGraphics.geometry.graphicsData[0].shape.x = blueZone.x / 100;
    blueZoneGraphics.geometry.graphicsData[0].shape.y = blueZone.y / 100;
    blueZoneGraphics.geometry.graphicsData[0].shape.radius = blueZone.radius
        / 100;
    blueZoneGraphics.geometry.invalidate();
  }
}

function updateReplayer(playTimeMsec) {
  nowTimeMsec = playTimeMsec;

  let stateAt = _stateAt(nowTimeMsec)
  _.forEach(teamGraphicsArr, team => {
    //console.log(team)
    _.forEach(team.member, member => {
      let location = stateAt.playerLocations[member.name];
      member.circleGraphics.geometry.graphicsData[0].shape.x = location.x / 100;
      member.circleGraphics.geometry.graphicsData[0].shape.y = location.y / 100;
      member.circleGraphics.geometry.invalidate();
      member.basicText.x = location.x / 100;
      member.basicText.y = location.y / 100;

      updatePlayerList(stateAt.players[member.name]);

      if (isDeadFlag) {
        if (stateAt.players[member.name].status == "dead") {
          member.circleGraphics.visible = false;
          member.basicText.visible = false;
        } else {
          member.circleGraphics.visible = true;
          member.basicText.visible = true;
        }
      } else if (isTrackingFlag) {
        if (team.visible) {
          let diff = Math.round(Math.abs(nowTimeMsec - oldTimeMsec));
          for (let i = 0; i < diff; i++) {
            if (nowTimeMsec > oldTimeMsec) {
              let interval = Math.round(nowTimeMsec - diff + i)
              if (interval % 500 == 0) {
                let diffLocation =
                    _stateAt(interval).playerLocations[member.name];
                if (interval > member.landingTime) {
                  member.polygons[currentPhase(interval)].points.push(
                      diffLocation.x / 100,
                      diffLocation.y / 100);
                }
                //console.log(interval)
              }
            } else if (nowTimeMsec < oldTimeMsec) {
              let interval = Math.round(nowTimeMsec + diff - i)
              if (interval % 500 == 0) {
                member.polygons[currentPhase(interval)].points.pop();
                member.polygons[currentPhase(interval)].points.pop();
              }
            }
          }
          member.graphics.geometry.invalidate();
        }
      } else {
        member.circleGraphics.visible = true;
        member.basicText.visible = true;
      }
    })
  })
  oldTimeMsec = nowTimeMsec;
}

function setReplay() {
  updateReplayer(playTimeSlider.noUiSlider.get());
}

function setLandingLocation() {
  let flag = false;
  for (let i = 5000; flag === false; i += 100) {
    let stateAt = _stateAt(i);
    _.forEach(teamGraphicsArr, team => {
      _.forEach(team.member, member => {
        if (!member.visible) {
          let playerLocation = stateAt.playerLocations[member.name];
          if (!playerLocation.descended) {
            member.circleGraphics.geometry.graphicsData[0].shape.x = playerLocation.x
                / 100;
            member.circleGraphics.geometry.graphicsData[0].shape.y = playerLocation.y
                / 100;
            member.circleGraphics.visible = true;
            member.circleGraphics.geometry.invalidate();
            member.basicText.visible = true;
            member.basicText.x = playerLocation.x / 100;
            member.basicText.y = playerLocation.y / 100;
            //member.visible = true;
            // set landingTime
            member.landingTime = i;
          }
        }
      })
    })
    // Todo 降下地点の判定もっと綺麗にできないか？
    // https://github.com/KagiJPN/pubg-match-replayer/issues/17
    if (i > 170000) {
      flag = true;
    }
  }
}

function resetMap() {
  _.forEach(teamGraphicsArr, team => {
    _.forEach(team.member, member => {
      member.graphics.visible = false;
      member.circleGraphics.visible = false;
      member.basicText.visible = false;
    })
  })
}

function InitMoreMap(flightPath, isGame) {
  setFlightPath(flightPath)
  setPhaseCircle(isGame)

  // create blueZone graphics object.
  blueZoneGraphics = new PIXI.Graphics();
  blueZoneGraphics.lineStyle(100 * worldScale, 0x0000ff, 1);
  blueZoneGraphics.drawCircle(0, 0, 0);
  viewport.addChild(blueZoneGraphics);
}

function setFlightPath(flightPath) {
  flightPathContainer = new PIXI.Container();
  let firstLocation = flightPath.first;
  let lastLocation = flightPath.last;

  // console.log(firstLocation, lastLocation)
  let line = new PIXI.Graphics()
  line.lineStyle(5 / worldScale, 0xFF0000);
  line.moveTo(firstLocation.x, firstLocation.y);
  line.lineTo(lastLocation.x, lastLocation.y);
  flightPathContainer.addChild(line);

  let startCircle = new PIXI.Graphics();
  startCircle.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
  startCircle.beginFill(0x000000, 1);
  startCircle.drawCircle(firstLocation.x, firstLocation.y, 5 / worldScale);
  startCircle.endFill();
  flightPathContainer.addChild(startCircle);

  let endTriangle = new PIXI.Sprite(
      PIXI.Texture.from(`../src/assets/icons/flightPath-triangle.png`));
  endTriangle.scale.x = endTriangle.scale.y = 0.05 / worldScale;
  endTriangle.x = lastLocation.x;
  endTriangle.y = lastLocation.y;
  //endTriangle.pivot.x = endTriangle.pivot.y = 400;
  endTriangle.anchor.set(0.5);
  endTriangle.rotation = getDegree(firstLocation.x, firstLocation.y,
      lastLocation.x, lastLocation.y)
  // console.log(getDegree(firstLocation.x, firstLocation.y, lastLocation.x, lastLocation.y))
  flightPathContainer.addChild(endTriangle);

  viewport.addChild(flightPathContainer);
}

function setPhaseCircle(isGame) {
  let phaseCount = 3;
  let count = 0;
  _.forEach(isGame.allPhase, phase => {
    let phaseCircle = new PIXI.Graphics();
    let circleColor = getRandomColor();
    phaseCircle.lineStyle(phaseCount / worldScale, circleColor, 0.8);
    phaseCircle.drawCircle(
        phase.safeZone.x / 100,
        phase.safeZone.y / 100,
        phase.safeZone.radius / 100);
    viewport.addChild(phaseCircle);

    phaseCount -= 0.3;

    phaseCircleGraphicsArr.push({
      circleColor: circleColor,
      graphics: phaseCircle
    })

    // ToDo lineStyle.color を設定している場所がよくない
    // https://github.com/KagiJPN/pubg-match-replayer/issues/15
    _.forEach(teamGraphicsArr, team => {
      _.forEach(team.member, member => {
        let polygon = new PIXI.Polygon();
        polygon.closeStroke = false;
        member.graphics.drawPolygon(polygon);
        member.graphics.geometry.graphicsData[count].lineStyle.color = circleColor
        member.polygons.push(polygon)
      })
    })

    count++
  })
  // console.log(phaseCircleGraphicsArr)
}

function InitTeamGraphics(roster, playerLocations) {
  let playerNum = 1;
  _.forEach(roster, team => {
    const teamColor = getRandomColor();
    let teamJson = {
      teamColor: teamColor,
      visible: false,
      member: []
    }
    _.forEach(team, player => {
      let graphics = new PIXI.Graphics();
      graphics.lineStyle(7, teamColor);
      graphics.visible = false;
      viewport.addChild(graphics);

      let location = _.pick(playerLocations, player)[player];

      let circleGraphics = new PIXI.Graphics();
      circleGraphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
      circleGraphics.beginFill(teamColor, 0.5);
      circleGraphics.drawCircle(location.x / 100, location.y / 100, 50);
      circleGraphics.endFill();
      circleGraphics.pivot.x = circleGraphics.pivot.y = 25;
      viewport.addChild(circleGraphics);

      let basicText = new PIXI.Text(playerNum,
          new PIXI.TextStyle({align: "center", fontSize: 70}));
      basicText.x = location.x;
      basicText.y = location.y;
      basicText.pivot.x = basicText.pivot.y = 65;
      viewport.addChild(basicText);

      teamJson.member.push({
        name: player,
        playerNum: playerNum++,
        graphics: graphics,
        polygons: [],
        circleGraphics: circleGraphics,
        basicText: basicText,
        visible: false
      })
    })
    teamGraphicsArr.push(teamJson)
  })
  // console.log(teamGraphicsArr)
}

function InitMap(mapName) {
  const mapSize = PUBG_MAPS.getByValue("original", mapName).mapSize;
  const originalMapName = PUBG_MAPS.getByValue("original", mapName).name;
  const [worldWidth, worldHeight] = [mapSize, mapSize];

  var pixi_container = document.getElementById('#pixiContainer');

  var w = pixi_container.clientWidth;
  var h = pixi_container.clientHeight;

  worldScale = 1000 / mapSize;
  // console.log(worldScale)

  app = new PIXI.Application();
  pixi_container.appendChild(app.view);

  // create viewport
  viewport = new Viewport.Viewport({
    screenWidth: w,
    screenHeight: h,
    worldWidth: worldWidth,
    worldHeight: worldHeight,

    interaction: app.renderer.plugins.interaction
  });

  // add the viewport to the stage
  app.stage.addChild(viewport);

  // activate plugins
  viewport
  .drag({wheelDrag: false})
  .clamp({
    top: 0,
    left: 0,
    right: worldWidth,
    bottom: worldHeight,
    underflow: 'center'
  })
  .pinch()
  .wheel()
  .clampZoom(
      {minWidth: w, minHeight: h, maxWidth: worldWidth, maxHeight: worldHeight})

  // initial fit world
  resize()

  // add pubg map
  const texture = PIXI.Texture.from(
      `../src/assets/maps/${originalMapName}.jpg`);
  viewport.addChild(new PIXI.Sprite(texture));

  // add event listener
  window.addEventListener('resize', () => resize());

  pixi_container.addEventListener("wheel", function (event) {
    event.preventDefault()
  }, {passive: false});

  function resize() {
    viewport.resize(pixi_container.clientWidth, pixi_container.clientHeight);
    app.renderer.resize(pixi_container.clientWidth,
        pixi_container.clientHeight);
    // ToDo ズームを維持しながらリサイズしたい
    // https://github.com/KagiJPN/pubg-match-replayer/issues/14
    viewport.fitWorld();
  }
}

// ToDo ズームを反映した状態でスクリーンショットを取りたい
// https://github.com/KagiJPN/pubg-match-replayer/issues/13
function takeScreenshot() {
  app.renderer.extract.canvas(viewport).toBlob((b) => {
    const a = document.createElement('a');
    document.body.append(a);
    a.download = 'screenshot';
    a.href = URL.createObjectURL(b);
    a.click();
    a.remove();
  }, 'image/png');
}

function getDegree(x1, y1, x2, y2) {
  const radian = Math.atan2(y2 - y1, x2 - x1);
  const degree = radian * (180 / Math.PI);
  return radian + 1.5708;
}
