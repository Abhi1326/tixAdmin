/**
 * Created by consultadd on 6/2/17.
 */
import Link from 'next/link'
import Head from 'next/head'
import { PureComponent } from 'react'
import Avatar from 'react-md/lib/Avatars'
import FontIcon from 'react-md/lib/FontIcons'
import ListItem from 'react-md/lib/Lists/ListItem'
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import { Router } from '../../routes'
import NProgress from 'nprogress'
import nextRouter from 'next/router'
import TooltipLink from './TooltipLink'
import { logout } from '../../actions/authActions'
import { connect } from 'react-redux'

nextRouter.onRouteChangeStart = (url) => {

  NProgress.start()
}
nextRouter.onRouteChangeComplete = () => NProgress.done()
nextRouter.onRouteChangeError = () => NProgress.done()

class NavigationLink extends PureComponent {

  render () {
    const {href, as, children, ..._props} = this.props
    return (
      <div {..._props} style={{padding: 0}}>
        <Link href={href} as={as}>
          <a className='md-list-tile md-list-tile--mini' style={{width: '100%', overflow: 'hidden'}}>

            {children}
          </a>
        </Link>

      </div>
    )
  }
}
class NavigationWithoutLink extends PureComponent {

  render () {
    const {as, children, ..._props} = this.props
    return (
      <div {..._props} style={{padding: 0}}>

        <a className='md-list-tile md-list-tile--mini' style={{width: '100%', overflow: 'hidden'}}>

          {children}
        </a>


      </div>
    )
  }
}
export class Layout extends PureComponent {

  constructor (props) {

    super()
    super(props)
    this.state = {
      isOpen: false
    }

    this._logout = this._logout.bind(this)
    this._handleOpen = this._handleOpen.bind(this)
  }

  _handleOpen () {
    this.setState({
      isOpen: !this.state.isOpen
    })

  }

  componentDidMount () {

  }

  _logout () {
    this.props.logout()
  }

