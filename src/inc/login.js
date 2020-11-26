import React, { Component } from 'react';

import Modal from 'react-awesome-modal';
import axios from 'axios';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pw: "",
    }
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

        this.props._login(res.data);
        this.props._toggleModal(false)

        return alert('로그인 되었습니다.')

      } else {
        return alert('아이디 및 비밀번호가 일치하지 않습니다.');
      }
    }
  }


  render() {
    return (
      <div>
        <Modal visible={this.props.login_modal}
          width="400" height="360"
          effect="fadeInDown"
          onClickAway={() => this.props._toggleModal(false)}
        >
          <div>
            <h4 className='acenter login_tit'> 로그인 </h4>
            <form>
              <div className='login_div'>
                <div className='login_input_div'>
                  <p> Email </p>
                  <input type='text' name='email' onChange={() => this._changeEmail()} autoComplete="off" />
                </div>

                <div className='login_input_div' style={{ 'marginTop': '40px' }}>
                  <p> Password </p>
                  <input type='password' name='pw' onChange={() => this._changePW()} />
                </div>

                <div className='submit_div'>
                  <div> <input type='button' value='로그인' onClick={() => this._selectUserData()} /> </div>
                  <div> <input type='button' value='취소' onClick={() => this.props._toggleModal(false)} /> </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default login;
