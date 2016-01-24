// Appointment component - usually represents a single day 
Appointment = React.createClass({
	propTypes: {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
		appointment: React.PropTypes.object.isRequired
		}

	,updateText() {
		var text = ReactDOM.findDOMNode(this.refs.text).value.trim();
		console.log(this.props.appointment.text, text);

		Meteor.call(
			"updateAppointment"
			, this.props.appointment._id
			, text
			);
		}

	,render(){
		return(
			<li>
				<span className="text">
					{moment(this.props.appointment.date).locale("de").format('ll')}
					: 
					<input 
						type = "text"
						ref = "text"
						defaultValue = {this.props.appointment.text} />
					<input
						type = "button"
						onClick = {this.updateText}
						value = "Speichern" />
				</span>
			</li>
			)
		}

	});