  render () {
    let userType
    let avatarPhone
    let avatarEmail
    let avatarName

    if (this.props.user !== null && typeof this.props.user.group !== 'undefined' && typeof this.props.user.userDetail !== 'undefined') {
      if (this.props.user.group.indexOf('SuperAdmin') !== -1) {
        userType = 'SuperAdmin'
      }
      else if (this.props.user.group.indexOf('CrmAdmin') !== -1) {
        if (this.props.user.group.indexOf('CinemaAdmin') !== -1) {
          userType = 'CinemaAdmin'
        }
        else {
          userType = 'CrmAdmin'
        }
      }
      else if (this.props.user.group.indexOf('CinemaAdmin') !== -1) {
        userType = 'CinemaAdmin'
      }
      else if (this.props.user.group.indexOf('EventAdmin') !== -1) {
          userType = 'EventAdmin'
      }


        avatarPhone = this.props.user.userDetail.phone
      avatarEmail = this.props.user.userDetail.email
      avatarName = this.props.user.userDetail.username
    }
    const drawerRightHeaderChildren = [

      <Avatar key="1"
              role='presentation'
              iconSized
              style={{alignSelf: 'center', marginLeft: 16, marginRight: 16, flexShrink: 0, marginTop: '18px'}}
      >{String(avatarName).charAt(0).toUpperCase()}</Avatar>,
      <a
        key="2"
        style={{
          float: 'right',
          fontSize: '14px',
          marginRight: '20px',
          textAlign: 'center',
          marginTop: '20px',
          cursor: 'pointer',
          color: 'white',
          fontWeight: '600',
        }}
        onClick={this._logout}

      >Logout</a>,
      <p key="3"
         style={{
           float: 'right',
           fontSize: '14px',
           marginRight: '20px',
           textAlign: 'center',
           marginTop: '20px',
           textTransform: 'capitalize',
           color: 'white',
           fontWeight: '600'
         }}
      >{avatarName}</p>

    ]
    const drawerHeaderChildren = [
      <Avatar key="1"
              role='presentation'
              iconSized
              style={{alignSelf: 'center', marginLeft: 5, marginRight: 0, flexShrink: 0, marginTop: '3px'}}
      >{String(avatarName).charAt(0).toUpperCase()}</Avatar>,
      <p key="2" style={{
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 8,
        flexShrink: 0,
        fontSize: 13,
        marginTop: 11
      }}>{avatarEmail}</p>

    ]

    let nav_type

    if (userType === 'SuperAdmin') {
      nav_type = <NavigationDrawer
        navItems={[
          <ListItem
            key='0'
            component={NavigationLink}
            href='/dashboard'
            leftIcon={<TooltipLink
              tooltipLabel="Dashboard" tooltipPosition="right"><FontIcon>inbox</FontIcon></TooltipLink>
            }
            tileClassName='md-list-tile--mini'
            primaryText={'Dashboard'}

          />,
          <ListItem
            key='1'
            component={NavigationLink}
            href='/movieOrder'
            leftIcon={<TooltipLink
              tooltipLabel="Cinema Dashboard"
              tooltipPosition="right"><FontIcon>movie</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Cinema Dashboard'}
          />,
          <ListItem
            key='2'
            component={NavigationWithoutLink}
            leftIcon={<TooltipLink
              tooltipLabel="Crm Dashboard"
              tooltipPosition="right"><FontIcon>supervisor_account</FontIcon></TooltipLink>}
            expanderIconChildren={<FontIcon>keyboard_arrow_down</FontIcon>}
            isOpen={this.state.isOpen}
            onClick={this._handleOpen}
            nestedItems={[
                <ListItem
                    key='0'
                    component={NavigationLink}
                    href='/coupon'
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Coupons"
                                           tooltipPosition="right"><FontIcon>local_offer</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Coupons'}
                />,
                <ListItem
                    key='1'
                    component={NavigationLink}
                    href="/campaign"
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Campaign"
                                           tooltipPosition="right"><FontIcon>group_add</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Campaign'}
                />,
                <ListItem
                    key='2'
                    component={NavigationLink}
                    href='/show'
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Shows"
                                           tooltipPosition="right"><FontIcon>slideshow</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Shows'}
                />,
                <ListItem
                    key='3'
                    component={NavigationLink}
                    href="/transaction"
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Transactions" tooltipPosition="right"><FontIcon>attach_money</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Transactions'}
                />,
                <ListItem
                    key='4'
                    component={NavigationLink}
                    href="/theatre"
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Theatres"
                                           tooltipPosition="right"><FontIcon>theaters</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Theatres'}
                />,
                <ListItem
                    key='5'
                    component={NavigationLink}
                    href="/theatrechain"
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Theatre chains"
                                           tooltipPosition="right"><FontIcon>featured_play_list</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Theatre chains'}
                />,
                <ListItem
                    key='6'
                    component={NavigationLink}
                    href="/order"
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Movie Order"
                                           tooltipPosition="right"><FontIcon>settings_input_svideo</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Movie Order'}
                />,
                <ListItem
                    key='7'
                    component={NavigationLink}
                    href='/eventorder'
                    leftIcon={<TooltipLink href=""
                                           tooltipLabel="Event Order"
                                           tooltipPosition="right"><FontIcon>event_seat</FontIcon></TooltipLink>}
                    tileClassName='md-list-tile--mini'
                    primaryText={'Event Order'}
                />,
            ]}
            tileClassName='md-list-tile--mini'
            primaryText={'Crm Dashboard'}
          />,

          <ListItem
            key='3'
            component={NavigationLink}
            href="/paymenthistory"
            leftIcon={<TooltipLink
              tooltipLabel="Payment History"
              tooltipPosition="right"><FontIcon>payment</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Payment History'}
          />,

        ]}
        contentClassName='md-grid'
        drawerHeaderChildren={drawerHeaderChildren }
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle='Tixdo-Admin'
        toolbarActions={drawerRightHeaderChildren}
      >
        { this.props.children }
      </NavigationDrawer>

    }
    if (userType === 'CinemaAdmin') {
      nav_type = <NavigationDrawer
        navItems={[

          <ListItem
            key='0'
            component={NavigationLink}
            href='/movieOrder'
            leftIcon={<TooltipLink
              tooltipLabel="Dashboard"
              tooltipPosition="right"><FontIcon>dashboard</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Dashboard'}

          />,
          <ListItem
            key='1'
            component={NavigationLink}
            href="/perordertransaction"
            leftIcon={<TooltipLink
              tooltipLabel="Order Detail Report"
              tooltipPosition="right"><FontIcon>receipt</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Order Detail Report'}
          />,
          <ListItem
            key='2'
            component={NavigationLink}
            href="/theatrereportpage"
            leftIcon={<TooltipLink
              tooltipLabel="Theatre Detail Report"
              tooltipPosition="right"><FontIcon>theaters</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Theatre Detail Report'}
          />,
          <ListItem
            key='3'
            component={NavigationLink}
            href="/paymenthistory"
            leftIcon={<TooltipLink
              tooltipLabel="Payment History"
              tooltipPosition="right"><FontIcon>payment</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Payment History'}
          />,

        ]}
        contentClassName='md-grid'
        drawerHeaderChildren={drawerHeaderChildren}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle='Tixdo-Admin'
        toolbarActions={drawerRightHeaderChildren}
      >
        { this.props.children }
      </NavigationDrawer>
    }
    if (userType === 'CrmAdmin') {

      nav_type = <NavigationDrawer
        navItems={[

          <ListItem
            key='0'
            component={NavigationLink}
            href='/coupon'
            leftIcon={<TooltipLink href=""
                                   tooltipLabel="Coupons"
                                   tooltipPosition="right"><FontIcon>local_offer</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Coupons'}
          />,
          <ListItem
            key='1'
            component={NavigationLink}
            href="/campaign"
            leftIcon={<TooltipLink href=""
                                   tooltipLabel="Campaign"
                                   tooltipPosition="right"><FontIcon>group_add</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Campaign'}
          />,
          <ListItem
            key='2'
            component={NavigationLink}
            href='/show'
            leftIcon={<TooltipLink href=""
                                   tooltipLabel="Shows"
                                   tooltipPosition="right"><FontIcon>slideshow</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Shows'}
          />,
          <ListItem
            key='3'
            component={NavigationLink}
            href="/transaction"
            leftIcon={<TooltipLink href=""
                                   tooltipLabel="Transactions" tooltipPosition="right"><FontIcon>attach_money</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Transactions'}
          />,
          <ListItem
            key='4'
            component={NavigationLink}
            href="/theatre"
            leftIcon={<TooltipLink href=""
                                   tooltipLabel="Theatres"
                                   tooltipPosition="right"><FontIcon>theaters</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Theatres'}
          />,
            <ListItem
                key='5'
                component={NavigationLink}
                href="/theatrechain"
                leftIcon={<TooltipLink href=""
                                       tooltipLabel="Theatre chains"
                                       tooltipPosition="right"><FontIcon>featured_play_list</FontIcon></TooltipLink>}
                tileClassName='md-list-tile--mini'
                primaryText={'Theatre chains'}
            />,
          <ListItem
            key='6'
            component={NavigationLink}
            href="/order"
            leftIcon={<TooltipLink href=""
                                   tooltipLabel="Movie Order"
                                   tooltipPosition="right"><FontIcon>settings_input_svideo</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Movie Order'}
          />,
          <ListItem
            key='7'
            component={NavigationLink}
            href='/eventorder'
            leftIcon={<TooltipLink href=""
                                   tooltipLabel="Event Order"
                                   tooltipPosition="right"><FontIcon>event_seat</FontIcon></TooltipLink>}
            tileClassName='md-list-tile--mini'
            primaryText={'Event Order'}
          />,

        ]}
        contentClassName='md-grid'
        drawerHeaderChildren={drawerHeaderChildren}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle='Tixdo-Admin'
        toolbarActions={drawerRightHeaderChildren}
      >
        { this.props.children }
      </NavigationDrawer>
    }
    if (userType === 'EventAdmin') {

          nav_type = <NavigationDrawer
              navItems={[
                  <ListItem
                      key='7'
                      component={NavigationLink}
                      href='/eventdashboard'
                      leftIcon={<TooltipLink href=""
                                             tooltipLabel="Event Order"
                                             tooltipPosition="right"><FontIcon>star</FontIcon></TooltipLink>}
                      tileClassName='md-list-tile--mini'
                      primaryText={'Event Dashboard'}
                  />
              ]}
              contentClassName='md-grid'
              drawerHeaderChildren={drawerHeaderChildren}
              tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              toolbarTitle='Tixdo-Admin'
              toolbarActions={drawerRightHeaderChildren}
          >
              { this.props.children }
          </NavigationDrawer>
      }


    return (
      <div style={{backgroundColor: '#e4e2e2'}}>
        <Head>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <link rel="apple-touch-icon" href="https:s3.amazonaws.com/tixdotest/images/favicon.png"/>
          <link rel="icon" href="https://s3.amazonaws.com/tixdotest/images/favicon.png" type="image/png"/>
          <link rel="shortcut icon" href="https://s3.amazonaws.com/tixdotest/images/favicon.png" type="image/x-icon"/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'/>
          <link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons'/>
          <link rel='stylesheet' href='/static/css/react-md.light_blue-yellow.min.css'/>
          <link rel='stylesheet' href='/static/css/base.css'/>
          <link rel='stylesheet' href='/static/css/customScroll.css'/>
          <link rel='stylesheet' href='/static/css/pagination.css'/>
          <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css'/>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet"/>
        </Head>

        {nav_type}


        <footer>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"/>
          <script type="text/javascript"
                  src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"/>
          <script src="https://unpkg.com/classnames/index.js"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"/>
        </footer>

        <style jsx>{`

                    body{
                       margin: 0;
                       padding: 0;
                       border: 0;
                    }


                    main {
                      display: -webkit-box;
                      display: -moz-box;
                      display: -webkit-flex;
                      display: -ms-flexbox;
                      display: box;
                      display: flex;
                      -webkit-box-orient: vertical;
                      -moz-box-orient: vertical;
                      -o-box-orient: vertical;
                      -webkit-flex-direction: column;
                      -ms-flex-direction: column;
                      flex-direction: column;
                      min-height: 100%;
                    }


      `}</style>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {

    user: state.auth.user
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
