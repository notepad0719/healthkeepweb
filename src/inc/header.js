import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import Modal from 'react-awesome-modal';
class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      email: "",
      pw: "",

    }
  }


  _openModal = function () {
    this.setState({
      visible: true
    });
  }

  _closeModal = function () {
    this.setState({
      visible: false
    });
  }

  _changeEmail = function () {
    const email_v = document.getElementsByName('email')[0].value;
    this.setState({
      email: email_v
    });
  }

  _changePW = function () {
    const pw_v = document.getElementsByName('pw')[0].value;
    this.setState({
      pw: pw_v
    });
  }

  _selectUserData = async (e) => {
    const email = this.state.email.trim();
    const pw = this.state.pw.trim();

    if (email === "") {
      return alert('아이디를 입력해주세요.');

    } else if (pw === "") {
      return alert('비밀번호를 입력해주세요.');
    }

    const obj = { email: email, pw: pw }
    const res = await axios('/send/pw', {
      method: 'POST',
      data: obj,
      headers: new Headers()
    })

    if (res.data) {
     

      if (res.data.suc) {
        this.props._login();
        this._closeModal();

        return alert('로그인 되었습니다.')

      } else {
        return alert('아이디 및 비밀번호가 일치하지 않습니다.');
      }
    }
  }

  _logout = function() {
    if(window.confirm('로그아웃 하시겠습니까?')) {
      this.props._logout();
    }
  }

  _goHead = function() {
    sessionStorage.removeItem('page')
    return window.location.href = '/';
  }

  render() {
    const { login } = this.props;
    //console.log(`아이디 :  + ${this.state.email} + , 비밀번호 :  + ${this.state.pw}`);
    return (
      <div className='header_grid'>
            <div className='acenter'> 
            
              {login
                ? <h5> <Link to='/write'> 글쓰기 </Link> </h5>
                : null
              }
            </div>

        <div className='acenter'>
          <Route path='/' />
          <h3 onClick={() => this._goHead()}> <Link className='link_tit' to='/'>Health Keep Admin Page</Link></h3>
        </div>
        <div className='acenter'>
          {login ? <h5 className='btn_cursor' onClick={() => this._logout()}> 관리자 로그아웃 </h5>
            : <h5 className='btn_cursor' onClick={() => this._openModal()}> 관리자 로그인 </h5>
          }
          <Modal visible={this.state.visible}
            width="400" height="360"
            effect="fadeInDown"
            onClickAway={() => this._closeModal()}
          >
            <div>
              <h4 className='acenter login_tit'> 관리자 로그인 </h4>
              <form>
                <div className='login_div'>
                  <div className='login_input_div'>
                    <p> 관리자 ID </p>
                    <input type='text' name='email' onChange={() => this._changeEmail()} autoComplete="off" />
                  </div>

                  <div className='login_input_div' style={{ 'marginTop': '40px' }}>
                    <p> 관리자 Password </p>
                    <input type='password' name='pw' onChange={() => this._changePW()} />
                  </div>

                  <div className='submit_div'>
                    <div> <input type='button' value='로그인' onClick={() => this._selectUserData()} /> </div>
                    <div> <input type='button' value='취소' onClick={() => this._closeModal()} /> </div>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default header;


