pubg-match-replayer
===================

pubg-match-replayer is a PC web application designed to analyze MAP information for PLAYERUNKNOWN'S BATTLEGROUNDS matches.

You can use this tool by visiting [here](https://kagijpn.github.io/pubg-match-replayer/top/).

Recommended Environment:
- Google Chrome
  *Note: It may not function properly if you have any AdBlock-related extensions installed in your browser.
  *Note: It may not function properly if WebGL is not enabled in your browser settings. (If you haven't modified your browser settings, it should be fine.)
  *Please refer to [this guide](https://qiita.com/Hiroki_M/items/c93b5b642514cde556d6) for instructions on enabling WebGL.

If you are using the tool for the first time, please read the instructions below on how to use it.

## Usage

### How to use the Match Search page
When you go to the [Match Search page](https://kagijpn.github.io/pubg-match-replayer/top/), you will see the following screen:
![search-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer1.JPG)

This tool uses an **API KEY**. If you haven't obtained one yet, please follow the instructions in the section [How to obtain an API Key](#how-to-obtain-an-api-key) to obtain an **API KEY**.
- Paste the copied API key into the field labeled **API KEY** and click the **ADD** button on the right.
- If the API key is successfully added, it will be displayed as shown in the image.

Once you have registered your API key, you can perform a search:
- Enter the platform and the PUBG NAME you want to search for, and click the **SEARCH** button on the right.
- Additionally, by clicking on **TOURNAMENT** at the top of the platform, you can perform map analysis for all previous official tournaments.

After clicking, you will be redirected to the [Match List page](#how-to-use-the-match-list-page).

#### How to obtain an API Key
To obtain an API Key, go to the [PUBG Developer Portal](https://developer.pubg.com/).
Click on **GET YOUR OWN API KEY** and follow the instructions to sign up (it's free). (The website is in English, but the process is not too complicated.)
Eventually, you will reach a page similar to the one below. Copy the string labeled **API KEY**:
![pubg-apikey](https://raw.githubusercontent.com/KagiJPN/pubg-bluezone-predictor/master/docs/resource/img/pubg-apikey.JPG)

##### Tips
You can register multiple API Keys for this tool.
With one account on the [PUBG Developer Portal](https://developer.pubg.com/), you can generate up to 5 **API Keys**.
It is recommended to generate and register all 5 keys.

### How to use the Match List page
If the transition is successful, you will land on a screen like this:
![matches-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer2.JPG)

- Select the match you want to analyze and click **MAP ANALYZE**.

### How to use the MAP Analysis page
This page is the main screen of the tool.
Currently, there are two main functions:
- [Confirm Landing Locations (LandingLocation)](#confirm-landing-locations-landinglocation)
- [Confirm Positions (Replay)](#confirm-positions-replay)

#### Confirm Landing Locations (LandingLocation)
This screen is displayed first.
The numbers shown are

 associated with the players in the list on the right.
It displays the location where each player first landed.
![landing-location-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer3.JPG)

#### Confirm Positions (Replay)
You can switch between screens by clicking **Replay** in the upper right corner.
By moving the slider at the top of the map, you can advance or rewind the match time.
You can see the positions of each player at a specific time.
*Note: The red line below the slider indicates the time when each phase changes.
*Note: The weapon and skull icons on the slider indicate the time of your own kills and deaths.
*Clicking each icon allows you to skip to that specific time.
![replay-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer4.JPG)

In Replay, there are two options:
You can toggle the settings ON/OFF by clicking each button.
- [isDead](#isdead)
- [TrackingLine](#trackingline)

##### isDead
This setting is enabled by default.
When this setting is ON, the player's position will no longer be displayed on the map after they die.
When it is OFF, the position of the player who died will still be displayed on the map.
![isDead](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer5.JPG)


##### TrackingLine
When this setting is ON, a line representing the path taken by the player will be displayed on the map.
Please note that after enabling this setting, you can display the desired team by clicking on it in the list on the right.
Due to performance considerations, this option is limited to a maximum of 6 teams. (This limit may be changed based on user feedback.)
![TrackingLine](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer6.JPG)

#### Other
There are several other useful features available (more may be added in future updates).
- [Auto Replay](#auto-replay)
- [Screenshot](#screenshot)

##### Auto Replay
You can automatically move the slider at a constant interval.
Click the button on the right side of the slider to start playback, and click it again to stop.
The slider on the right side controls the playback speed (default is 6x).
*Refer to the image below:
![AutoReplay](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer7.JPG)

##### Screenshot
![screenshot](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer8.JPG)
By clicking the screenshot button in the upper right corner of the map, you can download a screenshot of the map.
*Please note that this feature may take some time to process as it is not yet optimized.

## Finally
There may be some confusing explanations.
If you have any questions, feel free to contact me on [my twitter](https://twitter.com/KagiJPN)!

We also welcome suggestions and feedback.
No matter how small or detailed, we will consider and incorporate them to make the tool better and more user-friendly.
Thank you for your cooperation in updating and improving this tool!
