var nAlopra = false;
function signUpAuth(){
	let userName = document.getElementById('signUserNameInput');
	let email = document.getElementById('signEmailInput');
	let pass = document.getElementById('signPswInput');
  	let repPass = document.getElementById('signRepeatPswInput');
  	if(pass.value===repPass.value&&pass.value.length>=6){
		firebase.auth().createUserWithEmailAndPassword(email.value,pass.value).then(
			(user)=>{
			// here you can use either the returned user object or     firebase.auth().currentUser. I will use the returned user object
			if(user){
				 firebase.auth().currentUser.updateProfile({
					displayName: userName.value
				})
				signUp();//animation
			}
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode == 'auth/weak-password') {
				alert('Senha muito fraca!');
			} else if(errorCode == 'auth/email-already-in-use'){
				alert('Email já utilizado');
			} else if(errorCode == 'auth/invalid-email'){
				alert('Email inválido!');
			}
			alert('Para de tentar bugar meu site!')
			console.log(error);
		});
	}else{
		alert("Email ou senha inválidos!");
	}
}
function naoAlopra(){
	if (!nAlopra) {
		nAlopra = true;
		alert("Não alopra, eu tenho acesso ao back-end, vc não!");
	}
}


// firebase.auth().onAuthStateChanged(function(user) {
// 	if (user) {
// 		/--Registers new user if needed--/
// 	    let db = firebase.firestore();
// 	    let userRef = db.collection("users").doc(user.displayName);
// 	    userRef.get().then(function(doc){
// 	        if(doc.exists){
// 	            alert("Bem-vindo de volta!")
// 	        }else{
// 	            db.collection("users").doc(user.displayName).set({
// 	                name: user.displayName,
// 	                debt: 0,
// 	                credit: 0
// 	            });
// 	        }
// 	    }).catch(function(error){
// 	        console.log("Error registeriing new user!")
// 	    });
// 	    /--Profile name h1--/
// 	    document.getElementById('userName').innerHTML = user.displayName;
// 	}else{
// 	    console.log("no user signed in");
// 	    window.location.replace("index.html");
// 	}
// 	document.getElementById("eventBtn").addEventListener("click",function(){
// 	    let id = document.getElementById("ID").value;
// 	    let participants = document.getElementById("people").value;
// 	    let eventPrice = document.getElementById("Value").value;
// 	    let eventCred = document.getElementById("Creditor").value;
// 	    let str = participants.split(",");

// 	    for (let i = str.length - 1; i >= 0; i--) {
// 	        console.log(str[i]);
// 	    }
// 	});
// })
