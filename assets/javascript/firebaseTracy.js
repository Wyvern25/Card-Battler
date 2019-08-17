
$(function (){


//==================SIGN UP=====================//
  $("#signUp").on("click", function(){
    var emailUser = $("#email").val();
    var email = emailUser + "@gmail.com";
    var password = $("#password").val();
    
    if (email.length < 4) {
      alert('Please enter a username.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    //Create new user in firebase
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]

    });
  });
  
//===============Toggle LogIn/LogOut button==========================//
  $("#logIn").on("click", function(){
    if (firebase.auth().currentUser) { //currentUser: current authentication state of the web is signed in
      firebase.auth().signOut(); //then click the button will sign the user out
    } else {
      var emailUser = $("#email").val();
      var email = emailUser + "@gmail.com";
      var password = $("#password").val();
      if (email.length < 4) {
        alert('Please enter a valid username.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      //Firebase function to authenticate user's email and password
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        $(this).prop("disabled", false);
        
        // [END_EXCLUDE]
      });
    $(this).prop("disabled", true) //disable logIn function after firebase approves user authentication
    }
  })

  $(".createAccount").on("click",function() {
    $(".card-title").text("Create An Account");
    $("#logIn").hide();
    $("#signUp").show();
    $(".logInPage").show();
    $(".signUpPage").hide();
    
  })

  $(".logInLink").on("click",function(){
    $(".card-title").text("Create An Account");
    $("#logIn").show();
    $("#signUp").hide();
    $(".logInPage").hide();
  })

//Function to listen for authentication changes, aka signed in or signed out
  function authStateMonitor() {
    // Firebase triggers listener when the user signs in or out
    firebase.auth().onAuthStateChanged(function(user) {
      // [START_EXCLUDE silent]
        //At reload, when there is not any user in Firebase yet
      $("#verifyEmail").prop("disabled", true);
      $("#logIn").prop("disabled", false);
      // [END_EXCLUDE]

      if (user) { //When user is signed in.
        $(".welcomeBack").show();
        $(".signUpPage").hide();
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        

        //====ADD TO DATABASE
        var userRef = firebase.database().ref("userInfo");
        userRef.set({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        emailVerified: user.emailVerified,
      })

          //Display for monitoring purpose
        $("#sign-in-status").text("Signed In");
        var currentUserInfo = JSON.stringify(user, null, '  ');//when sending data to server, data has to be a string
        $("#account-details").text(currentUserInfo);
        
          //Change login button to logout
        $("#logIn").text("Logout"); 
        
        if (!emailVerified) { //If user is signed in but has not been verified thru email
          $("#verifyEmail").prop("disabled", false);
        }
        
      }else{ //When user is signed out.
        // [START_EXCLUDE]
        $(".welcomeBack").hide();
        $("#sign-in-status").text("Signed out")
        $("#account-details").text("null");
        $("#signIn").text("Login") //change back to login
        // [END_EXCLUDE]
      }
    });
  }

  window.onload = function() {
    authStateMonitor();
    $(".logInPage").hide();
    $("#signUp").hide();
    $("#resetPassword").hide();
  };

//=========N/A for this game but dont delete========//
  //==============EMAIL VERIFICATION =====================//
  $("#verifyEmail").on("click", function () {
    //Firebase function to send email verification to user
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
  });

  $("#resetPassword").on("click", function() {
    var email = $("#email").val();
    // firebase function to send password reset email to user
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  });
});