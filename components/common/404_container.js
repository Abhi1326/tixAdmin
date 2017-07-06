/**
 * Created by consultadd on 2/3/17.
 */

import React, { Component } from 'react'
import Head from 'next/head'
import { Router } from '../../routes'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'

export class ErrorContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      statusCode: 404,
      statusText: 'Not Found'
    }

    this.logout = this.logout.bind(this)

  }

  componentDidMount () {

    this.setState({
      statusText: this.props.statusText,
      statusCode: this.props.statusCode
    },()=>{
      console.log(this.state.statusCode,'------------>')
    })
  }

  logout () {
    this.props.logout()
    Router.push('/')
  }

  render () {

    return (
      <div>
        <Head>

          <link rel='stylesheet' href='/static/css/404.css'/>
          <link rel="stylesheet" href="/static/css/toastr.css"/>
        </Head>

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">


            <div className="container">
              <div className="text">
                <img className="error_image_logo" src="/static/images/logo.png"/>
                <h1 style={{
                  textShadow: '3px -1px #9fa3a3',
                  fontSize: '151px'
                }}>{this.state.statusCode}</h1>
                <h2 style={{fontSize: '18px'}}>  {this.state.statusText}</h2>
                <h2>Go</h2>{((this.state.statusCode==='401')||(this.state.statusCode==='403'))?
                  <h2 ><a style={{cursor: 'pointer', marginLeft: '14px'}}
                          onClick={this.logout}>hom<span>e</span></a>&nbsp;</h2>:
                  <h2 ><a style={{cursor: 'pointer', marginLeft: '14px'}}
                          onClick={()=>{window.history.back()}}>bac<span>k</span></a>&nbsp;</h2>
                }
              </div>
            </div>

          </div>
        </div>
        <footer>
          <script src='/static/js/FourO.js'/>
          <script src='https://rawgithub.com/wagerfield/parallax/master/deploy/jquery.parallax.js'/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"/>
        </footer>
        <style jsx>{`
                .error_image_logo{
                    max-width: 130px;
                    margin: 30px auto 10px;
                    display: table;
                }


      `}</style>
      </div>

    )
  }

}
const mapStateToProps = (state) => {

  return state
}
const mapDispatchToProps = (dispatch) => {
  return {

    logout: () => {
      dispatch(logout())
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)