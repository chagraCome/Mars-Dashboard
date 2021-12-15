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
              <header></header>
              <main>
                  ${Greeting(store.user.name)}
                  ${showRover(store)}
                  <section id="oppertunity">
                  {ImageOfTheDay(apod,'Opportunity')}
                  </section>
                  <section id="spirit">
                 {ImageOfTheDay(apod,'spirit')}
              </section>
              <section id="curiosity">
                 {ImageOfTheDay(apod,'curiosity')}
              </section>
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
  /* const showRoverInfo=(roverList)=>{
      return roverList.map(element => {
          `
              <ul class="information-container">
              <li>Rover name: ${element.name }</li>
              <li>Launched from Earth on: ${element.launch_date}</li>
              <li>Landed on Mars on: ${element.landing_date}</li>
              <li>Mission status: ${element.status}</li>
              <li>Photos taken on: ${element.max_date}</li>
          </ul>
              `
      });
  } */
  // Example of a pure function that renders infomation requested from the backend
 const callRoverApis= ()=>{
  store.rovers.map(rover=> getImageOfTheDay(rover)) ;
  console.log(store.spirit)
 
 }
 const getRoverPhotos=(rover)=> {
 return rover.map(photo=> 
  `<img src=${photo.img_src} width="50" width="50"/>`)
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
      `<section id=${roverInf}>
      <ul class="information-container">
      <li>Rover name: ${name }</li>
      <li>Launched from Earth on: ${launch_date}</li>
      <li>Landed on Mars on: ${landing_date}</li>
      <li>Mission status: ${status}</li>
      <li>Photos taken on: ${getRoverPhotos(state)}</li>
  </ul>
  </section>
      `)});
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
    //let { apod } = state;
  
    fetch(`http://localhost:3000/${rovername}`)
      .then((res) => res.json())
      .then((response) => {
        const newState=response.image.latest_photos;
        store[rovername]= newState;
console.log("selected called api",rovername,response)
         updateStore(store, newState)
      //.then(data) => roverList = data.Dinos.map()
  });
  console.log(store)
    //return data;
  };
  