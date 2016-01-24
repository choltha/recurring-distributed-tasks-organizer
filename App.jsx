//App component - this is the main app file
App = React.createClass({

	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData]

	// Loads items from the Appointments collection and puts them on this.data...
	,getMeteorData() {


		return {
			appointments: Appointments
				.find(
					{}
					)
				.fetch()
			,currentUser: Meteor.user()
			};
		}

	,renderAppointments() {
		// Get appointments from this.data.appointments
		console.log(this.data.appointments);
		return this.data.appointments.map((appointment) => {		
			console.log(appointment);
			return <Appointment
				key={appointment._id}
				appointment={appointment} />;
			});
		}

	,handleSubmit(event) {
		event.preventDefault();

		// neusten Tag(Datum) finden, den Folgenden anlegen
		var lastestAppointment
			= Appointments
			.findOne(
				{} 
				,{sort: {date: -1}}
				)
			;
		if (lastestAppointment){
			var newestDate = moment(new Date(lastestAppointment.date));
			var nextDate = newestDate.clone().add(1,'day');
			} 
		else {
			var nextDate = new Date();
			}
		
		Meteor.call("createAppointment", new Date(nextDate.toISOString()));

		}


	,toggleHideCompleted() {
		this.setState({
			hideCompleted: ! this.state.hideCompleted
			});
		}

	,render() {
		return (
			<div className = "container" id = "main-container">
				<header>
					<h1>Abäppeldienst</h1>
					{ /* do i need that ?? 
					<AccountsUIWrapper />
						*/}

				</header>

				<ul>
					{this.renderAppointments()}
				</ul>
				<footer>
					<form className = "add-new-date" onSubmit = {this.handleSubmit} >
						<input
							type = "submit"
							ref = "add-new-date-button"
							value = "Weiteren Tag anlegen" />
					</form>
				</footer>
			</div>


			);
		}

	});