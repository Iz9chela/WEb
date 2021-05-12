import Mustache from './mustache.js';

export default function processOpnFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
    const nopName = document.getElementById("fname").value.trim();
    const nopMail = document.getElementById("email").value.trim();
    const nopUrl = document.getElementById("url").value.trim();
    const nopOpn = document.getElementById("opinion").value.trim();
    const nopRadio = document.getElementById("male").value.trim();
    const nopOption = document.getElementById("Person").value.trim();
    const nopDatalist = document.getElementById("country-select").value.trim();
    const nopCheckbox = document.getElementById("willReturnElm").value.trim();

    //3. Verify the data
    if(nopName=="" || nopOpn=="" || nopMail=="" || nopRadio=="" || nopOption=="" || nopDatalist=="" || nopCheckbox==""){
        window.alert("Please, fill all fields!");
        return;
    }

    //3. Add the data to the array opinions and local storage
     const newOpinion =
            {
                name: nopName,
                email:nopMail,
                url:nopUrl,
                opinion: nopOpn,
                radio:nopRadio,
                option:nopOption,
                datalist:nopDatalist,
                checkbox:nopCheckbox,
                created: new Date()
            };

    console.log("New opinion:\n "+JSON.stringify(newOpinion));


    let opinions = [];

    if(localStorage.commentsStorage){
        opinions=JSON.parse(localStorage.commentsStorage);//peredau dannie
    }

    opinions.push(newOpinion);//peredau v newopinion
    localStorage.commentsStorage = JSON.stringify(opinions);//dannie json v string


    //5. Go to the opinions
    window.location.hash="#opinions";
    //stranica ne reboot

}
