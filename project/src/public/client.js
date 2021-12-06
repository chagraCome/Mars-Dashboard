let store = {
    user: { name: "Asma" },
    apod: "",
    rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit","Perseverance"]),
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
                  <section id="oppertunity">
                  ${ImageOfTheDay(apod,'Opportunity')}
                  </section>
                  <section id="spirit">
                 ${ImageOfTheDay(apod,'spirit')}
              </section>
              <section id="curiosity">
                 ${ImageOfTheDay(apod,'curiosity')}
              </section>
              </main>
              <footer></footer>
          `;
  };

  // listening for load event because page should load before any JS is called
  window.addEventListener("load", () => {
    render(root, store);
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
    console.log("asma arr is",rover.name)
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
  const getImageOfTheDay = (state,rovername) => {
    let { apod } = state;
  
    fetch(`http://localhost:3000/${rovername}`)
      .then((res) => res.json())
      .then((apod) => updateStore(store, { apod } )
      //.then(data) => roverList = data.Dinos.map()
      );
  console.log(apod)
    //return data;
  };
  