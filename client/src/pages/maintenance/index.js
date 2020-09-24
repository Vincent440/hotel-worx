import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Header from '../../components/header'
import api from '../../utils/api'
import moment from 'moment'
import Table from 'react-bootstrap/Table'
import DateRange from '../../components/date_range/date_range_org'

class Maintenance extends Component {
  constructor () {
    super()
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  state = {
    roomNumber: '',
    startDateRange: '',
    endDay: '',
    issue: '',
    newIssue: false,
    updateIssue: false,
    roomId: '',
    issueId: '',
    issuesArray: [],
    roomsArray: []
  }

  showFromMonth () {
    const { from, to } = this.state
    if (!from) {
      return
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from)
    }
  }
  handleFromChange (startDateRange) {
    this.setState({ startDateRange })
  }
  handleToChange (endDay) {
    this.setState({ endDay }, this.showFromMonth)
  }
  handleChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  handleUpdate (i) {
    this.setState({ startDateRange: '', endDay: '' }, () => {
      this.setState({
        updateIssue: true,
        issueId: this.state.issuesArray[i].room_issue_id,
        roomNumber: this.state.issuesArray[i].room_num,
        startDateRange: new Date(this.state.issuesArray[i].start_date),
        endDay: new Date(this.state.issuesArray[i].end_date),
        issue: this.state.issuesArray[i].issue,
        roomId: this.state.issuesArray[i].room_id
      })
    })
  }
  updateFixed (id) {
    this.clearStateIssueInfo()
    api
      .updateRoomIssuesFixed(id)
      .then(() => this.makeAxiosCall())
      .catch(err => console.log(err))
  }
  clearStateIssueInfo () {
    this.setState({
      newIssue: false,
      updateIssue: false,
      issueId: '',
      roomNumber: '',
      startDateRange: '',
      endDay: '',
      issue: '',
      roomId: ''
    })
  }
  handleCheckChange = event => {
    event.target.name === 'newIssue' &&
      this.setState({
        newIssue: !this.state.newIssue,
        startDateRange: '',
        endDay: ''
      })
    event.target.name === 'updateIssue' && this.clearStateIssueInfo()
  }
  makeAxiosCall = () => {
    api
      .getRoomIssues()
      .then(res => this.setState({ issuesArray: res }))
      .catch(err => console.log(err))
  }
  componentDidMount () {
    api
      .getRoomsIdNum()
      .then(res => this.setState({ roomsArray: res }))
      .catch(err => console.log(err))
    this.makeAxiosCall()
  }
  handleFormSubmit = event => {
    event.preventDefault()
    let values = [
      this.state.issue,
      this.props.user.user_id,
      moment(this.state.startDateRange).format('YYYY-MM-DD'),
      moment(this.state.endDay).format('YYYY-MM-DD')
    ]
    let matchingRoom = this.state.roomsArray.filter(
      room => room.room_num === this.state.roomNumber
    )
    if (matchingRoom.length === 1) {
      values.unshift(matchingRoom[0].room_id)
      if (this.state.newIssue) {
        api
          .createRoomIssue(values)
          .then(() => this.makeAxiosCall())
          .catch(err => console.log(err))
          .then(() => this.clearStateIssueInfo())
      } else if (this.state.updateIssue) {
        api
          .updateRoomIssues(this.state.issueId, values)
          .then(() => this.makeAxiosCall())
          .catch(err => console.log(err))
          .then(() => this.clearStateIssueInfo())
      }
    }
  }

  render () {
    return (
      <>
        <Header>MAINTENANCE</Header>
        <Card body>
          <Row>
            <Col xl={3}>
              <strong>
                {this.state.updateIssue
                  ? 'Update Selected Issue'
                  : 'Add New Work Order'}
              </strong>
            </Col>
            <Col xl={5}>
              <input
                type='checkbox'
                name={this.state.updateIssue ? 'updateIssue' : 'newIssue'}
                checked={
                  this.state.updateIssue
                    ? this.state.updateIssue
                    : this.state.newIssue
                }
                onChange={this.handleCheckChange}
              />
            </Col>
          </Row>
          {(this.state.newIssue || this.state.updateIssue) && (
            <Row>
              <Col xl={12}>
                <Row>
                  <Col xs={6} sm={5} md={4} lg={2} xl={2}>
                    Room Number
                  </Col>
                  <Col xs={6} sm={6} md={4} lg={2} xl={2}>
                    <input
                      onChange={this.handleChange}
                      name='roomNumber'
                      placeholder='Room Number'
                      value={this.state.roomNumber}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={5} md={4} lg={2} xl={2}>
                    Date
                  </Col>
                  <Col xs={6} sm={6} md={8} lg={8} xl={8}>
                    <DateRange
                      handleFromChange={this.handleFromChange}
                      handleToChange={this.handleToChange}
                      from={this.state.startDateRange}
                      to={this.state.endDay}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={5} md={4} lg={2} xl={2}>
                    Problem
                  </Col>
                  <Col xs={6} sm={6} md={5} lg={5} xl={5}>
                    <textarea
                      type='text'
                      name='issue'
                      value={this.state.issue}
                      onChange={this.handleChange}
                    ></textarea>
                  </Col>
                  <Col xs={6} sm={6} md={4} lg={2} xl={2}></Col>
                  <Col xs={6} sm={6} md={4} lg={2} xl={2}>
                    <button
                      type='button'
                      className='btn btn-success'
                      onClick={this.handleFormSubmit}
                    >
                      Submit
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}

          <Row>
            <Col xl={12}>
              <Table>
                <tbody>
                  <tr>
                    <th>Room Number</th>
                    <th>Room Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Problem</th>
                    <th></th>
                    <th></th>
                  </tr>
                  {this.state.issuesArray.map((issue, i) => (
                    <tr key={issue.room_issue_id}>
                      <td>{issue.room_num}</td>
                      <td>{issue.type}</td>
                      <td>{moment(issue.start_date).format('YYYY-MM-DD')}</td>
                      <td>{moment(issue.end_date).format('YYYY-MM-DD')}</td>
                      <td>{issue.issue}</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-success'
                          name='issueId'
                          onClick={() => this.handleUpdate(i)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-success'
                          onClick={() => this.updateFixed(issue.room_issue_id)}
                        >
                          Fixed
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}

export default Maintenance
