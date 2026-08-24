import { TimelineEvent } from '../../types';

export const dummyTimelineEvents: TimelineEvent[] = [
  {
    "id": "tl-001",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-24T08:55:25.161Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 86,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_1.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_1.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-002",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-24T05:25:25.161Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 97,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_2.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_2.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-003",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-24T01:55:25.161Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 83,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_3.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_3.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-004",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-23T22:25:25.161Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 94,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_4.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_4.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-005",
    "title": "First Information Report #FIR-2026-1005",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-23T18:55:25.161Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 80,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_5.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_5.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-006",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-23T15:25:25.161Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 91,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_6.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_6.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-007",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-23T11:55:25.161Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 77,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_7.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_7.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-008",
    "title": "SWIFT Wire Flagged: $460,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-23T08:25:25.161Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 88,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_8.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_8.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-009",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-23T04:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 99,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_9.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_9.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-010",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-23T01:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 85,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_10.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_10.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-011",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-22T21:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 96,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_11.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_11.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-012",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-22T18:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 82,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_12.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_12.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-013",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-22T14:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 93,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_13.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_13.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-014",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-22T11:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 79,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_14.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_14.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-015",
    "title": "First Information Report #FIR-2026-1015",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-22T07:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 90,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_15.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_15.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-016",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-22T04:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 76,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_16.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_16.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-017",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-22T00:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 87,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_17.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_17.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-018",
    "title": "SWIFT Wire Flagged: $910,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-21T21:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 98,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_18.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_18.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-019",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-21T17:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 84,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_19.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_19.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-020",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-21T14:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 95,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_20.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_20.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-021",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-21T10:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 81,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_21.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_21.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-022",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-21T07:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 92,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_22.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_22.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-023",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-21T03:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 78,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_23.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_23.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-024",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-21T00:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 89,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_24.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_24.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-025",
    "title": "First Information Report #FIR-2026-1025",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-20T20:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 75,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_25.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_25.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-026",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-20T17:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 86,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_26.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_26.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-027",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-20T13:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 97,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_27.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_27.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-028",
    "title": "SWIFT Wire Flagged: $1,360,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-20T10:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 83,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_28.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_28.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-029",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-20T06:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 94,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_29.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_29.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-030",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-20T03:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 80,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_30.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_30.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-031",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-19T23:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 91,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_31.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_31.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-032",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-19T20:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 77,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_32.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_32.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-033",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-19T16:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 88,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_33.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_33.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-034",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-19T13:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 99,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_34.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_34.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-035",
    "title": "First Information Report #FIR-2026-1035",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-19T09:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 85,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_35.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_35.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-036",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-19T06:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 96,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_36.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_36.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-037",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-19T02:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 82,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_37.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_37.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-038",
    "title": "SWIFT Wire Flagged: $1,810,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-18T23:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 93,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_38.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_38.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-039",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-18T19:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 79,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_39.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_39.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-040",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-18T16:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 90,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_40.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_40.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-041",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-18T12:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 76,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_41.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_41.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-042",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-18T09:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 87,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_42.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_42.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-043",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-18T05:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 98,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_43.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_43.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-044",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-18T02:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 84,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_44.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_44.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-045",
    "title": "First Information Report #FIR-2026-1045",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-17T22:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 95,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_45.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_45.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-046",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-17T19:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 81,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_46.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_46.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-047",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-17T15:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 92,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_47.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_47.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-048",
    "title": "SWIFT Wire Flagged: $2,260,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-17T12:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 78,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_48.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_48.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-049",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-17T08:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 89,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_49.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_49.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-050",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-17T05:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 75,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_50.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_50.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-051",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-17T01:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 86,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_51.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_51.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-052",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-16T22:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 97,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_52.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_52.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-053",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-16T18:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 83,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_53.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_53.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-054",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-16T15:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 94,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_54.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_54.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-055",
    "title": "First Information Report #FIR-2026-1055",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-16T11:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 80,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_55.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_55.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-056",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-16T08:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 91,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_56.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_56.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-057",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-16T04:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 77,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_57.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_57.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-058",
    "title": "SWIFT Wire Flagged: $2,710,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-16T01:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 88,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_58.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_58.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-059",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-15T21:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 99,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_59.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_59.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-060",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-15T18:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 85,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_60.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_60.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-061",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-15T14:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 96,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_61.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_61.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-062",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-15T11:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 82,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_62.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_62.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-063",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-15T07:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 93,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_63.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_63.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-064",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-15T04:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 79,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_64.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_64.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-065",
    "title": "First Information Report #FIR-2026-1065",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-15T00:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 90,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_65.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_65.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-066",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-14T21:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 76,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_66.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_66.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-067",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-14T17:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 87,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_67.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_67.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-068",
    "title": "SWIFT Wire Flagged: $3,160,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-14T14:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 98,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_68.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_68.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-069",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-14T10:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 84,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_69.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_69.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-070",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-14T07:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 95,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_70.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_70.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-071",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-14T03:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 81,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_71.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_71.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-072",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-14T00:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 92,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_72.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_72.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-073",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-13T20:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 78,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_73.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_73.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-074",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-13T17:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 89,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_74.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_74.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-075",
    "title": "First Information Report #FIR-2026-1075",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-13T13:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 75,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_75.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_75.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-076",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-13T10:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 86,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_76.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_76.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-077",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-13T06:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 97,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_77.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_77.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-078",
    "title": "SWIFT Wire Flagged: $3,610,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-13T03:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 83,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_78.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_78.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-079",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-12T23:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 94,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_79.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_79.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-080",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-12T20:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 80,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_80.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_80.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-081",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-12T16:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 91,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_81.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_81.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-082",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-12T13:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 77,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_82.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_82.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-083",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-12T09:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 88,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_83.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_83.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-084",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-12T06:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 99,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_84.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_84.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-085",
    "title": "First Information Report #FIR-2026-1085",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-12T02:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 85,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_85.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_85.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-086",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-11T23:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 96,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_86.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_86.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-087",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-11T19:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 82,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_87.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_87.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-088",
    "title": "SWIFT Wire Flagged: $4,060,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-11T16:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 93,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_88.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_88.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-089",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-11T12:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 79,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_89.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_89.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-090",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-11T09:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 90,
    "severity": "HIGH",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_90.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_90.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-091",
    "title": "Intercepted Encrypted Call: Viktor Markov",
    "eventType": "Phone Calls",
    "timestamp": "2026-08-11T05:55:25.184Z",
    "criminalId": "crm-01",
    "criminalName": "Viktor Markov",
    "location": "HafenCity Customs Pier",
    "coordinates": [
      53.5413,
      9.9882
    ],
    "description": "Triangulated satellite encrypted conversation lasting 4m 12s via IMSI catcher near Hamburg. Audio signature matches suspect voice print.",
    "confidenceScore": 76,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_91.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_91.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-092",
    "title": "High-Value Cash Extraction: Piraeus",
    "eventType": "ATM Withdrawal",
    "timestamp": "2026-08-11T02:25:25.184Z",
    "criminalId": "crm-02",
    "criminalName": "Mateo Silva",
    "location": "Akti Miaouli Port Gate",
    "coordinates": [
      37.9402,
      23.6385
    ],
    "description": "Cloned bearer card utilized to withdraw maximum cash limit across 4 sequential terminals in under 10 minutes.",
    "confidenceScore": 87,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_92.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_92.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-093",
    "title": "Facial Recognition Match (98.4%): Helena Vance",
    "eventType": "CCTV Sighting",
    "timestamp": "2026-08-10T22:55:25.184Z",
    "criminalId": "crm-03",
    "criminalName": "Helena Vance",
    "location": "Riverside Warehouse B7",
    "coordinates": [
      13.7029,
      100.4998
    ],
    "description": "High-definition surveillance camera at Riverside Warehouse B7 registered verified biometric match with active Interpol warrant.",
    "confidenceScore": 98,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_93.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_93.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-094",
    "title": "Armored Convoy Sighted: Panama City",
    "eventType": "Vehicle Movement",
    "timestamp": "2026-08-10T19:25:25.184Z",
    "criminalId": "crm-04",
    "criminalName": "Chen Wei",
    "location": "Pacifico Freight Terminal",
    "coordinates": [
      8.95,
      -79.5997
    ],
    "description": "Automated license plate reader flagged convoy traveling at high speed without transponders.",
    "confidenceScore": 84,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_94.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_94.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-095",
    "title": "First Information Report #FIR-2026-1095",
    "eventType": "FIR Filed",
    "timestamp": "2026-08-10T15:55:25.184Z",
    "criminalId": "crm-05",
    "criminalName": "Raymond Leung",
    "location": "Club Obsidian Lounge",
    "coordinates": [
      38.7118,
      -9.1384
    ],
    "description": "Official legal complaint lodged by International Maritime Bureau detailing container seal tampering.",
    "confidenceScore": 95,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_95.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_95.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-096",
    "title": "Tactical Apprehension of Courier in Belgrade",
    "eventType": "Arrest",
    "timestamp": "2026-08-10T12:25:25.184Z",
    "criminalId": "crm-06",
    "criminalName": "Dimitri Costa",
    "location": "Corridor X Checkpoint",
    "coordinates": [
      44.8211,
      20.4431
    ],
    "description": "Special forces intercepted secondary courier carrying encrypted hardware tokens and forged diplomatic papers.",
    "confidenceScore": 81,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_96.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_96.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-097",
    "title": "Clandestine Conclave: Tariq Mansoor at Old Town Lipscani Safehouse",
    "eventType": "Meeting",
    "timestamp": "2026-08-10T08:55:25.184Z",
    "criminalId": "crm-07",
    "criminalName": "Tariq Mansoor",
    "location": "Old Town Lipscani Safehouse",
    "coordinates": [
      44.4323,
      26.1011
    ],
    "description": "Visual surveillance confirmed physical handover of aluminum briefcase between 3 high-value targets.",
    "confidenceScore": 92,
    "severity": "LOW",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_97.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_97.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-098",
    "title": "SWIFT Wire Flagged: $4,510,000 USD",
    "eventType": "Wire Transfer",
    "timestamp": "2026-08-10T05:25:25.184Z",
    "criminalId": "crm-08",
    "criminalName": "Goran Dragovic",
    "location": "Dubai Marina Slip 49",
    "coordinates": [
      25.0805,
      55.1403
    ],
    "description": "Correspondent banking node triggered AML rule #902 for layered offshore transaction without legitimate invoice.",
    "confidenceScore": 78,
    "severity": "MEDIUM",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_98.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_98.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-099",
    "title": "Covert Border Transit Recorded: Hong Kong",
    "eventType": "Border Crossing",
    "timestamp": "2026-08-10T01:55:25.184Z",
    "criminalId": "crm-09",
    "criminalName": "Astrid Lindqvist",
    "location": "Kowloon Cargo Dock 12",
    "coordinates": [
      22.3022,
      114.1685
    ],
    "description": "Thermal drone detected unauthorized crossing corridor through unmanned perimeter zone.",
    "confidenceScore": 89,
    "severity": "HIGH",
    "isVerified": false,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_99.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_99.jpg",
        "fileType": "image"
      }
    ]
  },
  {
    "id": "tl-100",
    "title": "Military Hardware Consignment Unloaded",
    "eventType": "Weapon Sighting",
    "timestamp": "2026-08-09T22:25:25.184Z",
    "criminalId": "crm-10",
    "criminalName": "Youssef Kabbaj",
    "location": "Port of Rotterdam Pier 42",
    "coordinates": [
      51.9244,
      4.4777
    ],
    "description": "Infrared imagery detected crates marked with defense contractor serials transferred to unmarked van.",
    "confidenceScore": 75,
    "severity": "CRITICAL",
    "isVerified": true,
    "evidenceFiles": [
      {
        "fileName": "intercept_log_100.pdf",
        "fileType": "pdf"
      },
      {
        "fileName": "cctv_frame_100.jpg",
        "fileType": "image"
      }
    ]
  }
];
