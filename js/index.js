var firebaseConfig = {
    apiKey: "AIzaSyBC3Dt3vRaQ_OHNSrv4AUlsswqzhX0II4U",
    authDomain: "q-training-blog-app.firebaseapp.com",
    projectId: "q-training-blog-app",
    storageBucket: "q-training-blog-app.appspot.com",
    messagingSenderId: "68558050159",
    appId: "1:68558050159:web:ea7a567d673e3900ab0e9a",
    measurementId: "G-4WL07G96X6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Authentication State Persistance (Read docs)
  firebase.auth.Auth.Persistence.LOCAL; 
  // with this the session will not expire when the tab/window closes. Only manual log out can end session

  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if(email != "" & password != "")
      {
          var result = firebase.auth().signInWithEmailAndPassword(email, password)

          result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode)
            console.log(errorMessage)
            
            
            window.alert("Message:"+ errorMessage )
          });
      }

      else
      {
          window.alert("Please fill out all fields")
      }

  });



  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmpassword").val();

      if(email != "" && password != "" && cPassword != "")
      {
         if(password==cPassword)
         {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password)

            result.catch(function(error){
              var errorCode = error.code;
              var errorMessage = error.message;
              
              console.log(errorCode)
              console.log(errorMessage)
              
              window.alert("Message:"+ errorMessage )
            });
         }

         else{
            window.alert("Passwords don't match")
         }
      }

      else
      {
          window.alert("Please fill out all fields")
      }

  });


  $("#btn-resetPassword").click(function()
  {
      var auth = firebase.auth();
      var email = $("#email").val();

      if(email != "")
      {
        auth.sendPasswordResetEmail(email).then(function()
        {
            window.alert("Email has been sent.")

        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode)
            console.log(errorMessage)
            
            window.alert("Message:"+ errorMessage )
        });
      }

      else
      {
        window.alert("Please fill out all fields")
      }
  });

  $("#btn-logout").click(function()
  {
      firebase.auth().signOut();
  });


  $("#btn-update").click(function()
  {
      var fName = $("#firstName").val();
      var sName = $("#secondName").val();

      var rootRef = firebase.database().ref().child("Users");
      var userID = firebase.auth().currentUser.uid;
      var usersRef = rootRef.child(userID);
      console.log(fName,sName)
      if(fName != null && sName != null)
      {
          
        var userData =
        {
            "firstName" : fName,
            "secondName" : sName
        };
        usersRef.set(userData, function(error){
            if(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
                
                console.log(errorCode);
                console.log(errorMessage);
                
                window.alert("Message:"+ errorMessage );
            }

            else
            {
                window.location.href = "index.html";
            }
        });
      }
      else
      {
        window.alert("Please fill out all fields")
      }
  });
