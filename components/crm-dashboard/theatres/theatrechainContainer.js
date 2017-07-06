import React, { Component } from 'react'
import { TheatreChainList } from './theatrechainlist'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { DisableTheatreChain, EnableTheatreChain, getFilteredTheatres,DisableButtonClickChainList,UnableButtonClickChainList,getTheatreChain } from '../../../actions/theatreActions'
import { logout } from '../../../actions/authActions'
import Head from 'next/head'

let searchQuery = ''
class TheatreChainContainer extends Component {

    constructor (props) {
        super(props)
        this.state = {
            theatreList: [],
            theatrePage: 0,
            page: 1
        }

        this.pageChange = this.pageChange.bind(this)
        this.filter = this.filter.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentWillMount () {

    }

    componentDidMount () {
        this.setState({
            theatreList: this.props.TheatreList,
            theatrePage: this.props.Page
        })
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            theatreList: newProps.TheatreList,
            theatrePage: newProps.Page
        })
    }

    pageChange (val,val2) {
        let query = '?page=' + val + searchQuery
        this.props.getFilteredTheatres(query,val2, this.props.headers)
    }



    filter (val1,val2) {

        if (val1.length === 0) {
            let query = '?search='
            this.props.getFilteredTheatres(query,val2, this.props.headers)
        } else {

            let query = ''
            let str = ''
            for (let i = 0; i < val1.length; i++) {
                if (val1.length === 1) {
                    str += '?search=' + val1[i]
                    searchQuery = '&search=' + val1[i]
                }
                else {
                    str = ''
                    if (i === 0) {
                        str += '?search=' + val1[i]
                        searchQuery = '&search=' + val1[i]
                    } else {
                        str += ',' + val1[i]
                        searchQuery += ',' + val1[i]
                    }

                }
                query += str
            }
            this.props.getFilteredTheatres(query,val2, this.props.headers)
        }
    }


    logout () {
        this.props.logout()
    }

    render () {

        return (
            <div>
                <Head>
                    <title>Theatres</title>
                    <link rel='stylesheet' href='/static/css/theatre.css'/>
                </Head>
                <div className="hold-transition skin-blue sidebar-mini">
                    <div className="wrapper">

                        <Layout >
                            <TheatreChainList
                                Theatre={this.props.TheatreList}
                                TheatrePage={this.props.Page}
                                pagenumber={this.pageChange}
                                filters={this.filter}
                                filterChain={this.filterChain}
                                isFetching={this.props.isFetching}
                                page={this.state.page}
                                DisableButtonClickTheatreChain={this.props.DisableButtonClickChain}
                                DisableButtonClickChainList={this.props.DisableButtonClickChainList}
                                UnableButtonClickChainList={this.props.UnableButtonClickChainList}
                                EnableButtonClickTheatreChain={this.props.EnableButtonClickChain}
                                theatrechainList={this.props.theatrechainList}
                                headers={this.props.headers}/>
                        </Layout>


                    </div>


                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        TheatreList: state.theatre.theatreObj.results || [],
        Page: state.theatre.theatreObj.count || 0,
        isFetching: state.data.isFetching
    }

    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFilteredTheatres: (query, headers) => {
            dispatch(getFilteredTheatres(query, headers))
        },

        logout: () => {
            dispatch(logout())
        },
        DisableButtonClickChain: (id, headers) => {
            dispatch(DisableTheatreChain(id, headers))
        },
        EnableButtonClickChain: (id, headers) => {
            dispatch(EnableTheatreChain(id, headers))
        },
        UnableButtonClickChainList: (headers) => {
            dispatch(UnableButtonClickChainList(headers))
        },
        DisableButtonClickChainList: ( headers) => {
            dispatch(DisableButtonClickChainList( headers))
        },
        theatrechainList: ( headers) => {
            dispatch(getTheatreChain(headers))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheatreChainContainer)
