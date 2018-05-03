import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/user.action';
import { Layout, Form, Icon, Input, Button } from 'antd';
const { Content, Footer } = Layout;
const FormItem = Form.Item;
import CopyRight from '../../components/footer';
import './style.scss';

function mapStateToProps(state) {
	return {
		user: state.UserReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
	}
}

class LoginContainer extends Component {
	constructor(props) {
		super(props);
		document.title = '登录';

	}
	componentDidMount() {
		this.props.actions.checkUserLogin();
		this.props.actions.initLoginState();
	}
	render() {
		const { user, actions } = this.props;

		return (
			<div className="page-login">
				<Layout>
					<Content>
						<div className="middle-box text-center loginscreen animated fadeInDown">
							<div className="login_wrapper">
								<div className="logo_box">
									<img src={PARAMCONFIG.LOGINLOGO} />
								</div>
								<div className="form_box">
									<WrappedNormalLoginForm handleFormSubmit={actions.doLoginSubmit} />
								</div>
							</div>
						</div>
					</Content>
					<Footer><CopyRight /></Footer>
				</Layout>
			</div>
		)
	}
}

class NormalLoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				username: '',
				password: '',
				verify_code: '',
			},
			checkCodeImg: "/uic/api/v2/account/login/gen-captcha?r=" + Math.random()
		}
	}
	changeCheckCode(e) {
		let self = e.target;
		this.setState({
			checkCodeImg: "/uic/api/v2/account/login/gen-captcha?r=" + Math.random()
		});
	}
	doFormSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.handleFormSubmit(values);
			} else {
				console.log(err);
			}
		});
	}
	formInputChange(e) {
		let field = e.target.name;
		let value = e.target.value;
		let data = this.state.formData;
		data[field] = value;
		this.setState({
			formData: data
		});
		this.props.form.setFieldsValue();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		let CcStyle = {
			display: 'block'
		}
		if (PARAMCONFIG.NOTAPPLYCKC) {
			CcStyle = {
				display: 'none'
			}
		}
		return (
			<Form onSubmit={this.doFormSubmit.bind(this)}>
				<FormItem>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: '请输入用户名!' }],
					})(
						<Input
							prefix={<Icon type="user" style={{ fontSize: 13 }} />}
							name="username"
							placeholder="用户名" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入密码!' }],
					})(
						<Input prefix={<Icon type="lock"
							style={{ fontSize: 13 }} />}
							name="password"
							type="password"
							placeholder="密码" />
					)}
				</FormItem>
				<FormItem>
					<div className={CcStyle}>
						{getFieldDecorator('verify_code', {
							rules: [{ required: true, message: '请输入验证码!' }],
						})(
							<Input className="checkcode-input"
								prefix={<Icon type="safety" style={{ fontSize: 13 }} />}
								suffix={<img className="code_img"
									id="v_code"
									onClick={this.changeCheckCode.bind(this)}
									src={this.state.checkCodeImg}
									title="看不清楚？换一张"
									alt="验证码" />}
								name="verify_code"
								placeholder="验证码" />
						)}

					</div>
				</FormItem>
				<FormItem>
					<Button type="primary" style={{ width: "100%" }} htmlType="submit" className="login-form-button">
						登 录
				</Button>
					<div style={{ width: '100px', float: 'right' }}>
						<a className="login-form-forgot" href="">忘记密码</a> <a href="">马上注册</a>
					</div>
				</FormItem>
			</Form>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer)