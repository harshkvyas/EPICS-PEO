// The visible labels describe engineering types; the official directory supplies
// the underlying degree and concentration names.
const purdueMissionMajors = {
  bridge: ['Civil Engineering','Compare load paths, support, span, foundations, and resource use.'],
  rover: ['Computer Engineering','Program a route, inspect an execution trace, and respond to obstacles.']
};
if(typeof engineeringLabs!=='undefined')engineeringLabs.forEach(game=>{purdueMissionMajors[game.id]=[game.type,game.concept];});
function missionMajorBadge(id){const type=purdueMissionMajors[id];return type?'<span class="mission-major"><small>Engineering types implemented</small>'+type[0]+'</span>':'';}
function missionMajorPanel(id){const type=purdueMissionMajors[id];return type?'<aside class="purdue-connection"><div><span class="connection-label">Engineering types implemented</span><strong>'+type[0]+'</strong><p>'+type[1]+'</p></div><a href="https://engineering.purdue.edu/Engr/Academics/Undergraduate/majors" target="_blank" rel="noopener">Explore engineering types<span class="sr-only"> (opens in a new tab)</span></a></aside>':'';}
