import React, { Component } from 'react'
import cookie from 'react-cookie'
import Head from 'next/head'
import { Router } from '../../routes'
import TextField from 'react-md/lib/TextFields'
import Button from 'react-md/lib/Buttons/Button'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import NProgress from 'nprogress'
import nextRouter from 'next/router'
import FontIcon from 'react-md/lib/FontIcons'


nextRouter.onRouteChangeStart = (url) => {

  NProgress.start()
}
nextRouter.onRouteChangeComplete = () => NProgress.done()
nextRouter.onRouteChangeError = () => NProgress.done()

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      userInfo: {},

    }

    this._handleUsernameChange = this._handleUsernameChange.bind(this)
    this._handlePasswordChange = this._handlePasswordChange.bind(this)
    this.openToastrhost = this.openToastrhost.bind(this)
    this.handelLogin = this.handelLogin.bind(this)

  }

  _handleUsernameChange (value) {

    this.setState({
      username: value
    })
  }

  _handlePasswordChange (value) {

    this.setState({
      password: value
    })
  }

  hostReachable () {

    let xhr = new XMLHttpRequest()
    let file = 'https://dev.tixdo.com'
    let randomNum = Math.round(Math.random() * 10000)
    xhr.open('HEAD', file + '?rand=' + randomNum, true)
    xhr.send()
    xhr.addEventListener('readystatechange', processRequest, false)

    function processRequest (e) {
      try {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 304) {
            loggedSucc = true

          } else {
            loggedSucc = false
            // this.openToastrhost('Internet Connection Problem...It seems like you are not connected to the network!!!!')
            alert('Internet Connection Problem...It seems like you are not connected to the network!!!!')
          }
        }
      } catch (e) {
        return false
      }
    }
  }
  checkCredentials(){
    if(this.state.username ===''||this.state.password ===''){
      return false
    }
    else{
      return true
    }
  }

  handelLogin (e) {

    this.hostReachable()

    e.preventDefault();
    let cred = this.checkCredentials();
    if(cred === true) {
      let credentials = {
        email: this.state.username,
        password: this.state.password
      }
      this.props.authenticate(credentials)
      if (e.keyCode === 13) {
        let credentials = {
          email: this.state.username,
          password: this.state.password
        }
        this.props.authenticate(credentials)
      }
    }
    else{
      this.openToastrhost('no cred')
    }

  }

  assignUser (val) {
    let usrname = val.user.userDetail.username
    let mobile = val.user.userDetail.phone
    let email = val.user.userDetail.email

    cookie.save('user_name', usrname, {path: '/'})
    localStorage.setItem('user_name', usrname)
    cookie.save('user_number', mobile, {path: '/'})
    localStorage.setItem('user_number', mobile)
    cookie.save('user_email', email, {path: '/'})
    localStorage.setItem('user_email', email)
  }

  setUser (props) {

    cookie.save('token', 'token' + ' ' + props.user.key, {path: '/'})
    localStorage.setItem('key', props.user.key)

    let group = props.user.group
    let index = group.indexOf('SuperAdmin')

    for (let i = 0; i < group.length; i++) {

      if (index > -1) {
        this.assignUser(props)
        cookie.save('user_type', 'SuperAdmin', {path: '/'})
        cookie.save('group', group, {path: '/'})
        localStorage.setItem('user_type', 'SuperAdmin')
        Router.pushRoute('dashboard')
        break
      }
      else {
        if (group.indexOf('CinemaAdmin') > -1) {
          this.assignUser(props)
          cookie.save('user_type', 'CinemaAdmin', {path: '/'})
          cookie.save('group', group, {path: '/'})
          localStorage.setItem('user_type', 'CinemaAdmin')
          Router.pushRoute('movieorder')
          break
        } else if (group.indexOf('CrmAdmin') > -1) {

          this.assignUser(props)
          cookie.save('user_type', 'CrmAdmin', {path: '/'})
          cookie.save('group', group, {path: '/'})
          localStorage.setItem('user_type', 'CrmAdmin')
          Router.pushRoute('order')
          break
        }
        else if (group.indexOf('EventAdmin') > -1){
          cookie.save('user_type', 'EventAdmin', {path: '/'})
          cookie.save('group', group, {path: '/'})
          localStorage.setItem('user_type', 'EventAdmin')
          Router.pushRoute('eventdashboard')
          break
        }
      }
    }

  }

  componentWillReceiveProps (newProps) {

    if (typeof(newProps.user.key) !== 'undefined') {

      this.setUser(newProps)
    }
    else {
      this.openToastrhost(newProps.statusText)
    }

  }

  openToastrhost (message) {

    toastr.options = {
      closeButton: '<button><i class="icon-off"></i></button>',
      positionClass: 'toast-top-full-width',
      onclick: null,
      closeMethod: 'fadeOut',
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'preventDuplicates': true,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }

    if (message === 'no cred') {
      toastr.error('Please enter username and password')
    }
    else {
      toastr.error(message)
    }

  }

  componentDidMount () {

    if ((this.props.user !== null) && (typeof this.props.user.key !== 'undefined' && this.props.isServer && typeof this.props.user.group !== 'undefined' && this.props.user.group !== null)) {
      this.setUser(this.props)
    }
    else {

    }

  }

  componentWillUnmount () {

  }

  render () {
    let style = {
      minWidth: '450px',
    minHeight: '450px',
      border: '1px solid #d0d0d0'
    }

    return (
      <div className="navbar">
        <Head>
          <title>Tixdo</title>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <link rel="apple-touch-icon" href="https:s3.amazonaws.com/tixdotest/images/favicon.png"/>
          <link rel="icon" href="https://s3.amazonaws.com/tixdotest/images/favicon.png" type="image/png"/>
          <link rel="shortcut icon" href="https://s3.amazonaws.com/tixdotest/images/favicon.png" type="image/x-icon"/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons'/>
          <link rel='stylesheet' href='/static/css/react-md.light_blue-yellow.min.css'/>
          <link rel='stylesheet' href='/static/css/login.css'/>
          <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css'/>
          <link rel="stylesheet" href="/static/css/toastr.css"/>
        </Head>

        <section id="main-container">
          <div className="md-grid">
            <div className="md-cell--12">
              <div className="main_div">
                <div className="upper_div">
                  <img className="home_icon" src="/static/images/tixdo_logo.png"/>
                </div>
                <div className="lower_div">
                  <div className="login_div">
                    <p className="login_txt">Login</p>
                    <p className="info">Please enter your user information.</p>
                    <form onSubmit={this.handelLogin.bind(this)} className="login_form">
                        <TextField
                        id="floatingCenterTitle"
                        label="Username"
                        lineDirection="center"
                        size={30}
                        leftIcon={<FontIcon>perm_identity</FontIcon>}
                        ref='username'
                        inputClassName="input_email"
                        value={this.state.username}
                        onChange={this._handleUsernameChange}
                        />
                        <TextField
                        id="floatingCenterTitle"
                        label="Password"
                        lineDirection="center"
                        type="password"
                        size={30}
                        leftIcon={ <FontIcon>lock</FontIcon>}
                        ref='password'
                        inputClassName="input_pass"
                        style={{marginTop: '15px'}}
                        value={this.state.password}
                        onChange={this._handlePasswordChange}
                        />
                        <Button className="submit_btn"  raised type="submit" label="Submit"/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        <footer>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"/>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    user: state.auth.user,
    statusCode: state.auth.statusCode,
    statusText: state.auth.statusText,
  }
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (user) => {
      dispatch(login(user))

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
