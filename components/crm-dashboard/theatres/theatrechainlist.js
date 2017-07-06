import React from 'react'
import Avatar from 'react-md/lib/Avatars'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Button from 'react-md/lib/Buttons/Button'
import Pagination from 'rc-pagination'
import Select from 'react-select'
import Chip from 'react-md/lib/Chips'
import { Router } from '../../../routes'
import Loader from '../../common/pageLoader'
import $ from 'jquery'
import Radio from 'react-md/lib/SelectionControls/Radio'

let chipset = []
let noData = false
export class TheatreChainList extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            theatres: [],
            chips: [],
            searchQuery: '',
            page: null,
            current: 1,
            inlineValue:''
        }

        this._handleSearchChange = this._handleSearchChange.bind(this)
        this._handleDisableButtonTheatreChain = this._handleDisableButtonTheatreChain.bind(this)
        this._handleUnableButtonTheatreChain = this._handleUnableButtonTheatreChain.bind(this)
        this.onChange = this.onChange.bind(this)
        this.removeChip = this.removeChip.bind(this)
        this.searchEnter = this.searchEnter.bind(this)
        this._handleInlineChange=this._handleInlineChange.bind(this)

    }
    _handleInlineChange (e) {

        this.setState({inlineValue: e.target.value},()=>{
            if(this.state.inlineValue === 'open'){
                this.props.DisableButtonClickChainList()
            }else if(this.state.inlineValue === 'closed'){
                this.props.UnableButtonClickChainList()
            }else {
                this.props.theatrechainList()
            }
        })

    }

    componentWillUnmount () {
        chipset = []
    }

    componentDidMount () {
        if (typeof window === 'undefined') {
            global.window = {}
        } else {
            $(window).scroll(function () {
                let $scroll_pos = 0
                $scroll_pos = $(window).scrollTop()
                if ($scroll_pos >= 52) {
                    $('.search_top').addClass('search_fixed')
                } else {
                    $('.search_top').removeClass('search_fixed')
                }
            })
        }
    }

    componentWillMount () {
        this.setState({
            theatres: this.props.Theatre,
            page: this.props.theatrePage
        })

    }

    _handleSearchChange (target) {

        let searchval = this.refs.search.value
        this.setState({
            searchQuery: searchval
        })

        if (this.props.TheatrePage !== 0) {
            if (target.charCode === 13 && searchval !== '') {
                this.setState({
                    searchQuery: searchval
                })
                this.searchEnter(searchval)
            }
        }

    }

    // $("#search").keydown(function(event){
    //     if(event.keyCode == 13){
    //         console.log('click event');
    //
    //     }
    // });
    //
    // function searchEnter(val) {
    //     let query1 = val
    //     chipset.push(val)
    //     this.setState({
    //         chips: chipset
    //     });
    //     this.handelFilter()
    // }

    // }

    searchEnter (val) {
        if (val !== '') {
            let query1 = val
            chipset.push(val)
            this.setState({
                chips: chipset
            })
            this.handelFilter()
        }
    }

    search () {}

    removeChip (index) {

        this.refs.search.value = ''

        this.setState({
            current: 1,
        })

        chipset.splice(index, 1)
        this.setState({
            chips: chipset
        })
        this.props.filters(chipset)

    }

    handelFilter () {

        this.setState({
            current: 1,
        })
        this.props.filters(chipset,this.state.inlineValue)
    }

    selectOptions () {
        console.log('e')
    }

    _handleDisableButtonTheatreChain (id) {
        this.props.DisableButtonClickTheatreChain(id, this.props.headers)
    }

    _handleUnableButtonTheatreChain (id) {
        this.props.EnableButtonClickTheatreChain(id, this.props.headers)
    }

    // handleResendButton(id){
    //
    //     let orderService = new OrderService
    //     orderService.getResendData(id).then((response)=>{
    //         console.log(response,"AWESOME")
    //     })
    // }

    onChange (current, pageSize) {
        this.setState({
            current: current,
        },()=>{
            this.props.pagenumber(current,this.state.inlineValue)
        })
    }


    render () {

        if (this.props.Theatre !== [] || this.props.Theatre !== null) {
            noData = false
        } else {
            noData = true
        }

        return (
            <div className="page">

                <div className="content-wrapper full_tag">

                    <section className="content">

                        <h1 className="main_heading_crm">Theatre Chains</h1>

                        {/*<section className="search_top search_sec">*/}


                            {/*<div className="md-grid">*/}

                                {/*<input placeholder="search......." className="md-cell--5 search" ref="search" type="text" id="txtSearch"*/}
                                       {/*onKeyPress={this._handleSearchChange}/>*/}
                                {/*<div className="md-cell--5 chip-list">*/}
                                    {/*{*/}
                                        {/*this.state.chips.map((chip, i) => (*/}
                                            {/*<Chip*/}
                                                {/*key={i}*/}
                                                {/*label={chip}*/}
                                                {/*avatar={<Avatar random>{chip[0]}</Avatar>}*/}
                                                {/*removable*/}
                                                {/*onClick={() => {this.removeChip(i)}}*/}
                                            {/*/>*/}
                                        {/*))*/}
                                    {/*}*/}
                                {/*</div>*/}

                                {/*{noData ?*/}
                                    {/*<Button id="btnSearch" className="noDrop" style={{margin: '0 0 0 42px'}} disabled raised*/}
                                            {/*primary type="submit" label="Search"/> :*/}
                                    {/*<Button id="btnSearch"  style={{margin: '0 0 0 42px'}} raised primary*/}
                                            {/*type="submit" label="Search" onClick={() => {this.searchEnter(this.refs.search.value)}}/>}*/}
                            {/*</div>*/}
                        {/*</section>*/}
                        <div className="md-grid payment_filters">
                            <fieldset className=" md-cell md-cell--4 fields" onChange={this._handleInlineChange}>
                                <Radio
                                    id="inlineRadio1"
                                    inline
                                    name="inlineRadios"
                                    value=""
                                    label="All"
                                    checked={this.state.inlineValue===''}
                                />
                                <Radio
                                    id="inlineRadio1"
                                    inline
                                    name="inlineRadios"
                                    value="closed"
                                    label="Enabled"
                                    checked={this.state.inlineValue==='closed'}
                                />
                                <Radio
                                    id="inlineRadio2"
                                    inline
                                    name="inlineRadios"
                                    value="open"
                                    label="Disabled"
                                    checked={this.state.inlineValue==='open'}
                                />
                            </fieldset>
                        </div>
                        <div className="shadow ">
                            {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
                            <DataTable plain>
                                <TableHeader >
                                    <TableRow>
                                        <TableColumn>Id</TableColumn>
                                        <TableColumn>Source</TableColumn>
                                        <TableColumn>Enable/Disable</TableColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        this.props.Theatre.map((theatre, i) => (
                                            <TableRow key={i}>
                                                <TableColumn>{theatre.id}</TableColumn>
                                                <TableColumn>{theatre.source}</TableColumn>
                                                <TableColumn>{theatre.enabled !== true ?
                                                    <Button style={{background: 'rgba(18, 85, 115, 0.9)'}} onClick={() => {this._handleUnableButtonTheatreChain(theatre.id)}} primary raised
                                                            label="Enable"/> :
                                                    <Button style={{background:'rgba(35, 109, 142, 0.5)'}} onClick={() => {this._handleDisableButtonTheatreChain(theatre.id)}} primary raised
                                                            label="Disable"/>}</TableColumn>
                                            </TableRow>))
                                    }

                                </TableBody>
                            </DataTable>
                            {noData &&
                            <div className="NotFound"><p><span className="wdata">No data Found</span><span className="smile">:(</span>
                            </p></div>}
                        </div>

                    </section>


                </div>
                <style jsx>{``}</style>
            </div>
        )
    }
}

export  default  TheatreChainList
