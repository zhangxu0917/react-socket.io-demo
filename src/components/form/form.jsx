import React, {Component} from 'react'
import './form.css'
// FIXME: 引入socket.io-client
import io from 'socket.io-client'

export default class form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: '',
			message: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var socket = io.connect('http://localhost');
		socket.on('connected', function (data) {
			this.setState({
				socketConnected: false
			})
		});
	}

	handleSubmit() {
		if (this.state.nickname === '' || this.state.message === '') {
			return
		}

		// io.emit('submit', )
	}

	handleChange(key, val) {
		this.setState({
			[key]: val.trim()
		})
	}

	render() {
		return (
			<div className="form-container">
				{
					this.state.socketConnected ? (
						<p>socket已连接</p>
					) : null
				}
				<form>
					<div className="form-item">
						<label>昵称：</label>
						<input type="text" onChange={e => this.handleChange('nickname', e.target.value)}/>
					</div>
					<div className="form-item">
						<label>内容：</label>
						<textarea onChange={e => this.handleChange('message', e.target.value)} cols="30" rows="10"
						          style={{verticalAlign: 'top'}}></textarea>
					</div>
					<div>
						<button onClick={this.handleSubmit.bind(this)}>提交</button>
					</div>
				</form>
			</div>
		)
	}
}
