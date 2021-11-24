let store = {
    user: { name: "Asma" },
    apod: "",
    rovers: ["Curiosity", "Opportunity", "Spirit","Perseverance"],
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
              <header></header>
              <main>
                  ${Greeting(store.user.name)}
                  <div class="tab">
                  ${showMenu(store.rovers)}
                  </div>
  
                  <div id="Curiosity" class="tabcontent">    
                  <h3>London</h3>
                  <p>London is the capital city of England.</p>
                  </div>
  
                  <div id="Opportunity" class="tabcontent">
                  <h3>Paris</h3>
                  <p>Paris is the capital of France.</p> 
                  </div>          
  
                  <div id="Spirit" class="tabcontent">
                  <h3>Tokyo</h3>
                  <p>Tokyo is the capital of Japan.</p>
                  </div>
  
  
  
                  <section>
                      
                      ${ImageOfTheDay(apod)}
                  </section>
              </main>
              <footer></footer>
          `;
  };
  function openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
  // Get the element with id="defaultOpen" and click on it
  //document.getElementById("defaultOpen").addEventListener('click');
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
  //show menu
  const showMenu=(rovers)=>{
      return rovers.map(rover=>
       `<button class="tablinks" onclick="openCity(event, ${rover})" >${rover}</button>`
      )
  }
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
  const ImageOfTheDay = (apod) => {
    if (!apod ) {
      getImageOfTheDay(store,"opportunity");
     // console.log(getImageOfTheDay(store));
    }
  
    const arr=apod.image.latest_photos;
    console.log(arr)
    if (arr) {
      return arr.map((element)=>
              `<ul class="information-container">
              <li>Rover namerrr: ${element.rover.name }</li>
              <li>Launched from Earth on: ${element.rover.launch_date}</li>
              <li>Landed on Mars on: ${element.rover.landing_date}</li>
              <li>Mission status: ${element.rover.status}</li>
              <li>Photos taken on: ${element.rover.max_date}</li>
          </ul>
              `);
    } 
  }
  
  // ------------------------------------------------------  API CALLS
  
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
  