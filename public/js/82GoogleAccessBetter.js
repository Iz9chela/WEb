let auth2 = {};

function renderUserInfo(googleUser, htmlElmId) {
    const profile = googleUser.getBasicProfile();

    const htmlStringEn=
        `
            <p>User logged in.</p>
            <ul>
                <li> ID: ${profile.getId()}
                <li>  Full name: ${profile.getName()}
                <li>  Image URL: ${profile.getImageUrl()}
                <li>  Email: ${profile.getEmail()}
            </ul>
        `;
    //Id z profile.getId() sa nema pouzivat na komunikaciu s vlastnym serverom (you should not use the id from profile.getId() for communication with your server)
    document.getElementById(htmlElmId).innerHTML=htmlStringEn;
}

function renderLogOutInfo(htmlElmId) {
    const htmlString=
        `
                <p>User not signed in</p>
                `;
    document.getElementById(htmlElmId).innerHTML=htmlString;
}

function signOut() {
    if(auth2.signOut){
        auth2.signOut();
        if (window.location.hash.split('/')[0] === '#article') {
            document.getElementById('comment_author').value = '';
        }
    }
    if(auth2.disconnect){
        auth2.disconnect();
    }
}

function userChanged(user){
    document.getElementById("userName").innerHTML=user.getBasicProfile().getName();


    const userInfoElm = document.getElementById("userStatus");
    const userNameInputElm = document.getElementById("fname");
if (userNameInputElm){// pre 82GoogleAccessBetterAddArt.html
            userNameInputElm.value=user.getBasicProfile().getName();
    }
    else if(userInfoElm ){// pre/for 82GoogleAccessBetter.html
        renderUserInfo(user,"userStatus");
    }

}


function updateSignIn() {
    const sgnd = auth2.isSignedIn.get();
    if (sgnd) {
        document.getElementById("SignInButton").classList.add("hiddenElm");
        document.getElementById("SignedIn").classList.remove("hiddenElm");
        document.getElementById("userName").innerHTML=auth2.currentUser.get().getBasicProfile().getName();
        if (window.location.hash.split('/')[0] === '#article') {
            document.getElementById('comment_author').value
                = auth2.currentUser.get().getBasicProfile().getName();
        }
    }else{
        document.getElementById("SignInButton").classList.remove("hiddenElm");
        document.getElementById("SignedIn").classList.add("hiddenElm");
    }

    const userInfoElm = document.getElementById("userStatus");
    const userNameInputElm = document.getElementById("fname");
if (userNameInputElm){// pre/for 82GoogleAccessBetterAddArt.html
        if (sgnd) {
            userNameInputElm.value=auth2.currentUser.get().getBasicProfile().getName();
        }else{
            userNameInputElm.value="";
        }
    }
    else if(userInfoElm){// pre/for 82GoogleAccessBetter.html
        if (sgnd) {
            renderUserInfo(auth2.currentUser.get(),"userStatus");
        }else{
            renderLogOutInfo("userStatus");
        }
    }
}

function startGSingIn() {
    gapi.load('auth2', function() {
        gapi.signin2.render('SignInButton', {
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
        gapi.auth2.init().then( //zavolat po inicializácii OAuth 2.0  (called after OAuth 2.0 initialisation)
            function (){
                console.log('init');
                auth2 = gapi.auth2.getAuthInstance();
                auth2.currentUser.listen(userChanged);
                auth2.isSignedIn.listen(updateSignIn);
                auth2.then(updateSignIn); //tiez po inicializacii (later after initialisation)
                
            });
    });

}

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
    console.log(error);
}
