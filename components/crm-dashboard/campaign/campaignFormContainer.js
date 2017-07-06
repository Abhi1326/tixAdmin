/**
 * Created by consultadd on 8/3/17.
 */
import React, { Component } from 'react'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { actions, Control, Errors, Form } from 'react-redux-form'
import MyTextInput from '../../form-fields/textInput'
import TextAreaComponent from '../../form-fields/textareaField'
import SelectField from '../../form-fields/selectField'
import AutoField from '../../form-fields/autoComplete'
import IntegerField from '../../form-fields/integerField'
import Head from 'next/head'
import Button from 'react-md/lib/Buttons/Button'
import _ from 'underscore'
import {
  getCampaignCity,
  getCampaignEvent,
  getCampaignMovie,
  getCampaignTheatres,
  getSubmitData,
  getSubmitUpdateData
} from '../../../actions/campaignActions'

let movieData = []
let cityData = []
let theatreData = []
let theatrechainData = []
let eventData = []
let index_page = 0

const required = (val) => val && val.length
const maxLength = (len) => (val) => val.length <= len
const isNumber = (val) => !isNaN(Number(val))

class CampaignFormContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      city: '',
      event: '',
      movie: '',
      theatre: ''
    }

    this.logout = this.logout.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.openaddDialog = this.openaddDialog.bind(this)
    this.setCity = this.setCity.bind(this)
    this.setEvent = this.setEvent.bind(this)
    this.setMovie = this.setMovie.bind(this)
    this.setTheatre = this.setTheatre.bind(this)
    this.openCouponForm = this.openCouponForm.bind(this)

  }


  openCouponForm(){
    Router.pushRoute('coupon')
  }

  openDialog (toast) {
    if (toast.success === true) {
      this.openToastr('Campaign added Successfully')
    }else if (typeof toast.response.name != 'undefined') {
      this.openToastr(toast.response.name[0],"Error")
    }
    else if (typeof toast.response.movie != 'undefined') {
      this.openToastr('Movie:'+"  "+toast.response.movie[0],"Error")
    }else if (typeof toast.response.city != 'undefined') {
      this.openToastr('City:'+"  "+toast.response.city[0],"Error")
    }else if (typeof toast.response.event != 'undefined') {
      this.openToastr('Event:'+"  "+toast.response.event[0],"Error")
    }else if (typeof toast.response.theatre != 'undefined') {
      this.openToastr('Theatre:'+"  "+toast.response.theatre[0],"Error")
    }else{
      _.each(toast.response,(value,key)=>{
        this.openaddToastr(key+':'+value,'Error')
      })
    }

  };

  openToastr (msg,display) {

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

    if (display === 'Error') {
      toastr.error(msg)
    }
    else {
      toastr.success(msg)
    }
  }

  openaddDialog (toast) {
    if (toast.success === true) {
      this.openaddToastr('Campaign added Successfully')
    }else if (typeof toast.response.name != 'undefined') {
      this.openaddToastr(toast.response.name[0],"Error")
    }
    else if (typeof toast.response.movie != 'undefined') {
      this.openaddToastr('Movie:'+toast.response.movie[0],"Error")
    }else if (typeof toast.response.city != 'undefined') {
      this.openaddToastr('City:'+toast.response.city[0],"Error")
    }else if (typeof toast.response.event != 'undefined') {
      this.openaddToastr('Event:'+toast.response.event[0],"Error")
    }else if (typeof toast.response.theatre != 'undefined') {
      this.openaddToastr('Theatre:'+toast.response.theatre[0],"Error")
    }else{
      this.openaddToastr("Some...Error has been ocurred!!!!!!!!!!!!","Error")
    }
  };

  openaddToastr (msg,display) {

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

    if (display === 'Error') {
      toastr.error(msg)
    }
    else {
      toastr.success(msg)
    }

  }

  componentWillReceiveProps (newProps) {

    if (this.props.updatecamplist !== newProps.updatecamplist && (newProps.Type === 'update')) {
      this.props.update(newProps.updatecamplist)

      this.props.update(newProps.updatecamplist)
      if (newProps.updatecamplist.city !== null) {
        this.setState({
          city: newProps.updatecamplist.city.name
        })
        newProps.set('form.campaign.city', newProps.updatecamplist.city.id)
      }
      if (newProps.updatecamplist.event !== null) {
        this.setState({
          event: newProps.updatecamplist.event.title
        })
        newProps.set('form.campaign.event', newProps.updatecamplist.event.id)

      }
      if (newProps.updatecamplist.movie !== null) {
        this.setState({
          movie: newProps.updatecamplist.movie.title
        })
        newProps.set('form.campaign.movie', newProps.updatecamplist.movie.id)
      }
      if (newProps.updatecamplist.theatre !== null) {
        this.setState({
          theatre: newProps.updatecamplist.theatre.title
        })
        newProps.set('form.campaign.theatre', newProps.updatecamplist.theatre.id)
      }
      if (newProps.updatecamplist.theatre_chain !== null) {
        this.setState({
          theatre_chain: newProps.updatecamplist.theatre_chain.name
        })
        newProps.set('form.campaign.theatre_chain', newProps.updatecamplist.theatre_chain.id)
      }

    }
  }

  componentDidMount () {

    if (this.props.Type === 'update') {
      this.props.update(this.props.updatecamplist)
      if (typeof this.props.updatecamplist.city !=='undefined' && this.props.updatecamplist.city !== null) {
        this.setState({
          city: this.props.updatecamplist.city.name
        })
        this.props.set('form.campaign.city', this.props.updatecamplist.city.id)
      }
      if (typeof this.props.updatecamplist.event !=='undefined' && this.props.updatecamplist.event !== null) {
        this.setState({
          event: this.props.updatecamplist.event.title
        })
        this.props.set('form.campaign.event', this.props.updatecamplist.event.id)

      }
      if (typeof this.props.updatecamplist.movie !=='undefined' && this.props.updatecamplist.movie !== null) {
        this.setState({
          movie: this.props.updatecamplist.movie.title
        })
        this.props.set('form.campaign.movie', this.props.updatecamplist.movie.id)
      }
      if (typeof this.props.updatecamplist.theatre !=='undefined' && this.props.updatecamplist.theatre !== null) {
        this.setState({
          theatre: this.props.updatecamplist.theatre.title
        })
        this.props.set('form.campaign.theatre', this.props.updatecamplist.theatre.id)
      }
      if (typeof this.props.updatecamplist.theatre_chain !=='undefined' && this.props.updatecamplist.theatre_chain !== null) {
        this.setState({
          theatre_chain: this.props.updatecamplist.theatre_chain.name
        })
        this.props.set('form.campaign.theatre_chain', this.props.updatecamplist.theatre_chain.id)
      }

    }

    else {
      this.props.resetForm()
    }
    this.props.setErrors('form.campaign.name', 'are you crazy')
  }

  componentWillUnmount () {
    this.resetForm()
  }

  logout () {
    this.props.logout()
  }

  _handleSubmit (camp) {

    if (this.props.Type === 'add') {
      this.props.getSubmitData(camp, this.props.headers).then(res => {
        this.openaddDialog(res)
      })
    } else if (this.props.Type === 'update') {
      this.props.getSubmitUpdateData(camp, this.props.Id, this.props.headers).then(res => {
        this.openDialog(res)
      })
    }
  }

  resetForm () {
    this.setState({
      city: '',
      event: '',
      movie: '',
      theatre: ''
    })
    this.props.resetForm()
  }

  setCity (val, i, k) {
    this.setState({
      city: val
    })

    if (val.length >= 3) {
      this.props.getCities(val, this.props.headers)
    }
    if (k instanceof Array) {
      this.props.set('form.campaign.city', k[i].id)
    }

  }

  setTheatre (val, i, k) {
    console.log(val, i, k)
    this.setState({
      theatre: val
    })

    if (val.length >= 3) {
      this.props.getTheatres(val, this.props.headers)
    }
    if (k instanceof Array) {
      this.props.set('form.campaign.theatre', k[i].id)
    }

  }

  setEvent (val, i, k) {

    this.setState({
      event: val
    })

    if (val.length >= 3) {
      this.props.getEvents(val, this.props.headers)
    }
    if (k instanceof Array) {
      this.props.set('form.campaign.event', k[i].id)
    }

  }

  setMovie (val, i, k) {

    this.setState({
      movie: val
    })

    if (val.length >= 3) {
      this.props.getMovies(val, this.props.headers)
    }
    if (k instanceof Array) {
      this.props.set('form.campaign.movie', k[i].id)
    }

  }

  render () {

    const {theatrelist, movielist, eventlist, citylist, theatrechainlist, campaigntypelist, coupontypelist, discounttypelist} = {...this.props}
    citylist.map((city) => {
      delete city.code
      return city
    })
    movielist.map((movie) => {
      delete movie.slug
      return movie
    })
    eventlist.map((event) => {
      delete event.slug
      return event
    })
    theatrelist.map((theatre) => {
      delete theatre.slug
      return theatre
    })

    return (
      <Layout >
        <div style={{backgroundColor: 'white', width: '100%'}}>
          <div className="main_container">
            <Head>
              <title>Campaign Form</title>
              <link rel='stylesheet' href='/static/css/genericGenerate.css'/>
              <link rel='stylesheet' href='/static/css/toastr.css'/>
            </Head>
            <div className="content-wrapper">

              <div className="md-text-right md-cell-12">
                <Button onClick={this.openCouponForm} style={{background:'#3873a7',margin:'20px 50px 0 0'}} raised primary label="Add Coupon"/>
              </div>

              <Form model="form.campaign"
                    onSubmit={this._handleSubmit}
              >
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Name</p>
                  <div>
                    <Control
                      model='.name'
                      component={MyTextInput}
                      mapProps={{
                        value: (props) => props.viewValue,
                      }}
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="errors"
                      model='.name'
                      show="touched"
                      style={{color: 'red'}}
                      messages={{
                        required: 'This Field Can\'t Be Empty *',
                      }}
                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Description</p>
                  <div>
                    <Control
                      model='.description'
                      component={TextAreaComponent}
                      mapProps={{
                        value: (props) => props.viewValue,
                      }}
                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Value</p>
                  <div>
                    <Control
                      model='.value'
                      component={IntegerField}
                      mapProps={{
                        value: (props) => props.viewValue,
                      }}

                    />
                  </div>
                </div>

                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Campaign Type</p>
                  <div>
                    <Control
                      model='.campaign_type'
                      component={SelectField}
                      mapProps={{
                        value: (props) => props.viewValue,
                      }}
                      menuItems={campaigntypelist.map(camp => {
                        return {label: camp.value, value: camp.key}
                      })}
                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Coupon Type</p>
                  <div>
                    <Control
                      model='.type'
                      component={SelectField}
                      mapProps={{
                        value: (props) => props.viewValue,
                      }}
                      menuItems={coupontypelist.map(coup => {
                        return {label: coup.value, value: coup.key}
                      })}

                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Discount Type</p>
                  <div>
                    <Control
                      model='.discount_type'
                      component={SelectField}
                      mapProps={{
                        value: (props) => props.viewValue,
                      }}
                      menuItems={discounttypelist.map(discount => {
                        return {label: discount.value, value: discount.key}
                      })}

                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Movie</p>
                  <div>
                    <Control
                      model='.movie'
                      component={AutoField}
                      label="Select Movie"
                      data={movielist}
                      dataLabel="title"
                      dataValue="title"
                      value={this.state.movie}
                      onChange={this.setMovie}
                      onAutocomplete={this.setMovie}
                      filter={null}

                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Event</p>
                  <div>
                    <Control
                      model='.event'
                      component={AutoField}
                      label="Select Event"
                      data={eventlist}
                      dataLabel="title"
                      dataValue="title"
                      value={this.state.event}
                      onChange={this.setEvent}
                      onAutocomplete={this.setEvent}
                      filter={null}
                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">City</p>
                  <div>
                    <Control
                      model='.city'
                      component={AutoField}
                      label="Select City"
                      data={citylist}
                      dataLabel="name"
                      dataValue="name"
                      value={this.state.city}
                      onChange={this.setCity}
                      onAutocomplete={this.setCity}
                      filter={null}
                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Theatre Chain</p>
                  <div>
                    <Control
                      model='.theatre_chain'
                      component={SelectField}
                      mapProps={{
                        value: (props) => props.viewValue,
                      }}
                      menuItems={theatrechainlist.map(theatrechain => {
                        return {label: theatrechain.name, value: theatrechain.id}
                      })}
                    />
                  </div>
                </div>
                <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Theatre</p>
                  <div>
                    <Control
                      model='.theatre'
                      component={AutoField}
                      label="Select Theatre"
                      data={theatrelist}
                      dataLabel="title"
                      dataValue="title"
                      value={this.state.theatre}
                      onChange={this.setTheatre}
                      onAutocomplete={this.setTheatre}
                      filter={null}


                    />
                  </div>
                </div>
                <div className="btnStore">
                  <Button type="submit" className="btnForm" raised label="submit"/>
                  <Button style={{background:'rgb(56, 115, 167);'}} onClick={this.resetForm} className="btnFormReset" raised label="Reset"/>
                </div>
              </Form>
            </div>


            <style jsx>{`


                `}</style>
          </div>
        </div>
      </Layout>

    )
  }
}

