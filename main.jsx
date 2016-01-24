
// Define a collection to hold our tasks
// The name in the function call defines the "table" name
Appointments = new Mongo.Collection("appointments");

if (Meteor.isClient) {
	// Client code

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
		});

	Meteor.subscribe("main-data-subscription");

	Meteor.startup(function (){
		React.render(<App />, document.getElementById("render-target"))
		});
	}

if (Meteor.isServer) {
	Meteor.publish("main-data-subscription", function () {
		return Appointments.find({});
		});
	}

Meteor.methods({

	createAppointment(date){
		Appointments.insert({
			createdAt: new Date()
			,owner: Meteor.userId()
			,date: date
			});
		}


	,updateAppointment(appointmentId, text) {
		Appointments.update(appointmentId, { $set: { text: text} });
		}

	
	});