import React, { Component } from 'react'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import MyTextInput from '../../form-fields/textInput'
import IntegerField from '../../form-fields/integerField'
import DateField from '../../form-fields/dateField'
import AutoField from '../../form-fields/autoComplete'
import Head from 'next/head'
import _ from 'underscore'
import Loader from '../../common/pageLoader'
import Button from 'react-md/lib/Buttons/Button'
import {
    getCampaignList,
    getCouponForm,
    getSubmitCoupAddData,
    getSubmitCoupUpdateData
} from '../../../actions/couponActions'
import Chip from 'react-md/lib/Chips'
import Avatar from 'react-md/lib/Avatars'
import { actions, Control, Errors, Form } from 'react-redux-form'

const required = (val) => val && val.length
const minLength = (len) => (val) => val.length >= len
const isNumber = (val) => !isNaN(Number(val))

let multiUser = []
let chipset = []
let arr = []
class couponFormContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      Formlist: [],
      selected_user: [],
      campaign: '',
      selected: [],
      chips: [],
      multi_user: '',

    }

    this.logout = this.logout.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.openaddDialog = this.openaddDialog.bind(this)
    this.setCampaign = this.setCampaign.bind(this)
    this.setUser = this.setUser.bind(this)
    this.userCall = this.userCall.bind(this)
    this.openCampaignForm = this.openCampaignForm.bind(this)

  }

  componentWillReceiveProps (newProps) {

    multiUser = newProps.userlist.map(user => {
      user.key=user.id
      return user
    })

    if (this.props.updateformObj !== newProps.updateformObj) {
      this.props.update(newProps.updateformObj)
    }

    if (this.props.updatecouplist !== newProps.updatecouplist && (newProps.Type === 'update')) {
      this.props.update(newProps.updatecouplist)
      if (newProps.updatecouplist.campaign !== null) {
        this.setState({
          campaign: newProps.updatecouplist.campaign.detail
        })
        newProps.set('form.coupons.campaign', newProps.updatecouplist.campaign.id)
      }
      if (newProps.updatecouplist.multi_user !== null) {
        this.setState({
          selected: newProps.updatecouplist.multi_user.map(user => {
            return user.id
          }),
          chips: newProps.updatecouplist.multi_user,
        }, () => {
          newProps.set('form.coupons.multi_user', this.state.selected)
        })
        newProps.set('form.coupons.multi_user', newProps.updatecouplist.multi_user)
      }
    }
  }

  componentDidMount () {
    this.setState({
      userlist: this.props.userlist,
    })
    multiUser = this.props.userlist.map(user => {
      user.key=user.id
      return user
    })

    if (this.props.Type === 'update') {
      this.props.update(this.props.updatecouplist)
      if (typeof this.props.updatecouplist.campaign !=='undefined' && this.props.updatecouplist.campaign !== null) {
        this.setState({
          campaign: this.props.updatecouplist.campaign.detail
        })
        this.props.set('form.coupons.campaign', this.props.updatecouplist.campaign.id)
      }
      if (typeof this.props.updatecouplist.multi_user !=='undefined' && this.props.updatecouplist.multi_user !== null) {
        this.setState({
          selected: this.props.updatecouplist.multi_user.map(user => {
            return user.id
          }),
          chips: this.props.updatecouplist.multi_user,
        }, () => {
          this.props.set('form.coupons.multi_user', this.state.selected)
        })

      }
    } else {
      this.props.resetForm()
    }

  }

  setCampaign (val, i, k) {
    this.setState({
      campaign: val
    })

    if (val.length >= 3) {
      this.props.getCampaign(val, this.props.headers)
    }
    if (k instanceof Array) {
      this.setState({
        campaign: val
      },()=>{this.props.set('form.coupons.campaign', k[0].id)},(error)=>{console.log(error)})

    }

  }

  openDialog (toast) {

    if (toast.success === true) {
      this.openaddToastr('Coupon added Successfully')
    }
    else if (typeof toast.response.code != 'undefined') {
      this.openaddToastr(toast.response.code[0],"Error")
    }else if (typeof toast.response.multi_user != 'undefined') {
      this.openaddToastr("Invalid Multiuser !!!!!!","Error")
    }else{
      _.each(toast.response,(value,key)=>{
        this.openaddToastr(key+':'+value,'Error')
      })

    }

  };


  openCampaignForm(){
    Router.pushRoute('campaign')
  }

  openToastr (msg) {

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

    if (msg === 'Error') {
      toastr.error(msg)
    }
    else {
      toastr.success(msg)
    }

  }

  userCall (val) {

  }

  openaddDialog (toast) {

    if (toast.success === true) {
      this.openaddToastr('Coupon added Successfully')
    }
    else if (typeof toast.response.code != 'undefined') {
      this.openaddToastr(toast.response.code[0],"Error")
    }else if (typeof toast.response.multi_user != 'undefined') {
      this.openaddToastr("Invalid Multiuser !!!!!!","Error")
    }else{
      _.each(toast.response,(value,key)=>{
        this.openaddToastr(key +" : "+ value,"Error")
      })

    }

  }


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

  setUser (user, k, l) {

    this.setState({
      multi_user: user
    },()=>{
      if(this.state.multi_user===''){
        this.props.set('form.coupons.multi_user', this.state.selected)
      }
    })

    if (user.length >= 3) {
      setTimeout(()=>{
        this.props.getMultiUser(user, this.props.headers)
      },200)

    }

    if (l instanceof Array) {

      if (this.state.selected.indexOf(l[k].id) === -1 && user !== '') {
        this.setState({
          multi_user: '',
          selected: [...this.state.selected, l[k].id],
          chips: [...this.state.chips, l[k]]
        }, () => {this.props.set('form.coupons.multi_user', this.state.selected)},(error)=>{
          console.log(error)
        })
      }
    }

  }

  componentWillUnmount () {

    this.resetForm()
  }

  logout () {
    this.props.logout()
  }

  _handleSubmit (coup) {

    if (this.props.Type === 'add') {
      this.props.getSubmitCoupAddData(coup, this.props.headers).then(res => {
        this.openaddDialog(res)

      })
    } else if (this.props.Type === 'update') {
      this.props.getSubmitCoupUpdateData(coup, this.props.Id, this.props.headers).then(res => {
        this.openDialog(res)
      })
    }
  }

  removeChip (index) {

    this.setState({
      chips: this.state.chips.filter((chip, i) => {

        if (i === index) {

        }
        else {
          return chip
        }
      }),
      selected: this.state.selected.filter((id, i) => {
        if (i === index) {}
        else { return id}
      })

    }, () => {
      this.props.set('form.coupons.multi_user', this.state.selected)
    })
  }

  resetForm () {
    this.props.resetForm()
    this.setState({
      campaign: '',
      selected: [],
      chips: [],
      multi_user: ''
    })
  }

  selectAll () {

  }

  render () {


    return (
      <Layout >
        <div style={{backgroundColor: 'white', width: '100%'}}>
          <div className="main_container">
            <Head>
              <title>Coupon Form</title>
              <link rel='stylesheet' href='/static/css/genericGenerate.css'/>
              <link rel='stylesheet' href='/static/css/rcSelect.css'/>
              <link rel='stylesheet' href='/static/css/react-datetime.css'/>
              <link rel='stylesheet' href='/static/css/toastr.css'/>
              </Head>
            <div className="content-wrapper">
<div className="md-text-right md-cell-12">
                  <Button onClick={this.openCampaignForm} style={{background:'#3873a7',margin:'20px 50px 0 0'}} raised primary label="Add Campaign"/>
                </div>

                <Form model="form.coupons"
                      onSubmit={this._handleSubmit}>
                  <div className="md-grid md-cell--1-offset">
                    <p className="md-cell--3 subheading">Code</p>
                    <div className="input_width">
                      <Control
                          model='.code'
                          component={MyTextInput}
                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}
                      />
                      <p className="nofification_p">Leaving this field empty will generate a random code.</p>
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">User limit</p>
                    <div>
                      <Control
                          model='.user_limit'
                          component={IntegerField}
                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}

                      />


                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Valid until</p>
                    <div className="valid_date">
                      <Control
                          model='.valid_until'
                          component={DateField}
                          mapProps={{
                            value: (props) => {
                              if(props.viewValue==null){
                                return new Date()
                              }
                              return new Date(props.viewValue)
                            },
                          }}
                      />
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Maximum discount amount
                    in Rs</p>
                    <div>
                      <Control
                          model='.max_discount'
                          component={IntegerField}

                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}

                       />
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Minimum transaction
                    value</p>
                    <div>
                      <Control
                          model='.minimum_amount'
                          component={IntegerField}
                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}

                      />
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Min buy tickets</p>
                    <div>
                      <Control
                          model='.min_buy_ticket'
                          component={IntegerField}
                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}

                      />
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Get free tickets</p>
                    <div>
                      <Control
                          model='.get_free_ticket'
                          component={IntegerField}
                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}

                      />
                      <p className="nofification_p">Free Ticket Campaign: Get number of free tickets ( Min Buy Tickets >=
                        Get Free Tickets )</p>
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Time span</p>
                    <div>
                      <Control
                          model='.time_span'
                          component={IntegerField}
                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}

                      />
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Usage limit</p>
                    <div>
                      <Control
                          model='.usage_limit'
                          component={IntegerField}

                          mapProps={{
                            value: (props) => {
                              return props.viewValue
                            }
                          }}

                      />
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset"><p className="md-cell--3 subheading">Campaign</p>
                    <div>
                      <Control
                          model='.campaign'
                          component={AutoField}
                          label="Select Campaign"
                          data={this.props.campaignlist}
                          dataLabel="detail"
                          value={this.state.campaign}
                          onChange={this.setCampaign}
                          onAutocomplete={this.setCampaign}
                          filter={null}
                      />
                    </div>
                  </div>
                  <div className="md-grid md-cell--1-offset">
                    <p className="md-cell--3 subheading">Multi user</p>
                    <div>
                      <Control
                          model='.multi_user'
                          component={AutoField}
                          label="Select Users"
                          data={multiUser}
                          dataLabel="user_data"
                          value={this.state.multi_user}
                          onChange={this.setUser}
                          onAutocomplete={this.setUser}
                          filter={null}
                      />
                    </div>
                  </div>
                  <div className="md-grid md-cell--4-offset chip_list">
                    <div>
                      {
                        this.state.chips.map((chip, i) => (
                            <Chip
                                key={i}
                                label={chip.user_data}

                                removable
                                onClick={() => {this.removeChip(i)}}
                            />
                        ))
                      }
                    </div>
                  </div>
                  <div className="md-cell--5 chip-text">{this.state.chips.length} user has been selected</div>

                  <div className="btnStore">
                    <Button type="submit" className="btnForm" raised label="submit"/>
                    <Button style={{background:'#a51010'}} onClick={this.resetForm} className="btnFormReset" raised label="Reset"/>
                  </div>
                </Form>


            </div>

            <footer>
              <script type='text/javascript' src='/static/js/react-select.js'/>
            </footer>

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
    userlist: state.coupon.formObj,
    updateuserlist: state.coupon.updateformObj,
    campaignlist: state.coupon.campaignListObj,
    updateformObj: state.coupon.updateformObj,
    isFetching:state.data.isFetching
  }
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    },
    update: (props) => {
      dispatch(actions.merge('form.coupons', props))
    },
    resetForm: () => {
      dispatch(actions.reset('form.coupons'))
    },
    getSubmitCoupAddData: (coup, headers) => {
      return dispatch(getSubmitCoupAddData(coup, headers))
    },
    getSubmitCoupUpdateData: (coup, id, headers) => {
      return dispatch(getSubmitCoupUpdateData(coup, id, headers))
    },
    getCampaign: (coup, id, headers) => {
      return dispatch(getCampaignList(coup, id, headers))
    },
    getMultiUser: (coup, headers) => {
      return dispatch(getCouponForm(coup, headers))
    },
    set: (modal, value) => {
      dispatch(actions.change(modal, value))
    },
    setErrors: (modal, value) => {
      dispatch(actions.setErrors(modal, value))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(couponFormContainer)