const mapStateToProps = (state) => {

  return {

    eventlist: state.campaign.campeventObj,
    movielist: state.campaign.campmovieObj,
    citylist: state.campaign.campcityObj,
    theatrelist: state.campaign.camptheatreObj,
    theatrechainlist: state.campaign.camptheatrechainObj,
    discounttypelist: state.campaign.campdiscounttypeObj,
    coupontypelist: state.campaign.campcouponObj,
    campaigntypelist: state.campaign.camptypeObj,
  }
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    },
    update: (props) => {
      dispatch(actions.merge('form.campaign', props))
    },
    resetForm: (props) => {
      dispatch(actions.reset('form.campaign'))
    },
    getSubmitData: (camp, headers) => {
      return dispatch(getSubmitData(camp, headers))
    },
    getSubmitUpdateData: (camp, id, headers) => {
      return dispatch(getSubmitUpdateData(camp, id, headers))
    },
    getCities: (query, headers) => {
      return dispatch(getCampaignCity(query, headers))
    },
    getEvents: (query, headers) => {
      return dispatch(getCampaignEvent(query, headers))
    },
    getMovies: (query, headers) => {
      return dispatch(getCampaignMovie(query, headers))
    },
    getTheatres: (query, headers) => {
      return dispatch(getCampaignTheatres(query, headers))
    },
    set: (modal, value) => {
      dispatch(actions.change(modal, value))
    },
    setErrors: (modal, value) => {
      dispatch(actions.setErrors(modal, value))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignFormContainer)



