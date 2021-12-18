let store = {
    user: Immutable.Map({ name: "Astronaut" }),
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
    root.innerHTML = App(state);

  };
  
  // create content
  const App = (state) => {
    let { rovers, apod } = state;
  
    return `
              <header>
              ${showNavBar(showMenu)}
              </header>
            
              <main>
                  <section id="Home" class="tabNav " style="display:block">
                  ${Greeting()}
                  <h3>Welcome</h3>
                  <p>here is all informations you need for your next journey to Mars</p>
                  we have 4 famous rovers
                </section>
                  ${showRover(store)}
              </main>
              <footer></footer>
          `;
  };

  // listening for load event because page should load before any JS is called
  window.addEventListener("load", () => {
    render(root, store);
    callRoverApis(getImageOfTheDay);
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
  const Greeting = () => {
  
    return `
              <h1>Hello!  ${store.user.get('name')}</h1>
          `;
  };
  //nav
  const showMenu=()=>{
  return store.rovers.map(rover =>
    `<button class="tablink" onclick="openPage('${rover}', this)">
    ${rover}</button>`).join('');
  }
  // High Order function that render the navigation bar
  const showNavBar=(fn)=>{
    return  `<div class="nav-container">
      <nav class="navbar">
        <h1 id="navbar-logo"> Mars Rovers dashboards</h1>
        <button class="tablink" onclick="openPage('Home', this)" id="defaultOpen">
        Home</button>
    ${fn()}
      </nav>
    </div>`
    }
  // High Order function that renders infomation requested from the backend
 const callRoverApis= (callApiFn)=>{
  store.rovers.map(rover=> callApiFn(rover)) ;
  //console.log(store.spirit)
 
 }
 const getRoverPhotos=(rover)=> {
 return rover.map(photo=> 
  `<img src=${photo.img_src} width="150" hieght="150" class="roverimg"/>`).join('');
 }
 // hight ordred function
 const showRover= (store)=>{
   //console.log("they have data",store.opportunity)
   if(store.spirit && store.opportunity && store.curiosity){
    return store.rovers.map(roverInf=>{
      const stateMain= store[roverInf];
      const state=stateMain[0];
      //console.log("state is",state);
     return RenderRovorInfo(stateMain,state,roverInf);
    }).join('');
   }
   else{
     return RoverInfoWait()
   }
 
 }
 const RoverInfoWait=()=>{
  return `<p> it is coming</p>`
 }
const RenderRovorInfo=(stateMain,state,roverInf)=>{
  const name=state.rover.name;
  const landing_date=state.rover.landing_date;
  const launch_date=state.rover.launch_date;
  const status=state.rover.status;
  const max_date=state.earth_date;
return (
  `<section id=${roverInf} class="tabNav" style="display:none">
  <h2>${name }</h2>
  <ul class="information-container">
  <li>Rover name: ${name }</li>
  <li>Launched from Earth on: ${launch_date}</li>
  <li>Landed on Mars on: ${landing_date}</li>
  <li>Mission status: ${status}</li>
  <li> Date the most recent photos were taken: ${max_date}</li>
</ul>
<h3> last photos taken in</h3>
${getRoverPhotos(stateMain)}
</section>
  `)
}
  // ------------------------------------------------------  API CALLS
  //-------------------------------------------------custom function

  //-------------------------------------------------
  // Example API call
  const getImageOfTheDay = (rovername) => { 
    try{
    fetch(`http://localhost:3000/${rovername}`)
      .then((res) => res.json())
      .then((response) => {
        const newState=response.image.latest_photos;
        store[rovername]= newState;
    //console.log("selected called api",rovername,response)
         updateStore(store, newState)
  });
}
catch(error){
  console.log("error calling Api with rover name,",rovername,error)
}
  };
  