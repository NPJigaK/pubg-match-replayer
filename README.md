# pubg-match-replayer
※ 日本の方向けのドキュメントは[こちら](https://github.com/KagiJPN/pubg-match-replayer/blob/master/README_JP.md)！

This tool is a PC-oriented web application intended for analyzing map information from PLAYERUNKNOWN'S BATTLEGROUNDS matches.  
You can use this tool from [here](https://kagijpn.github.io/pubg-match-replayer/top/).

## Recommended Environment  
- Google Chrome  
※ If **AdBlock** is installed in your browser, it may not work correctly.  
※ If **WebGL** is not enabled in your browser settings, it may not work correctly. (You should be fine if you haven't specifically tampered with your browser settings)  
※ Please verify [how to enable WebGL](https://qiita.com/Hiroki_M/items/c93b5b642514cde556d6).

If you're a first-time user, please read the following [usage instructions](#usage-instructions).

## Usage Instructions

### How to Use the Match Search Page
Upon accessing the [match search page](https://kagijpn.github.io/pubg-match-replayer/top/), you will see this screen.
![search-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer1.JPG)

This tool uses an **API KEY**. If you haven't obtained one yet, please get your **API KEY** from [APIKEY issuance procedure](#APIKEY-issuance-procedure).  
- Paste the string you just copied into the **API KEY** section and click on the **ADD** button on the right.  
- If added successfully, the API KEY you added will be displayed as in the image.  

Once you've registered your **API KEY**, you can perform a search.
- Enter the platform and the PUBG NAME you want to search for, then click on the **SEARCH** button on the right.
- By clicking on **TOURNAMENT** at the top of the platform, you can analyze the maps of all past official tournaments.

After clicking, you will be redirected to the [match list page](#how-to-use-the-match-list-page).

#### APIKEY Issuance Procedure
You will obtain the API Key from the [PUBG Developer Portal](https://developer.pubg.com/).  
Click on **GET YOUR OWN API KEY** and proceed as instructed, registering for a membership (free of charge).  
Ultimately, you will reach a page like the one below, where you should copy the string where it says **API KEY**.   
![pubg-apikey](https://raw.githubusercontent.com/KagiJPN/pubg-bluezone-predictor/master/docs/resource/img/pubg-apikey.JPG)

##### Tips
Multiple API Keys can be registered with this tool.  
You can issue up to 5 **API Keys** per account on the [PUBG Developer Portal](https://developer.pubg.com/).  
It is recommended to issue 5 and register them.  

### How to Use the Match List Page
Once successfully navigated, you will land on this page.  
![matches-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer2.JPG)

- Select the match you want to analyze and click on **MAP ANALYZE**.

### How to Use the MAP Analysis Page
This page is the main screen of this tool.  
Currently, there are mainly two features.

- [Landing Location Confirmation (LandingLocation)](#Landing-Location-Confirmation-(LandingLocation))
- [Position Confirmation (Replay)](#Position-Confirmation-(Replay))

#### Landing Location Confirmation (LandingLocation)
This screen is displayed first.  
The displayed numbers are linked to the

 players on the right list.  
It shows the first landing point.  
![landing-location-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer3.JPG)

#### Position Confirmation (Replay)
By clicking **Replay** at the top right of the screen, you can switch screens.  
By moving the slider on top of the MAP, you can advance or rewind the match time.  
You can check where each player is at that time.  
※ The red line below the slider indicates the time when each phase has switched.  
※ The weapon icons and skull icons on the slider indicate the times when you killed or died.  
※ You can skip to that time by clicking on each icon.  
![replay-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer4.JPG)

Replay has two options.  
You can toggle ON/OFF by clicking on each button.
- [isDead](#isDead)
- [TrackingLine](#TrackingLine)

##### isDead
This is initially set.  
If this setting is ON, the player will not be displayed on the MAP when dead.  
If you turn it OFF, the dead position will remain displayed on the MAP.  
![isDead](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer5.JPG)


##### TrackingLine
If you turn this setting ON, you can display a line on the path the player took.  
Please note that after turning this setting ON, you can display it by clicking on the team you want to display from the list on the right.  
Since this option is a bit heavy on processing, you can only set up to 6 teams at a time (subject to change if there is a demand).  
![TrackingLine](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer6.JPG)

#### Other
There are some other useful features as well (and more may be added in future updates).  
- [Auto Playback](#Auto-Playback)
- [Screenshot](#Screenshot)

##### Auto Playback
You can automatically move the slider at a constant interval speed.  
Clicking the button on the right side of the slider starts playback, and clicking again stops it.  
The slider on the further right side adjusts the speed multiplier (default is 6x).  
※ Refer to the image below.  
![AutoReplay](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer7.JPG)  

##### Screenshot
![screenshot](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer8.JPG)  
By clicking the screenshot button on the upper right of the map, you can download the map image.  
※ This feature is not optimized and may take a little time.

## Contributing
While some explanations may be hard to understand, if there is anything you don't understand, please don't hesitate to contact [me via Twitter](https://twitter.com/KagiJPN)!

We're always open to suggestions and improvements. No matter how small or trivial they might seem, we'll consider each one and strive to incorporate them to make this tool better and more user-friendly. We look forward to your continued cooperation!

## License
This content is released under the [Apache License 2.0](https://github.com/KagiJPN/pubg-match-replayer/blob/master/LICENSE). 
