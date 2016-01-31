// Appointment component - usually represents a single day 
Appointment = React.createClass({
	propTypes: {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
		appointment: React.PropTypes.object.isRequired
		}


	,componentDidMount() {
		// we need "this" later but as itself -> use "self"
		var self = this;
		$(this.refs.text).editable({
			success(response, newValue){
				Meteor.call(
					"updateAppointment"
					, self.props.appointment._id
					, newValue
					);
				}
			});
		}


	,render(){
		return(
			<li className="list-group-item" >
				<span className="text">
					{moment(this.props.appointment.date).locale("de").format('ll')}
					: 
					<span ref="text">{this.props.appointment.text}</span>
				</span>
			</li>
			)
		}

	});