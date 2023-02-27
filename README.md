A route planner with a focus on sustainability
============================================================


Introduction
------------

TraWell is a User interface for foot, transit, bike and car routing. It's goal is to promote the compatibility of sustainability and easy travel planning to enable green travel for everyone. It will show you emissions you are causing with the selected route to help you select the best travel option. Feel free to test and participate, all code contributions and bug reports are welcome!

### How to get started

```
# git clone this repository
git clone https://github.com/Miiiluuu/eco-route-planner.git
cd eco-route-planner

# install dependencies
npm install

# run web server
npm run dev

# open browser at 'http://localhost:3000'
```

### Date Sources
- [OpenStreetMap](https://www.openstreetmap.org/#map=6/51.330/10.453) is a crowd sourced geo-database and also the biggest source for open map data.
- [OpenTripPlanner](https://docs.opentripplanner.org/en/v2.2.0/) as multimodal trip planner 
- [photon](https://photon.komoot.io/) for geocoding (a OpenStreetMap data based geocoder)
- [GTFS (General Transport Feed Specification)] (https://gtfs.org/) is a common exchange format for public (static) transit schedules and related information such as stop locations etcetera. It is the default format OpenTripPlanner is using for public transport routing.
- emission factors provided by the [German Environment Agency (Umweltbundesamt – UBA) ProBas database](https://www.probas.umweltbundesamt.de/php/index.php)

Developers
----------

### Active Team

#### TechLabs Supervision

- [Konstantin Münster](https://github.com/konstantinmuenster)

#### core developers

- [Verena Geble](https://github.com/veroges)
- [Kai Schweers](https://github.com/Garvinus)
- [Svenja Koch](https://github.com/Sivinia-Josephine)
- [Mieke Möller](https://github.com/Miiiluuu)

### Former Members, Contributions and Thanks

The Team expresses its gratitude to:

- [TechLabsHamburg](https://github.com/TechLabsHamburg)
- [Carlchristian Eckert](https://github.com/slizzered)

Kudos to everyone, mentioned or unmentioned, who contributed further in any
way!

********************************************************************************
