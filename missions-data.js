// Mission text and choice outcomes from EPICS_Engineering_Game_Questions.pdf.
const EPICS_MISSIONS = [
  {
    "id": "civil",
    "field": "Civil Engineering",
    "title": "River Town Rescue",
    "icon": "🌉",
    "summary": "Build a crossing neighbors can use after heavy rain.",
    "need": "After heavy rain, neighbors need a bridge and path that people can use with bikes, strollers, and wheelchairs.",
    "fieldNote": "We added ___ because the rain test showed ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "What should we ask the neighbors before building?",
        "choices": [
          {
            "label": "A",
            "text": "“How high did the water get, and who uses this path?”",
            "outcome": "We learn where to build and how wide the crossing must be."
          },
          {
            "label": "B",
            "text": "“Should the bridge be blue or red?”",
            "outcome": "We can choose colors later; we still need flood and access clues."
          },
          {
            "label": "C",
            "text": "“Can everyone use a short staircase?”",
            "outcome": "Some neighbors need a smooth path for wheels."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Look",
        "question": "The bank is muddy near the water but firm farther back. Branches rush through the middle during floods. Where should the bridge stand?",
        "choices": [
          {
            "label": "A",
            "text": "Put supports in soft mud near the water",
            "outcome": "The supports sink during the virtual flood test."
          },
          {
            "label": "B",
            "text": "Put one support where branches rush through",
            "outcome": "Branches pile against it."
          },
          {
            "label": "C",
            "text": "Put supports on the firm banks and the deck above the flood mark",
            "outcome": "The supports stay steady and water can pass below."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Build",
        "question": "A cart of supplies must cross in rain. Which bridge frame and deck should we try?",
        "choices": [
          {
            "label": "A",
            "text": "Flat boards without supports",
            "outcome": "The middle bends under the cart."
          },
          {
            "label": "B",
            "text": "Triangle supports and a grippy, rain-resistant deck",
            "outcome": "The frame stays steady and wheels can roll across."
          },
          {
            "label": "C",
            "text": "An unbraced rectangle with untreated boards",
            "outcome": "The frame wobbles and the boards get wet."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Predict",
        "question": "Which path is most likely to work for bikes, strollers, and wheelchairs?",
        "choices": [
          {
            "label": "A",
            "text": "A wide path with gentle ramps, a grippy surface, and edge rails",
            "outcome": "The rolling models can enter and cross."
          },
          {
            "label": "B",
            "text": "A short, steep ramp with a slippery surface",
            "outcome": "Wheels struggle on the slope."
          },
          {
            "label": "C",
            "text": "Steps leading to a narrow path",
            "outcome": "Some neighbors cannot enter at all."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Test",
        "question": "What should we check before opening the crossing?",
        "choices": [
          {
            "label": "A",
            "text": "Paint it and look at it from the riverbank",
            "outcome": "A good appearance cannot tell us how it performs."
          },
          {
            "label": "B",
            "text": "Splash water only on the middle boards",
            "outcome": "We miss the cart weight and both ramps."
          },
          {
            "label": "C",
            "text": "Add cart weights, raise the virtual river, and roll different users across",
            "outcome": "The bridge holds, but water pools at one ramp."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Notice",
        "question": "The bridge stays strong, yet a puddle blocks the town-side ramp. What does the clue tell us?",
        "choices": [
          {
            "label": "A",
            "text": "The cart is too heavy",
            "outcome": "The puddle appears even when the cart is gone."
          },
          {
            "label": "B",
            "text": "Rainwater has no clear path away from that approach",
            "outcome": "We find the cause of the puddle."
          },
          {
            "label": "C",
            "text": "The stroller wheels are too large",
            "outcome": "The puddle blocks other users too."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Improve",
        "question": "How can we clear the puddle while keeping the ramp gentle?",
        "choices": [
          {
            "label": "A",
            "text": "Add a shallow side channel to a planted rain garden",
            "outcome": "The next rain test leaves the ramp clear."
          },
          {
            "label": "B",
            "text": "Make the whole ramp much steeper",
            "outcome": "Water leaves, but the ramp becomes hard to use."
          },
          {
            "label": "C",
            "text": "Cover the puddle with cardboard",
            "outcome": "The cardboard gets soggy and the puddle returns."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Check back",
        "question": "A wheelchair user and a family with a stroller try the virtual crossing. What should we do?",
        "choices": [
          {
            "label": "A",
            "text": "Tell them the bridge must work because it looks strong",
            "outcome": "We miss how it feels to use."
          },
          {
            "label": "B",
            "text": "Ask about their trip and share the weight, rain, and rolling tests",
            "outcome": "They cross comfortably and give us one more suggestion to record."
          },
          {
            "label": "C",
            "text": "Ask only whether they like the paint",
            "outcome": "Color cannot confirm that the route works."
          }
        ],
        "continueWith": "B"
      }
    ]
  },
  {
    "id": "mechanical",
    "field": "Mechanical Engineering",
    "title": "Clockwork Carnival",
    "icon": "🎡",
    "summary": "Repair a carousel, curtain, and prize wheel.",
    "need": "The carnival keeper needs a slow clockwise carousel, a curtain that rises when a helper pulls down, and a prize wheel that stops with a gentle push on its brake lever.",
    "fieldNote": "We moved the brake pivot because ___; then the keeper could ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "What should we do before repairing the attractions?",
        "choices": [
          {
            "label": "A",
            "text": "Start every ride for visitors",
            "outcome": "The controls have not been checked."
          },
          {
            "label": "B",
            "text": "Repeat the three needed motions to the keeper",
            "outcome": "The keeper confirms exactly what each repair must do."
          },
          {
            "label": "C",
            "text": "Pick the brightest machine parts",
            "outcome": "Their colors do not tell us how they should move."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Look",
        "question": "You turn the carousel’s hand wheel, but the carousel axle stays still. What should we inspect?",
        "choices": [
          {
            "label": "A",
            "text": "Whether gears connect the hand wheel to the axle",
            "outcome": "We find a gap in the gear path."
          },
          {
            "label": "B",
            "text": "Whether the painted horses match",
            "outcome": "Paint does not carry the motion."
          },
          {
            "label": "C",
            "text": "Whether the curtain rope is long enough",
            "outcome": "That belongs to another attraction."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Build",
        "question": "The hand wheel turns quickly clockwise. The carousel should turn slowly clockwise. Which gear path should we build?",
        "choices": [
          {
            "label": "A",
            "text": "Large hand-wheel gear",
            "outcome": "small axle gear → The carousel turns faster and in the opposite direction."
          },
          {
            "label": "B",
            "text": "Small hand-wheel gear",
            "outcome": "large axle gear → It slows down but turns in the opposite direction."
          },
          {
            "label": "C",
            "text": "Small hand-wheel gear",
            "outcome": "middle gear → large axle gear → It turns slower and in the same direction."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Predict",
        "question": "When we turn the hand wheel clockwise, what should the carousel do?",
        "choices": [
          {
            "label": "A",
            "text": "Turn quickly clockwise",
            "outcome": "The large axle gear should slow it down."
          },
          {
            "label": "B",
            "text": "Turn slowly clockwise",
            "outcome": "The gear sizes slow it, and the middle gear changes direction again."
          },
          {
            "label": "C",
            "text": "Turn slowly counterclockwise",
            "outcome": "That would happen with only two connected gears."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Test the curtain",
        "question": "The helper wants to pull down and make the stage curtain rise. Which setup should we try?",
        "choices": [
          {
            "label": "A",
            "text": "Run the rope over a pulley above the curtain",
            "outcome": "The virtual pull brings the curtain up."
          },
          {
            "label": "B",
            "text": "Put the pulley on the floor",
            "outcome": "Pulling down leaves the curtain down."
          },
          {
            "label": "C",
            "text": "Remove the rope and push the curtain from below",
            "outcome": "It does not give the helper the requested control."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Diagnose",
        "question": "The brake lever’s pivot is very close to the hand grip. Why is it hard to press?",
        "choices": [
          {
            "label": "A",
            "text": "The prize wheel is painted red",
            "outcome": "Paint does not explain the force needed."
          },
          {
            "label": "B",
            "text": "The stage pulley is too high",
            "outcome": "That pulley does not control the brake."
          },
          {
            "label": "C",
            "text": "The hand side of the lever is too short",
            "outcome": "We find why a push gives little help at the brake pad."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Improve",
        "question": "How can we make the brake easier to press while keeping its pad in place?",
        "choices": [
          {
            "label": "A",
            "text": "Move the pivot closer to the hand grip",
            "outcome": "The hand side stays short, so pushing is still hard."
          },
          {
            "label": "B",
            "text": "Move the pivot closer to the brake pad",
            "outcome": "A longer hand side makes a gentle push work in the empty-wheel retest."
          },
          {
            "label": "C",
            "text": "Shorten the handle",
            "outcome": "The keeper gets even less pushing help."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Check back",
        "question": "The keeper tries all three repaired attractions. What should we show and ask them to check?",
        "choices": [
          {
            "label": "A",
            "text": "Show the slow carousel, rising curtain, and easy brake; explain the gears, pulley, and lever",
            "outcome": "The keeper confirms each motion works as requested."
          },
          {
            "label": "B",
            "text": "Show only the new colors",
            "outcome": "The important motions remain unchecked."
          },
          {
            "label": "C",
            "text": "Spin the carousel as fast as possible",
            "outcome": "That misses the keeper’s slow-ride goal."
          }
        ],
        "continueWith": "A"
      }
    ]
  },
  {
    "id": "electrical",
    "field": "Electrical Engineering",
    "title": "Firefly Festival",
    "icon": "💡",
    "summary": "Light a festival while saving battery power.",
    "need": "Festival visitors need light at the gate and garden path all evening. The story corner needs light only while someone is reading. The child snaps together sealed, safe virtual battery, wire, switch, and light tiles. A light needs a complete path back to the battery.",
    "fieldNote": "We moved the story lamp because ___, and we saved power by ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "What does the festival need?",
        "choices": [
          {
            "label": "A",
            "text": "Light only at the gate",
            "outcome": "The path and story corner would be hard to see."
          },
          {
            "label": "B",
            "text": "Light in each area when people use it",
            "outcome": "Visitors can see where they need to go without wasting power in empty areas."
          },
          {
            "label": "C",
            "text": "Every light on all evening",
            "outcome": "The story light uses battery power during breaks."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Look",
        "question": "The story corner is empty between readings, but people keep using the gate and path. Which light could be off during those breaks?",
        "choices": [
          {
            "label": "A",
            "text": "The gate light",
            "outcome": "People still need to find the entrance."
          },
          {
            "label": "B",
            "text": "The path light",
            "outcome": "People still need to see the route."
          },
          {
            "label": "C",
            "text": "The story corner light",
            "outcome": "It can wait until the next reading."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Build",
        "question": "Which circuit plan lets the three areas work separately?",
        "choices": [
          {
            "label": "A",
            "text": "Give each light a complete path to the battery and its own switch",
            "outcome": "Each area can light up when needed."
          },
          {
            "label": "B",
            "text": "Connect each light to a wire that stops before the battery",
            "outcome": "The paths are incomplete, so those lights stay dark."
          },
          {
            "label": "C",
            "text": "Put every light on one switch that stays on all evening",
            "outcome": "The story corner uses power when it is empty."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Predict",
        "question": "A reading ends, but visitors are still at the gate and on the path. What happens if we open only the story corner switch?",
        "choices": [
          {
            "label": "A",
            "text": "Every light goes out",
            "outcome": "The other areas have their own complete paths and switches."
          },
          {
            "label": "B",
            "text": "The story light goes out; gate and path stay lit",
            "outcome": "The empty corner stops using power."
          },
          {
            "label": "C",
            "text": "The story light gets brighter",
            "outcome": "Opening its switch turns that light off."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Test",
        "question": "What should we do before visitors arrive?",
        "choices": [
          {
            "label": "A",
            "text": "Look only at the tile colors",
            "outcome": "Colors cannot show whether the lights work."
          },
          {
            "label": "B",
            "text": "Try only the gate light",
            "outcome": "The other two areas remain untested."
          },
          {
            "label": "C",
            "text": "Try each switch alone, then turn on all three together",
            "outcome": "We can check every light and switch."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Diagnose",
        "question": "The path tiles show one gap. The other two lights work. What is wrong?",
        "choices": [
          {
            "label": "A",
            "text": "The path’s loop is broken at the gap",
            "outcome": "That light needs a complete path back to the battery."
          },
          {
            "label": "B",
            "text": "The whole battery is empty",
            "outcome": "The gate and story lights show it still has power."
          },
          {
            "label": "C",
            "text": "The gate switch is too large",
            "outcome": "The clue is in the path connection."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Improve",
        "question": "Which change lights the path and helps the battery last?",
        "choices": [
          {
            "label": "A",
            "text": "Close the path gap and leave the story light on all evening",
            "outcome": "The path works, but the empty story corner still uses power."
          },
          {
            "label": "B",
            "text": "Close the path gap and use the story switch only during readings",
            "outcome": "The path works, and the story corner lights up when needed."
          },
          {
            "label": "C",
            "text": "Remove the path light and make the story light brighter",
            "outcome": "People still cannot see the path."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Check back",
        "question": "A visitor says the story corner is hard to see during a reading, although the battery lasts. What should we do?",
        "choices": [
          {
            "label": "A",
            "text": "Leave it because the battery lasts",
            "outcome": "The visitor still needs enough light to see."
          },
          {
            "label": "B",
            "text": "Turn off the path light",
            "outcome": "That makes another area hard to use."
          },
          {
            "label": "C",
            "text": "Ask where light is needed, move the story lamp, and test again",
            "outcome": "The visitor can see the reading while the path stays lit."
          }
        ],
        "continueWith": "C"
      }
    ]
  },
  {
    "id": "software",
    "field": "Computer & Software Engineering",
    "title": "Robot Mail Maze",
    "icon": "🤖",
    "summary": "Program a robot to deliver the right packages.",
    "need": "The robot starts at the Post Office facing north. One sidewalk block north is Pine Corner. Blue House is one block west of Pine Corner; Red House is one block east. Turn left, Turn right, and Turn around change the robot’s direction without moving it. Move takes it one block forward. Deliver leaves the current package at the current house. Deliver the blue package first, then the red one.",
    "fieldNote": "The wrong command was ___; after we changed it, the robot ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "What do the neighbors need from the robot?",
        "choices": [
          {
            "label": "A",
            "text": "Both packages at whichever house is closest",
            "outcome": "One neighbor misses a package."
          },
          {
            "label": "B",
            "text": "The packages delivered to any two houses",
            "outcome": "The addresses still matter."
          },
          {
            "label": "C",
            "text": "The blue package at Blue House, then the red package at Red House, using sidewalks",
            "outcome": "Both neighbors receive the right delivery."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Look",
        "question": "The robot is at the Post Office facing north. Which command takes it to Pine Corner?",
        "choices": [
          {
            "label": "A",
            "text": "Move",
            "outcome": "One step north reaches the corner."
          },
          {
            "label": "B",
            "text": "Turn right",
            "outcome": "The robot changes direction but stays at the Post Office."
          },
          {
            "label": "C",
            "text": "Deliver",
            "outcome": "There is no house at the Post Office."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Program",
        "question": "Which set of commands delivers the first package to Blue House?",
        "choices": [
          {
            "label": "A",
            "text": "Move",
            "outcome": "Turn right → Move → Deliver → That route reaches Red House."
          },
          {
            "label": "B",
            "text": "Move",
            "outcome": "Turn left → Move → Deliver → The robot reaches Blue House before delivering."
          },
          {
            "label": "C",
            "text": "Move",
            "outcome": "Move → Deliver → The robot skips the turn toward Blue House."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Predict",
        "question": "At Pine Corner the robot faces north. A typed copy accidentally says Turn right → Move. Where will it go?",
        "choices": [
          {
            "label": "A",
            "text": "Blue House",
            "outcome": "Blue House is west, to the left of the robot."
          },
          {
            "label": "B",
            "text": "Post Office",
            "outcome": "That is south of the corner."
          },
          {
            "label": "C",
            "text": "Red House",
            "outcome": "Right from north points east, toward Red House."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Test",
        "question": "The typed program is Move → Turn right → Move → Deliver. It drops the blue package at Red House. Which note describes the result?",
        "choices": [
          {
            "label": "A",
            "text": "“The robot reached Red House instead of Blue House.”",
            "outcome": "That matches the test."
          },
          {
            "label": "B",
            "text": "“Blue House disappeared.”",
            "outcome": "The map still shows Blue House."
          },
          {
            "label": "C",
            "text": "“The robot never moved.”",
            "outcome": "It moved to the wrong house."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Find the bug",
        "question": "Which instruction in the typed copy caused the wrong turn?",
        "choices": [
          {
            "label": "A",
            "text": "The first Move",
            "outcome": "That correctly reaches Pine Corner."
          },
          {
            "label": "B",
            "text": "Turn right",
            "outcome": "The route to Blue House needs a left turn at the corner."
          },
          {
            "label": "C",
            "text": "Deliver",
            "outcome": "The robot was already at the wrong house before delivery."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Improve",
        "question": "After fixing the turn, the robot delivers at Blue House and faces west. Which commands take it to Red House for the second delivery?",
        "choices": [
          {
            "label": "A",
            "text": "Move",
            "outcome": "Move → Deliver → That keeps it moving west, away from Red House."
          },
          {
            "label": "B",
            "text": "Turn around",
            "outcome": "Move → Turn left → Move → Deliver → The extra turn sends it south toward the Post Office."
          },
          {
            "label": "C",
            "text": "Turn around",
            "outcome": "Move → Move → Deliver → It faces east, returns to Pine Corner, and reaches Red House."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Check back",
        "question": "The next test delivers both packages correctly. What should we ask the neighbors?",
        "choices": [
          {
            "label": "A",
            "text": "“Did each package reach the right home, and did the robot stay on the sidewalk?”",
            "outcome": "Their answers check whether the route works for them."
          },
          {
            "label": "B",
            "text": "“Was this the fastest robot ever?”",
            "outcome": "Speed alone does not check the deliveries."
          },
          {
            "label": "C",
            "text": "“Which house has the nicest color?”",
            "outcome": "That does not test the mail route."
          }
        ],
        "continueWith": "A"
      }
    ]
  },
  {
    "id": "environmental",
    "field": "Environmental Engineering",
    "title": "Creek Cleanup Crew",
    "icon": "🌿",
    "summary": "Help a creek, a flooded path, and its neighbors.",
    "need": "After rain, a neighborhood path floods, soil washes into the creek, and wrappers float past the footbridge. The crew has six build tokens: three for a first design and three for an improvement. They also watch whether fish can still pass freely. A lower muddy-water score means the water looks clearer; that score does not measure whether creek water is safe to drink.",
    "fieldNote": "The first storm test improved ___ but left ___; we added ___ and saw ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "Neighbors say the walking path floods and wrappers wash into the creek. Which two goals should we record?",
        "choices": [
          {
            "label": "A",
            "text": "Paint the bridge and add a sign",
            "outcome": "The path still floods and wrappers still enter the water."
          },
          {
            "label": "B",
            "text": "Keep the path usable and reduce creek litter",
            "outcome": "The plan includes both concerns the neighbors raised."
          },
          {
            "label": "C",
            "text": "Make the creek look blue",
            "outcome": "A different color does not solve flooding or litter."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Look",
        "question": "Rain rushes off a parking lot into the creek. The bank beside it has bare soil. Which clues explain the fast runoff and mud?",
        "choices": [
          {
            "label": "A",
            "text": "Hard pavement and bare soil",
            "outcome": "Water runs quickly off the lot and carries loose soil."
          },
          {
            "label": "B",
            "text": "Fish and tree shade",
            "outcome": "Those do not show where stormwater rushes."
          },
          {
            "label": "C",
            "text": "Bridge paint and flowers",
            "outcome": "Those do not explain the water flow."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Build",
        "question": "You have three tokens now. A rain garden costs two; native plants cost one. Which first build targets the flooded path and bare bank?",
        "choices": [
          {
            "label": "A",
            "text": "A runoff filter at the drain and a recycling station by the bridge",
            "outcome": "They may help mud and wrappers, but the fast runoff still floods the path."
          },
          {
            "label": "B",
            "text": "A rain garden and plants in a dry playground",
            "outcome": "The stormwater misses the new garden."
          },
          {
            "label": "C",
            "text": "A rain garden at the parking drain and native plants on the bare bank",
            "outcome": "The garden slows water and the roots help hold soil."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Predict",
        "question": "What should we expect from that first build?",
        "choices": [
          {
            "label": "A",
            "text": "No rainwater will ever reach the creek",
            "outcome": "Rain still moves through the area."
          },
          {
            "label": "B",
            "text": "Less fast runoff and less mud, but we must test",
            "outcome": "That prediction can be checked after a storm."
          },
          {
            "label": "C",
            "text": "Every wrapper will disappear",
            "outcome": "Wrappers need their own plan."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Test",
        "question": "After a virtual storm, flooded path tiles fall from 4 to 2, muddy-water score falls from 8 to 5, and wrappers fall from 10 to 9. Fish can still swim past the planted bank. What happened?",
        "choices": [
          {
            "label": "A",
            "text": "Flooding and mud improved, fish can pass, but litter barely changed",
            "outcome": "The test shows progress and one problem left."
          },
          {
            "label": "B",
            "text": "Every problem is solved",
            "outcome": "Nine wrappers remain."
          },
          {
            "label": "C",
            "text": "Nothing improved",
            "outcome": "Two measures changed for the better."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Diagnose",
        "question": "A camera shows wrappers blowing from the picnic area. The wrapper count rises just after the footbridge. Where is most new litter entering?",
        "choices": [
          {
            "label": "A",
            "text": "At the rain garden",
            "outcome": "The count rises farther downstream."
          },
          {
            "label": "B",
            "text": "At the planted bank",
            "outcome": "The camera points to the picnic area."
          },
          {
            "label": "C",
            "text": "Near the footbridge",
            "outcome": "That matches both the camera and the counts."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Improve",
        "question": "Three tokens remain. A recycling station costs one; a gravel-and-sand runoff filter costs two. Which plan addresses litter and muddy runoff?",
        "choices": [
          {
            "label": "A",
            "text": "Add only more plants at the parking lot",
            "outcome": "The bank improves, but wrappers still blow from picnics."
          },
          {
            "label": "B",
            "text": "Put a recycling station by the picnic bridge and a runoff filter at the parking drain",
            "outcome": "People have a place for waste, and some muddy runoff is filtered before reaching the creek."
          },
          {
            "label": "C",
            "text": "Put the station far from picnics and the filter after the creek",
            "outcome": "Both tools miss most of the problem."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Check back",
        "question": "A second storm test shows 2 flooded tiles, muddy-water score 4, and 3 wrappers. A neighbor asks whether the creek water is safe to drink. What should we say?",
        "choices": [
          {
            "label": "A",
            "text": "“The path and creek improved. Does the path work for you? We have not tested this water for drinking, and we will keep checking after rain.”",
            "outcome": "We share the evidence and listen to the neighbor."
          },
          {
            "label": "B",
            "text": "“The water looks clearer, so it is safe to drink.”",
            "outcome": "Clearer-looking water does not prove drinking safety."
          },
          {
            "label": "C",
            "text": "“Everything is fixed forever.”",
            "outcome": "Another storm may change the results."
          }
        ],
        "continueWith": "A"
      }
    ]
  },
  {
    "id": "biomedical",
    "field": "Biomedical Engineering",
    "title": "Creative Grip Studio",
    "icon": "🖌️",
    "summary": "Design a comfortable paintbrush with an artist.",
    "need": "A young artist wants a paintbrush that is more comfortable to hold. The artist helps choose, test, and revise the design.",
    "fieldNote": "The artist said ___, so we changed ___; the next test showed ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "What should we do first?",
        "choices": [
          {
            "label": "A",
            "text": "Copy an adult’s favorite brush",
            "outcome": "That brush may not fit this artist."
          },
          {
            "label": "B",
            "text": "Pick the brightest color",
            "outcome": "Color does not tell us how the handle feels."
          },
          {
            "label": "C",
            "text": "Ask the artist what feels difficult and what grips they like",
            "outcome": "The artist says the thin handle slips while painting."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Look",
        "question": "The current brush makes clear lines, but its thin handle slips twice and gets a comfort score of 2 out of 5. Which part should change first?",
        "choices": [
          {
            "label": "A",
            "text": "Brush tip",
            "outcome": "The tip already makes the lines the artist wants."
          },
          {
            "label": "B",
            "text": "Handle",
            "outcome": "The handle matches the trouble we observed."
          },
          {
            "label": "C",
            "text": "Paint color",
            "outcome": "The handle would still slip."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Build",
        "question": "The artist likes a thick, soft marker and wants to paint for ten minutes. Which prototype should we try?",
        "choices": [
          {
            "label": "A",
            "text": "A light, wider, rounded handle with a soft textured sleeve",
            "outcome": "It uses the artist’s grip preference and stays light."
          },
          {
            "label": "B",
            "text": "A heavy, rough metal handle",
            "outcome": "It may tire the artist’s hand."
          },
          {
            "label": "C",
            "text": "A thin, smooth plastic handle",
            "outcome": "It repeats the slippery shape."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Predict",
        "question": "What should we expect before testing the new grip?",
        "choices": [
          {
            "label": "A",
            "text": "It will work perfectly for every artist",
            "outcome": "People may prefer different grips."
          },
          {
            "label": "B",
            "text": "More weight will always make better lines",
            "outcome": "Weight alone does not prove control."
          },
          {
            "label": "C",
            "text": "It may feel steadier; we should test both comfort and line control",
            "outcome": "The two results will show what improved."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Test",
        "question": "After five minutes, the artist rates comfort 4 out of 5 instead of 2, but gives tiny-dot painting 2 out of 5. What do the results say?",
        "choices": [
          {
            "label": "A",
            "text": "Holding improved; small details still need work",
            "outcome": "The two results point to the next change."
          },
          {
            "label": "B",
            "text": "The brush failed at everything",
            "outcome": "Comfort did improve."
          },
          {
            "label": "C",
            "text": "The design is finished",
            "outcome": "The artist still finds tiny dots hard."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Diagnose",
        "question": "The artist says, “I can’t see the tip when I make dots.” The sleeve reaches close to the bristles. What likely caused the detail problem?",
        "choices": [
          {
            "label": "A",
            "text": "The sleeve color",
            "outcome": "A new color would not uncover the tip."
          },
          {
            "label": "B",
            "text": "The sleeve is too close to the tip",
            "outcome": "Moving it back could clear the artist’s view."
          },
          {
            "label": "C",
            "text": "The paint is too bright",
            "outcome": "The artist’s clue points to the sleeve."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Improve",
        "question": "Which change keeps the comfortable hold and helps the artist see the tip?",
        "choices": [
          {
            "label": "A",
            "text": "Remove the whole grip",
            "outcome": "The old slippery handle returns."
          },
          {
            "label": "B",
            "text": "Add weight near the tip",
            "outcome": "The brush may become harder to control."
          },
          {
            "label": "C",
            "text": "Shorten the sleeve and slide it back, then retest",
            "outcome": "The soft grip stays and the tip becomes easier to see."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Check back",
        "question": "On retest, comfort and tiny-dot scores are both 4 out of 5. The artist says it feels better and asks for a blue sleeve. What should we do?",
        "choices": [
          {
            "label": "A",
            "text": "Let the artist choose the color, confirm the grip still feels good, and explain the changes",
            "outcome": "The artist helps finish a design that works for them."
          },
          {
            "label": "B",
            "text": "Make every artist use the same brush",
            "outcome": "Others may need different grips."
          },
          {
            "label": "C",
            "text": "Say the brush fixes every hand problem",
            "outcome": "The test only shows how this brush worked for this artist."
          }
        ],
        "continueWith": "A"
      }
    ]
  },
  {
    "id": "materials",
    "field": "Chemical & Materials Engineering",
    "title": "Storm Suit Lab",
    "icon": "🧥",
    "summary": "Help a reporter stay dry and move freely.",
    "need": "“I report outside in cool rain,” says Maya. “I need to stay dry, lift my camera, and see where I’m walking.” The child designs a jacket in a virtual lab.",
    "fieldNote": "The first jacket passed ___ but failed ___; we changed ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "What should we ask Maya before making the jacket?",
        "choices": [
          {
            "label": "A",
            "text": "“What color is your camera?”",
            "outcome": "Color can wait; we still need to learn how the jacket must work."
          },
          {
            "label": "B",
            "text": "“What do you need to do while wearing it?”",
            "outcome": "Maya shows us how she lifts her camera and walks between reports."
          },
          {
            "label": "C",
            "text": "“Can you skip the rainy report?”",
            "outcome": "Maya still needs a jacket for the job."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Look",
        "question": "Rain soaks cotton, beads up on coated cloth, and slides off stiff plastic. Which outer layer should we try?",
        "choices": [
          {
            "label": "A",
            "text": "Soft cotton",
            "outcome": "The first rain test leaves dark, wet patches."
          },
          {
            "label": "B",
            "text": "Flexible coated cloth",
            "outcome": "Drops roll away while the cloth still bends."
          },
          {
            "label": "C",
            "text": "Stiff plastic sheet",
            "outcome": "It sheds rain, but Maya struggles to bend her elbows."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Build the inside",
        "question": "The wind feels cold. What should go under the outer layer?",
        "choices": [
          {
            "label": "A",
            "text": "A light, soft fleece lining",
            "outcome": "Maya feels warmer and can still move."
          },
          {
            "label": "B",
            "text": "A second stiff plastic sheet",
            "outcome": "It blocks wind, but the jacket is hard to bend."
          },
          {
            "label": "C",
            "text": "A thick, heavy towel",
            "outcome": "It feels bulky when Maya lifts her camera."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Close the gaps",
        "question": "Rain can enter around openings and seams. Which detail should we add?",
        "choices": [
          {
            "label": "A",
            "text": "Leave large gaps at the cuffs",
            "outcome": "Water runs down Maya’s sleeves."
          },
          {
            "label": "B",
            "text": "Overlap and seal the seams, with adjustable cuffs",
            "outcome": "The test shows less water entering while Maya can still use her hands."
          },
          {
            "label": "C",
            "text": "Tape the sleeves shut",
            "outcome": "Rain stays out, but Maya cannot use her camera."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Predict",
        "question": "What do we expect from the first jacket?",
        "choices": [
          {
            "label": "A",
            "text": "“It may keep Maya dry and resist a small snag; we still need to check how well she can move.”",
            "outcome": "That gives us three things to test."
          },
          {
            "label": "B",
            "text": "“It will be perfect in every kind of weather.”",
            "outcome": "A first design still needs a test."
          },
          {
            "label": "C",
            "text": "“Only the color matters.”",
            "outcome": "The rain and movement requirements are missing."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Test",
        "question": "Virtual rain stays outside and the cloth survives a small snag, but Maya cannot lift her camera comfortably. What did the test reveal?",
        "choices": [
          {
            "label": "A",
            "text": "The jacket needs another stiff outer layer",
            "outcome": "That could make movement harder."
          },
          {
            "label": "B",
            "text": "The rain test should be ignored",
            "outcome": "The rain result is useful; the reach test found a different problem."
          },
          {
            "label": "C",
            "text": "The sleeves need more room to bend",
            "outcome": "The camera movement shows exactly where to improve the fit."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Improve",
        "question": "How can we help Maya lift the camera while keeping the rain out?",
        "choices": [
          {
            "label": "A",
            "text": "Add a flexible elbow shape under the same rain-shedding outer cloth",
            "outcome": "Maya reaches up, and the retest still keeps her dry."
          },
          {
            "label": "B",
            "text": "Remove both sleeves",
            "outcome": "Her arms move, but they get wet."
          },
          {
            "label": "C",
            "text": "Add a heavy sheet over each elbow",
            "outcome": "The sleeves become even harder to bend."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Check back",
        "question": "The jacket passes the rain and reach tests. What should happen before we call it finished?",
        "choices": [
          {
            "label": "A",
            "text": "Put it on a display stand without asking Maya",
            "outcome": "We still do not know how it feels during her work."
          },
          {
            "label": "B",
            "text": "Ask Maya to walk, lift her camera, check how warm she feels, and tell us what she notices",
            "outcome": "She confirms it keeps her dry, warm, and able to move; her feedback guides any last change."
          },
          {
            "label": "C",
            "text": "Say, “Our test says it is perfect.”",
            "outcome": "A person using the jacket may notice something the machine missed."
          }
        ],
        "continueWith": "B"
      }
    ]
  },
  {
    "id": "aerospace",
    "field": "Aerospace Engineering",
    "title": "Sky Garden Delivery",
    "icon": "🪂",
    "summary": "Deliver seeds across a creek in the wind.",
    "need": "A community gardener needs seeds delivered across a creek to a soft mulch landing circle. The launch spot is south of the garden. A steady wind pushes flying objects to the right, toward a pond. The capsule and its flight are virtual; the practice route stays clear of people and animals.",
    "fieldNote": "The wind pushed the capsule ___, so we ___; the gardener checked ___.",
    "steps": [
      {
        "title": "Listen",
        "question": "What should we ask the gardener first?",
        "choices": [
          {
            "label": "A",
            "text": "“Where can the capsule land, and how must the seeds arrive?”",
            "outcome": "The gardener points out the mulch circle and asks for seeds that stay inside."
          },
          {
            "label": "B",
            "text": "“What is your favorite aircraft color?”",
            "outcome": "Color can come later; the landing need is still unclear."
          },
          {
            "label": "C",
            "text": "“Can we scatter seeds anywhere?”",
            "outcome": "The gardener needs them in the prepared planting area."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Look",
        "question": "The pond is right of the landing circle. Which practice route should we choose?",
        "choices": [
          {
            "label": "A",
            "text": "Over the crowded path",
            "outcome": "People would be underneath the test route."
          },
          {
            "label": "B",
            "text": "Straight toward the pond",
            "outcome": "The wind could push the capsule farther that way."
          },
          {
            "label": "C",
            "text": "Across the empty grass toward the garden",
            "outcome": "The route gives us room to test and watch for wind drift."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Build wings",
        "question": "Which body and wings should we test for a steady glide?",
        "choices": [
          {
            "label": "A",
            "text": "A smooth body with two matching wings",
            "outcome": "The capsule glides more evenly in the first test."
          },
          {
            "label": "B",
            "text": "A lopsided body with one long wing and one short wing",
            "outcome": "It tilts and turns away from the landing circle."
          },
          {
            "label": "C",
            "text": "A block-shaped body with no wings",
            "outcome": "It drops before reaching the creek."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Pack the seeds",
        "question": "Where should the seed packet sit?",
        "choices": [
          {
            "label": "A",
            "text": "Loose on the left wing",
            "outcome": "The capsule tips left and the packet may fall out."
          },
          {
            "label": "B",
            "text": "Secured near the middle of the body",
            "outcome": "The capsule stays balanced and the seeds remain inside."
          },
          {
            "label": "C",
            "text": "Hanging from the tail",
            "outcome": "The tail dips and the capsule wobbles."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Soften the landing",
        "question": "Which parachute should open near the landing circle in the first test?",
        "choices": [
          {
            "label": "A",
            "text": "No parachute",
            "outcome": "The capsule hits the ground too hard."
          },
          {
            "label": "B",
            "text": "A very large chute",
            "outcome": "It floats gently, but the wind carries it past the circle."
          },
          {
            "label": "C",
            "text": "A medium, light chute",
            "outcome": "It slows the landing without drifting as far as the large one."
          }
        ],
        "continueWith": "C"
      },
      {
        "title": "Test",
        "question": "How should we check the first design?",
        "choices": [
          {
            "label": "A",
            "text": "Run a virtual flight with a practice packet that weighs the same as the seeds, the same wind, and the mulch target",
            "outcome": "The test shows the route and landing under realistic conditions."
          },
          {
            "label": "B",
            "text": "Skip the test because the capsule looks balanced",
            "outcome": "Appearance cannot show where wind will carry it."
          },
          {
            "label": "C",
            "text": "Test above a crowd",
            "outcome": "We have a clear practice route available instead."
          }
        ],
        "continueWith": "A"
      },
      {
        "title": "Improve",
        "question": "The practice capsule lands to the right of the mulch circle. What should we change for the next virtual test?",
        "choices": [
          {
            "label": "A",
            "text": "Add a heavy rock to the nose",
            "outcome": "The capsule dives sooner and lands short."
          },
          {
            "label": "B",
            "text": "Aim a little left of the circle, into the wind, while keeping the same capsule",
            "outcome": "The wind carries it back toward the target on the retest."
          },
          {
            "label": "C",
            "text": "Pretend the pond is the target",
            "outcome": "That does not meet the gardener’s need."
          }
        ],
        "continueWith": "B"
      },
      {
        "title": "Check back",
        "question": "The capsule lands softly in the mulch circle with the seeds inside. What should we do now?",
        "choices": [
          {
            "label": "A",
            "text": "Call it finished without opening the capsule",
            "outcome": "We have not checked whether the seeds stayed in good condition."
          },
          {
            "label": "B",
            "text": "Count only how far it flew",
            "outcome": "Distance alone does not tell us whether the delivery worked."
          },
          {
            "label": "C",
            "text": "Ask the gardener to inspect the seeds and landing spot, then record what changed",
            "outcome": "The gardener confirms the delivery meets the garden’s need."
          }
        ],
        "continueWith": "C"
      }
    ]
  }
];
