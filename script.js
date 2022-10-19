async function getCovidapi() {
    const jsondata = await fetch("https://api.covid19api.com/summary");
    const jsdata = await jsondata.json();
    console.log(jsdata);
    // console.log(jsdata.Countries[76].Country);
    TotalConfirmed_global = jsdata.Global.TotalConfirmed;
    TotalRecovered_global = jsdata.Global.TotalRecovered;
    TotalDeaths_global = jsdata.Global.TotalDeaths;
    NewConfirmed_global = jsdata.Global.NewConfirmed;
  
    document.getElementById("worldwide-confirmed").innerHTML =
      TotalConfirmed_global.toLocaleString("hi");
    document.getElementById("worldwide-new_confirmed").innerHTML =
      NewConfirmed_global.toLocaleString("hi");
    document.getElementById("worldwide-recovered").innerHTML =
      TotalRecovered_global.toLocaleString("hi");
    document.getElementById("worldwide-death").innerHTML =
      TotalDeaths_global.toLocaleString("hi");
  
    TotalConfirmed_india = jsdata.Countries[76].TotalConfirmed;
    NewConfirmed_india = jsdata.Countries[76].NewConfirmed;
    Recovered_india = jsdata.Countries[76].TotalRecovered;
    TotalDeaths_india = jsdata.Countries[76].TotalDeaths;
  
    document.getElementById("india-confirmed").innerHTML =
      TotalConfirmed_india.toLocaleString("hi");
    document.getElementById("india-new_confirmed").innerHTML = 
      NewConfirmed_india.toLocaleString("hi");
    document.getElementById("india-recovered").innerHTML =
      Recovered_india.toLocaleString("hi");
    document.getElementById("india-death").innerHTML =
      TotalDeaths_india.toLocaleString("hi");
  }
  getCovidapi();
  
  
  var url = "https://api.rootnet.in/covid19-in/stats/history";
  
  // var data = ''
  
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      var length = data.data.length;
      var index = length - 1;
      var value = data.data[index];
  
      console.log(status);
  
      table = document.getElementById("table");
      for (var i = 0; i < value.regional.length; i++) {
        //console.log(value.regional[i].loc)
        for (var j = 0; j < table.rows[i].cells.length; j++) {
          //console.log(j)
          var states = table.rows[i].cells[1];
          var confirmed = table.rows[i].cells[2];
          var recovered = table.rows[i].cells[3];
          var deaths = table.rows[i].cells[4];
          states.innerHTML = value.regional[i].loc;
          confirmed.innerHTML =
            value.regional[i].totalConfirmed.toLocaleString("hi");
          recovered.innerHTML = value.regional[i].discharged.toLocaleString("hi");
          deaths.innerHTML = value.regional[i].deaths.toLocaleString("hi");
        }
      }
    });
  
  
  //Dark Mode
  const options = {
    bottom: "64px", // default: '32px'
    right: "32px", // default: '32px'
    left: "unset", // default: 'unset'
    time: "0.5s", // default: '0.3s'
    mixColor: "#fff", // default: '#fff'
    backgroundColor: "#e9e9e3", // default: '#fff'
    buttonColorDark: "#100f2c", // default: '#100f2c'
    buttonColorLight: "#fff", // default: '#fff'
    saveInCookies: true, // default: true,
    label: "🌓", // default: ''
    autoMatchOsTheme: true, // default: true
  };
  
  const darkmode = new Darkmode(options);
  darkmode.showWidget();
  
  
  // terminal effect on the hero text 
  var typed = new Typed("#typed", {
    strings: [
      "#Stay Home...",
      "#Stay Alert...",
      "#Save Lives...",
      "#Wash Your Hands...",
      "#Wear Mask...",
      "#Keep Social Distance...",
    ],
    smartBackspace: true, // Default value
    typeSpeed: 50, 
    backSpeed: 55, 
    loop: true,
    loopCount: Infinity,
    startDelay: 0,
    showCursor: false,
  });