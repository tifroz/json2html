var fs, j2h;

j2h = require("../lib/json2html");

fs = require("fs");

fs.writeFileSync("./test.html", j2h.render({
  "Account": {
    "balance": 0
  },
  "Cities": [
    {
      "city": "san francisco",
      "state": "ca",
      "country": "us",
      "permit": ""
    }
  ],
  "GPS": {
    "coordinates": {
      "latitude": 37.758,
      "longitude": -122.39880000000001
    },
    "timestamp": "2012-03-15T01:41:44.644Z",
    "state": "online"
  },
  "Login": {
    "email": "blah@blha.blah",
    "firstName": "blahah",
    "hash": "POKT+0hJxoMLP8SgMkM5BtJVhzaUaySpOUiOG91KnSs=",
    "lastName": "blah",
    "verified": true
  },
  "Profile": {
    "apiVersion": "2.4.0",
    "disabled": true,
    "excluded": false,
    "uuid": "000"
  },
  "Schedule": {
    "Shifts": [
      {
        "start": "Sun 04:00 PM",
        "end": "Mon 03:00 AM",
        "bountyStart": "Sun 05:00 PM",
        "bountyEnd": "Sun 09:00 PM",
        "bountyOnly": false,
        "enabled": true
      }, {
        "start": "Mon 04:00 PM",
        "end": "Tue 03:00 AM",
        "bountyStart": "Mon 05:00 PM",
        "bountyEnd": "Mon 09:00 PM",
        "bountyOnly": false,
        "enabled": true
      }, {
        "start": "Tue 04:00 PM",
        "end": "Wed 03:00 AM",
        "bountyStart": "Tue 05:00 PM",
        "bountyEnd": "Tue 09:00 PM",
        "bountyOnly": false,
        "enabled": true
      }, {
        "start": "Wed 04:00 PM",
        "end": "Thu 03:00 AM",
        "bountyStart": "Wed 05:00 PM",
        "bountyEnd": "Wed 09:00 PM",
        "bountyOnly": false,
        "enabled": true
      }, {
        "start": "Thu 04:00 PM",
        "end": "Fri 03:00 AM",
        "bountyStart": "Thu 05:00 PM",
        "bountyEnd": "Thu 09:00 PM",
        "bountyOnly": false,
        "enabled": true
      }, {
        "start": "Fri 04:00 PM",
        "end": "Sat 03:00 AM",
        "bountyStart": "Fri 05:00 PM",
        "bountyEnd": "Fri 09:00 PM",
        "bountyOnly": false,
        "enabled": true
      }, {
        "start": "Sat 04:00 PM",
        "end": "Sun 03:00 AM",
        "bountyStart": "Sat 05:00 PM",
        "bountyEnd": "Sat 09:00 PM",
        "bountyOnly": false,
        "enabled": true
      }
    ],
    "restUntil": 0,
    "gpsEnabled": false
  },
  "State": {
    "Fares": {
      "canceled": 0
    }
  },
  "States": {
    "Fares": {
      "canceled": 0,
      "complete": 0
    }
  },
  "Stats": {
    "Fares": {
      "abandoned": 50,
      "accepted": 258,
      "canceled": 53,
      "complete": 148,
      "lastOffered": "2012-03-14T01:04:57.646Z",
      "offered": 401
    },
    "Ratings": {
      "bad": 0,
      "ok": 0,
      "great": 0
    },
    "abandoned": 1,
    "rank": 5
  },
  "Territory": {
    "Viewport": {
      "sw": {
        "latitude": 37.70339999999999,
        "longitude": -122.527
      },
      "ne": {
        "latitude": 37.812,
        "longitude": -122.3482
      },
      "center": {
        "latitude": 37.75769999999999,
        "longitude": -122.4376
      }
    },
    "Blocks": [
      {
        "sw": {
          "latitude": 37.70339999999999,
          "longitude": -122.527
        },
        "ne": {
          "latitude": 37.72511999999999,
          "longitude": -122.49124
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.70339999999999,
          "longitude": -122.49124
        },
        "ne": {
          "latitude": 37.72511999999999,
          "longitude": -122.45548000000001
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.70339999999999,
          "longitude": -122.45548000000001
        },
        "ne": {
          "latitude": 37.72511999999999,
          "longitude": -122.41972
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.70339999999999,
          "longitude": -122.41972
        },
        "ne": {
          "latitude": 37.72511999999999,
          "longitude": -122.38396
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.70339999999999,
          "longitude": -122.38396
        },
        "ne": {
          "latitude": 37.72511999999999,
          "longitude": -122.3482
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.72511999999999,
          "longitude": -122.527
        },
        "ne": {
          "latitude": 37.74683999999999,
          "longitude": -122.49124
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.72511999999999,
          "longitude": -122.49124
        },
        "ne": {
          "latitude": 37.74683999999999,
          "longitude": -122.45548000000001
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.72511999999999,
          "longitude": -122.45548000000001
        },
        "ne": {
          "latitude": 37.74683999999999,
          "longitude": -122.41972
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.72511999999999,
          "longitude": -122.41972
        },
        "ne": {
          "latitude": 37.74683999999999,
          "longitude": -122.38396
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.72511999999999,
          "longitude": -122.38396
        },
        "ne": {
          "latitude": 37.74683999999999,
          "longitude": -122.3482
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.74683999999999,
          "longitude": -122.527
        },
        "ne": {
          "latitude": 37.768559999999994,
          "longitude": -122.49124
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.74683999999999,
          "longitude": -122.49124
        },
        "ne": {
          "latitude": 37.768559999999994,
          "longitude": -122.45548000000001
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.74683999999999,
          "longitude": -122.45548000000001
        },
        "ne": {
          "latitude": 37.768559999999994,
          "longitude": -122.41972
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.74683999999999,
          "longitude": -122.41972
        },
        "ne": {
          "latitude": 37.768559999999994,
          "longitude": -122.38396
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.74683999999999,
          "longitude": -122.38396
        },
        "ne": {
          "latitude": 37.768559999999994,
          "longitude": -122.3482
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.768559999999994,
          "longitude": -122.527
        },
        "ne": {
          "latitude": 37.790279999999996,
          "longitude": -122.49124
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.768559999999994,
          "longitude": -122.49124
        },
        "ne": {
          "latitude": 37.790279999999996,
          "longitude": -122.45548000000001
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.768559999999994,
          "longitude": -122.45548000000001
        },
        "ne": {
          "latitude": 37.790279999999996,
          "longitude": -122.41972
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.768559999999994,
          "longitude": -122.41972
        },
        "ne": {
          "latitude": 37.790279999999996,
          "longitude": -122.38396
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.768559999999994,
          "longitude": -122.38396
        },
        "ne": {
          "latitude": 37.790279999999996,
          "longitude": -122.3482
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.790279999999996,
          "longitude": -122.527
        },
        "ne": {
          "latitude": 37.812,
          "longitude": -122.49124
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.790279999999996,
          "longitude": -122.49124
        },
        "ne": {
          "latitude": 37.812,
          "longitude": -122.45548000000001
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.790279999999996,
          "longitude": -122.45548000000001
        },
        "ne": {
          "latitude": 37.812,
          "longitude": -122.41972
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.790279999999996,
          "longitude": -122.41972
        },
        "ne": {
          "latitude": 37.812,
          "longitude": -122.38396
        },
        "subscribe": "all"
      }, {
        "sw": {
          "latitude": 37.790279999999996,
          "longitude": -122.38396
        },
        "ne": {
          "latitude": 37.812,
          "longitude": -122.3482
        },
        "subscribe": "all"
      }
    ],
    "rows": 5,
    "cols": 5
  },
  "Vehicle": {
    "carnumber": "1239",
    "Colorscheme": {
      "country": "us",
      "state": "ca",
      "city": "san francisco",
      "name": "Bay cab",
      "id": "bay_cab_san_francisco_ca_us",
      "gmtOffset": -420
    },
    "Features": {
      "nonsmoking": {
        "label": "Non Smoking",
        "value": false
      },
      "ramp": {
        "label": "Ramp Accessible",
        "value": true
      },
      "creditcard": {
        "label": "Credit Card",
        "value": false
      }
    }
  },
  "_id": "40a1d247077ba235445e3",
  "created": "2011-09-29T21:46:38.533Z",
  "id": "40a1d247077ba235445e3",
  "pubId": "585551928e9d91965caa",
  "fares": "<a href=\"/reporting/allFaresViewer?pubId=585551928e9d91965caa&limit=20\">View Recent Fares</a>"
}));
