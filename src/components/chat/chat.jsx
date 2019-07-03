import React, {Component} from 'react'
import './chat.css'
// FIXME: 引入socket.io-client
import io from 'socket.io-client'
import moment from 'moment'

export default class chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: '',
			message: '',
			messages: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	static socket = null;

	componentDidMount() {
		this.socket = io.connect('/');
		this.socket.on('connected', (data) => {
			this.setState({
				socketConnected: true,
				messages: data.messages
			})
		});
		this.socket.on('transMessages', val => {
			this.setState(val)
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.nickname === '' || this.state.message === '') {
			return
		}
		this.socket.emit('submit', this.state)
	}

	handleChange(key, val) {
		this.setState({
			[key]: val.trim()
		})
	}

	render() {
		return (
			<div className={"container"}>
				<div className={"message-container"}>
					<div>
					{
						this.state.messages.map((item, index) => {
							return (
								<div key={index}>
									<div>
										<span>昵称：{item.nickname}：</span>
										<span style={{float: 'right'}}>创建时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
									</div>
									<p>消息：{item.message}</p>
								</div>
							)
						})
					}
					</div>
				</div>
				<div className="form-container">
					{
						this.state.socketConnected ? (
							<p style={{color: 'red'}}>socket已连接</p>
						) : null
					}
					<form>
						<div className="form-item">
							<label>昵称：</label>
							<input type="text" onChange={e => this.handleChange('nickname', e.target.value)}/>
						</div>
						<div className="form-item">
							<label>内容：</label>
							<textarea onChange={e => this.handleChange('message', e.target.value)} cols="30" rows="5"
							          style={{verticalAlign: 'top'}}></textarea>
						</div>
						<div>
							<button onClick={this.handleSubmit.bind(this)}>提交</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
