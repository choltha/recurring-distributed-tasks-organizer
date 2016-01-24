// Appointment component - usually represents a single day 
Appointment = React.createClass({
	propTypes: {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
		appointment: React.PropTypes.object.isRequired
		}


	,componentDidMount() {
		// we need this later but as "itself" -> use "self"
		$(this.refs.text).editable({
			success(response, newValue){
				Meteor.call(
					"updateAppointment"
					, this.dataset.id
					, newValue
					);
				}
			});
		}


	,render(){
		return(
			<li>
				<span className="text">
					{moment(this.props.appointment.date).locale("de").format('ll')}
					: 
					<span ref="text" data-id={this.props.appointment._id} onClick = {this.updateText}>{this.props.appointment.text}</span>
				</span>
			</li>
			)
		}

	});