import React, { Component } from 'react';
import './main.css';

import axios from 'axios';

class view extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      date: "",
    }
  }

  componentWillMount() {
    const boardid = this.props.match.params.data;

    this._getData(boardid);
    this._addViewCnt(boardid);
  }

  _getData = async function (boardid) {
    const getData = await axios('/get/board_data', {
      method: 'POST',
      headers: new Headers(),
      data: { id: boardid }
    });

    // 날짜 구하기
    const date = getData.data[0].date.slice(0, 10) + ' ' + getData.data[0].date.slice(11, 16);

    return this.setState({ data: getData, date: date })
  }

  _addViewCnt = async function (boardid) {
    const addView = await axios('/update/view_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { id: boardid }
    })
  }

  render() {
    const { data, date } = this.state;

    return (
      <div className='Write' style={{ 'paddingLeft': '0px', 'paddingRight': '80px' }}>
        {data.data
          ? <div>

            <div className='top_title'>
              <input type='text' id='title_txt' name='title' defaultValue={data.data[0].title} readOnly />

              <div className='date_div'>
                {date}
              </div>
            </div>

            <div>
              <textarea id='content_txt' name='contentText' defaultValue={data.data[0].contentText} readOnly></textarea>
            </div>
          </div>
          : null}
      </div>
    );
  }
}

export default view;