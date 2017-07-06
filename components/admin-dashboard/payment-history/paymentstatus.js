import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import {Router} from '../../../routes'
import Loader from '../../common/pageLoader'
import Dialog from 'react-md/lib/Dialogs'
import Autocomplete from 'react-md/lib/Autocompletes'
import Radio from 'react-md/lib/SelectionControls/Radio'
import Chip from 'react-md/lib/Chips'
import Avatar from 'react-md/lib/Avatars'
import Pagination from 'rc-pagination'
import Select from 'react-select'
import SelectField from 'react-md/lib/SelectFields'
import {scrollup} from '../../common/scrollup'
import PropTypes from 'prop-types'


let noData = false
let chipset = []
let searchquery = ''
const controls = [{
    value: 'due',
    label: 'Due',
}, {
    value: 'paid',
    label: 'Paid',
}]
let status = ''
let amountType = ''
let reset_btn_show = false;

export class PaymentStatus extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            visible: false,
            searchQuery: '',
            chips: [],
            value: controls[0].value,
            inlineValue: '',
            paymentHistory: {},
            current_page: 1,
            amountType: '',
        }

        this.closeDialog = this.closeDialog.bind(this)
        this._handleSearchChange = this._handleSearchChange.bind(this)
        this.removeChip = this.removeChip.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this._handleInlineChange = this._handleInlineChange.bind(this)
        this._handlePageChange = this._handlePageChange.bind(this)
        this.check_payment_status = this.check_payment_status.bind(this)
        this._handleAmountType = this._handleAmountType.bind(this)


    }

    componentDidMount() {
        this.setState({
            loaded: true,
        })
    }

    viewPaidDetail(payment_history) {
        this.setState({
            paymentHistory: payment_history
        })
        this.openDialog()
    }

    openDialog() {
        this.setState({visible: true})
    };

    closeDialog() {
        this.setState({visible: false})
    };

    _handleSearchChange(value) {
        if (typeof value !== 'undefined') {
            this.setState({
                searchQuery: value
            })
        }
    }

    _handleAmountType(value) {

        this.setState({
            amountType: value
        })

    }

    filterByAmountType() {
        reset_btn_show = true;
        let report_type = '?report_type=' + this.state.amountType
        amountType = '&report_type=' + this.state.amountType
        console.log(status, searchquery, "==========")
        this.props.filterByType(report_type + status + searchquery)

    }

    pageChange(val) {
        let payment_status = '&payment_status=' + this.state.inlineValue
        let query = '?page=' + val + searchquery + payment_status + amountType
        this.props.pagenate(query)
    }

    _handlePageChange(current, pageSize) {
        this.setState({
            current_page: current
        })
        this.pageChange(current)
    }

    searchOrder() {
        if (this.state.searchQuery !== '') {
            if (chipset.indexOf(this.state.searchQuery) === -1) {
                chipset.push(this.state.searchQuery)
                this.setState({
                    chips: chipset
                })

                this.search(chipset)
            }
        }
    }

    removeChip(index) {
        chipset.splice(index, 1)
        this.setState({
            chips: chipset,
            searchQuery: ''
        })
        this.search(chipset)
    }

    search(val) {
        if (chipset.length === 0) {
            if (amountType === '') {
                reset_btn_show = false
            }
            else {
                reset_btn_show = true
            }
        }
        else {
            reset_btn_show = true
        }
        searchquery = ''
        let query = ''
        let str = ''
        if (val.length === 0) {
            query = '?search='
        }
        else {
            query = ''
            for (let i = 0; i < val.length; i++) {
                if (val.length === 1) {
                    str += '?search=' + val[i]
                    searchquery += '&search=' + val[i]
                }
                else {
                    if (i === 0) {
                        str += '?search=' + val[i]
                        searchquery += '&search=' + val[i]
                    }
                    else {
                        str += ',' + val[i]
                        searchquery += ',' + val[i]
                    }
                }
            }
            query = str
        }
        this.props.searchHistory(query + status + amountType)
    }

    _handleChange(value) {
        this.setState({value})
    }

    _handleInlineChange(e) {
        this.setState({inlineValue: e.target.value})
        this.filter(e.target.value)
    }

    filter(Status) {
        reset_btn_show = true
        let payment_status = '?payment_status=' + Status
        status = '&payment_status=' + Status
        this.props.filter(payment_status + amountType + searchquery)
    }

    check_payment_status(report) {
        if (report.payment_status === 'paid' && report.payment_history.length !== 0) {
            return [<TableColumn key="1">{report.payment_history[0].reference_number}</TableColumn>,
                <TableColumn key="2">{report.payment_history[0].payment_date}</TableColumn>,
                <TableColumn key="3"><Button onClick={() => {
                    this.viewPaidDetail(report.payment_history[0])
                }} primary raised label="View Detail"/></TableColumn>]
        }
        else {
            return [<TableColumn key="1"></TableColumn>,
                <TableColumn key="2"></TableColumn>,
                <TableColumn key="3"></TableColumn>]
        }
    }

    resetAllFilter() {
        reset_btn_show = false;
        searchquery = ''
        this.setState({
            inlineValue: '',
            searchQuery: '',
            chips: [],
            amountType: ''
        }, () => {
            status = ''
            amountType = ''
            searchquery = ''
            chipset = []
            this.props.resetAllFilter()
        })

    }

    componentWillUnmount() {
        chipset = []
        searchquery = ''
        reset_btn_show = false
        status = ''


    }

    render() {
        let amount_type = ['ticket', 'commission']

        if ((typeof this.props.paymentStatus.results === 'undefined') || (this.props.paymentStatus.results.length === 0)) {
            noData = true
        } else {
            if (this.props.paymentStatus.results.length === 0) {
                noData = true
            }
            else {
                noData = false
            }
        }
        const {inlineValue} = this.state

        return (
            <div className="page payment_status">
                <section >
                    <h2 className="main_heading">Payment Details</h2>
                    <section className="md-grid payment_filters">
                        <Autocomplete
                            id="search"
                            label="Search"
                            className="md-cell md-cell--4"
                            onChange={this._handleSearchChange}
                            data={[]}
                            value={this.state.searchQuery}
                        />
                        <div className=" md-cell md-cell--4">
                            <Button className="search_btn" raised primary type="submit" label="Search" onClick={() => {
                                this.searchOrder()
                            }}/>
                            {
                                (reset_btn_show === true) ?
                                    <Button className="search_btn reset_filter" raised type="reset" label="Reset All"
                                            onClick={() => {
                                                this.resetAllFilter()
                                            }}/> : <span></span>
                            }
                        </div>
                        <div className=" md-cell md-cell--4 chip-list">
                            {
                                this.state.chips.map((chip, i) => (
                                    <Chip
                                        key={i}
                                        label={chip}
                                        avatar={<Avatar random>{chip[0]}</Avatar>}
                                        removable
                                        onClick={() => {
                                            this.removeChip(i)
                                        }}
                                    />
                                ))
                            }

                        </div>

                    </section>
                    <section className="md-grid amount_type">
                        <SelectField
                            id="states"
                            label="Select Amount Type"
                            placeholder="Select Amount Type"
                            menuItems={amount_type}
                            itemLabel="name"
                            itemValue="abbreviation"
                            value={this.state.amountType}
                            defaultValue={'ticket'}
                            className="md-cell"
                            helpOnFocus
                            helpText="Select Amount Type"
                            onChange={this._handleAmountType}
                        />
                        <Button className="filter_btn" raised primary type="submit" label="Filter" onClick={() => {
                            this.filterByAmountType()
                        }}/>
                    </section>

                    {((this.props.user !== null) && (this.props.user.group !== null) && (this.props.user.group.indexOf('SuperAdmin') > -1)) ?
                        <div></div> : <div className="md-grid payment_filters">
                            <fieldset className=" md-cell md-cell--2 fields" onChange={this._handleInlineChange}>
                                <Radio
                                    id="inlineRadio1"
                                    inline
                                    name="inlineRadios"
                                    value="due"
                                    label="Due"
                                    checked={inlineValue === 'due'}
                                />
                                <Radio
                                    id="inlineRadio2"
                                    inline
                                    name="inlineRadios"
                                    value="paid"
                                    label="Paid"
                                    checked={inlineValue === 'paid'}
                                />
                            </fieldset>
                        </div>
                    }

                    {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
                    <div className="payment_table">
                        <DataTable plain>
                            <TableHeader >
                                <TableRow>
                                    <TableColumn >Partner Name</TableColumn>
                                    {((this.props.user !== null) && (this.props.user.group !== null) && (this.props.user.group.indexOf('SuperAdmin') > -1)) ?
                                        <TableColumn >Batch Name</TableColumn> : <TableColumn ></TableColumn>}
                                    <TableColumn >Amount Type</TableColumn>
                                    <TableColumn >Payment Amount</TableColumn>
                                    <TableColumn >Payment Status</TableColumn>
                                    <TableColumn >Reference Number</TableColumn>
                                    <TableColumn >Date of Payment</TableColumn>
                                    <TableColumn >View Details</TableColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {this.props.paymentStatus.results.map((report, i) => (
                                    <TableRow key={i}>
                                        <TableColumn
                                            className="adjust_column">{report.movie_partner_title}</TableColumn>
                                        {((this.props.user !== null) && (this.props.user.group !== null) && (this.props.user.group.indexOf('SuperAdmin') > -1)) ?
                                            <TableColumn >{report.batch_name}</TableColumn> :
                                            <TableColumn ></TableColumn>}
                                        <TableColumn>{report.amount_type}</TableColumn>
                                        <TableColumn>{report.payable_amount}</TableColumn>
                                        <TableColumn
                                            style={{textTransform: 'capitalize'}}>{report.payment_status}</TableColumn>

                                        {this.check_payment_status(report)}
                                    </TableRow>))
                                }
                            </TableBody>
                        </DataTable>
                    </div>
                    {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
                        className="smile">:(</span></p></div>}
                    <div className="pagenation">
                        <Pagination
                            selectComponentClass={Select}
                            defaultPageSize={10}
                            defaultCurrent={1}
                            current={this.state.current_page}
                            onChange={this._handlePageChange}
                            total={this.props.paymentStatus.count}
                        />
                    </div>
                    <Dialog
                        id="speedBoost"
                        visible={this.state.visible}
                        title="Payment Detail"
                        dialogStyle={{width: '40%', overflowX: 'hidden'}}
                        onHide={this.closeDialog}
                        aria-labelledby="speedBoostDescription"
                        modal
                        actions={[{
                            onClick: this.closeDialog,
                            primary: true,
                            label: 'close',
                        },]}>
                        {(typeof this.state.paymentHistory.reference_number !== 'undefined') ?
                            <div id="speedBoostDescription" className="md-color--secondary-text">
                                <p><span className="report_heading">Reference Number </span><span
                                    className="report_value">: {this.state.paymentHistory.reference_number}</span></p>
                                <p><span className="report_heading">Payment Method </span><span
                                    className="report_value">: {this.state.paymentHistory.payment_method}</span></p>
                                <p><span className="report_heading">Amount Paid</span><span
                                    className="report_value">: {this.state.paymentHistory.amount_paid}</span></p>
                                <p><span className="report_heading">Customer Reference Number</span><span
                                    className="report_value">: {this.state.paymentHistory.customer_ref_no}</span></p>
                                <p><span className="report_heading">Instrument Reference Number</span><span
                                    className="report_value">: {this.state.paymentHistory.instrument_ref_no}</span></p>
                                <p><span className="report_heading">Date Of Payment</span><span
                                    className="report_value">: {this.state.paymentHistory.date}</span></p>
                                <p><span className="report_heading">Status</span><span
                                    className="report_value">: {this.state.paymentHistory.status}</span></p>
                            </div> : <div></div>
                        }
                    </Dialog>
                </section>
                <style jsx>{`

                    `}
                </style>
                {scrollup}
            </div>
        )
    }
}
PaymentStatus.propTypes = {
    paymentStatus: PropTypes.object,
    user: PropTypes.object,
    viewPaidDetail: PropTypes.func,
    searchHistory: PropTypes.func,
    filter: PropTypes.func,
    pagenate: PropTypes.func,
    resetAllFilter: PropTypes.func,
    paidReportDetail: PropTypes.array,
    current_page: PropTypes.number,
    filterByType: PropTypes.func
};

export  default  PaymentStatus