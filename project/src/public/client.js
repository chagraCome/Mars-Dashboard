let store = {
    user: { name: "Asma" },
    apod: "",
    curiosity: '',
    opportunity: '',
    spirit: '',
    perseverance:'',
    rovers: ["curiosity", "opportunity", "spirit","perseverance"],
  };
  
  // add our markup to the page
  const root = document.getElementById("root");
  
  const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
  };
  
  const render = async (root, state) => {
    let newDiv=document.createElement('div');
    root.innerHTML = App(state);
  };
  
  // create content
  const App = (state) => {
    let { rovers, apod } = state;
  
    return `
              <header>
              ${showNavBar()}
              </header>
            
              <main>
                  
                  <section id="Home" class="tabNav" style="display:block">
                  ${Greeting(store.user.name)}
                  <h3>Home</h3>
                  <p>Home is where the heart is..</p>
                </section>
                  ${showRover(store)}
              </main>
              <footer></footer>
          `;
  };

  // listening for load event because page should load before any JS is called
  window.addEventListener("load", () => {
    render(root, store);
    callRoverApis();
  });
  
  // ------------------------------------------------------  COMPONENTS
  function openPage(pageName,elmnt) {
    var tabNav = document.getElementsByClassName("tabNav");
    for (let i = 0; i < tabNav.length; i++) {
      tabNav[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = "#e4c8c8";
  }
  // Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
  const Greeting = (name) => {
    if (name) {
      return `
                  <h1>Welcome, ${name}!</h1>
              `;
    }
  
    return `
              <h1>Hello!</h1>
          `;
  };
  //nav
  const showMenu=()=>{
return store.rovers.map(rover =>
  `<button class="tablink" onclick="openPage('${rover}', this)">
  ${rover}</button>`
  /*`  <ul class="nav-menu">
<li><a href="#${rover}" class="nav-links">${rover}</a></li>
</ul>`*/
).join('');
  }
  const showNavBar=()=>{
    return  `<div class="nav-container">
      <nav class="navbar">
        <h1 id="navbar-logo"> Asma dashboards</h1>
        <div class="menu-toggle" id="mobile-menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <button class="tablink" onclick="openPage('Home', this)">
        Home</button>
    ${showMenu()}
      </nav>
    </div>`
    }
  // Example of a pure function that renders infomation requested from the backend
 const callRoverApis= ()=>{
  store.rovers.map(rover=> getImageOfTheDay(rover)) ;
  console.log(store.spirit)
 
 }
 const getRoverPhotos=(rover)=> {
 return rover.map(photo=> 
  `<img src=${photo.img_src} width="150" width="150"/>`)
 }
 const showRover= (store)=>{
   console.log("they have data",store.opportunity)
   if(store.spirit && store.opportunity && store.curiosity){
    return store.rovers.map(roverInf=>{
      let state= store[roverInf]
      console.log("state is",state);
      let name=state[0].rover.name;
      let landing_date=state[0].rover.landing_date;
      let launch_date=state[0].rover.launch_date;
      let status=state[0].rover.status;
      let max_date=state[0].rover.max_date;
    return (
      `<section id=${roverInf} class="tabNav" style="display:none">
      <ul class="information-container">
      <li>Rover name: ${name }</li>
      <li>Launched from Earth on: ${launch_date}</li>
      <li>Landed on Mars on: ${landing_date}</li>
      <li>Mission status: ${status}</li>
      <li>Photos taken on:</li>
      ${getRoverPhotos(state)}
  </ul>
  </section>
      `)}).join('');
   }
   else{
     return `<p> please refresh page</p>`
   }
 
 }
 
  const showImagesOfRoverrs= (apod)=>{
    const rolist=store.rovers;
   const showri=rolist.map(x=>{
      return ImageOfTheDay(apod,x)
    })
    console.log(showri)

  }
  const ImageOfTheDay = (apod,Rname) => {
   if (!apod ) {
      getImageOfTheDay(store,Rname);
     // console.log(getImageOfTheDay(store));
    }
  try{
    const rover=apod.image.latest_photos[0].rover;
    console.log("selected rover name is",rover.name)
    if (rover) {
      return (
              `<section id=${Rname}>
              <ul class="information-container">
              <li>Rover name: ${rover.name }</li>
              <li>Launched from Earth on: ${rover.launch_date}</li>
              <li>Landed on Mars on: ${rover.landing_date}</li>
              <li>Mission status: ${rover.status}</li>
              <li>Photos taken on: ${rover.max_date}</li>
          </ul>
          </section>
              `)
    }
  }
  catch(err) {console.log("there is error with",Rname, err)}
  }
 
  // ------------------------------------------------------  API CALLS
  //-------------------------------------------------custom function

  //-------------------------------------------------
  // Example API call
  const getImageOfTheDay = (rovername) => { 
    fetch(`http://localhost:3000/${rovername}`)
      .then((res) => res.json())
      .then((response) => {
        const newState=response.image.latest_photos;
        store[rovername]= newState;
    console.log("selected called api",rovername,response)
         updateStore(store, newState)
  });
  console.log(store)
  };
  