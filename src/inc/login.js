import React, { Component } from 'react';

import Modal from 'react-awesome-modal';
import axios from 'axios';

import { Search_id, Search_pw } from './index.js';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      search_id_modal: false,
      search_pw_modal: false,
      close: "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-x-mark-2.png&r=0&g=0&b=0",
    }
  }

  _changeID = function () {
    const id_v = document.getElementsByName('id')[0].value;

    this.setState({
      id: id_v
    });
  }

  _changePW = function () {
    const pw_v = document.getElementsByName('password')[0].value;

    this.setState({
      password: pw_v
    });
  }

  _selectUserData = async (e) => {
    const id = this.state.id.trim();
    const password = this.state.password.trim();

    if (id === "") {
      return alert('아이디를 입력해주세요.');

    } else if (password === "") {
      return alert('비밀번호를 입력해주세요.');
    }

    const obj = { id: id, password: password }
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

  _openSearchModal = function (target) {

    if (target === 'id') {
      this.setState({ search_id_modal: true })

    } else if (target === 'pw') {
      this.setState({ search_pw_modal: true })
    }

    return this.props._toggleModal(false)
  }

  _closeSearchModal = (target) => {

    if (target === 'id') {
      this.setState({ search_id_modal: false })

    } else if (target === 'pw') {
      this.setState({ search_pw_modal: false })
    }
  }

  _backSearchModal = (target) => {

    this._closeSearchModal(target)
    return this.props._toggleModal(true)
  }

  render() {
    const { close } = this.state;

    return (
      <div>
        <Modal visible={this.props.login_modal}
          width="400" height="400"
          effect="fadeInDown"
          onClickAway={() => this.props._toggleModal(false)}
        >
          <div>
            <h4 className='acenter login_tit'> 로그인 </h4>
            <img src={close} id='login_close' title='닫기' onClick={() => this.props._toggleModal(false)} />
            <form>
              <div className='login_div'>
                <div className='login_input_div'>
                  <p> ID </p>
                  <input type='text' name='id' onChange={() => this._changeID()} autoComplete="off" />
                </div>

                <div className='login_input_div' style={{ 'marginTop': '40px' }}>
                  <p> Password </p>
                  <input type='password' name='password' onChange={() => this._changePW()} />
                </div>

                <div className='submit_div'>
                  <b id='login_button' onClick={() => this._selectUserData()}> 로그인 </b>
                </div>
              </div>
            </form>

            <div className='search_user_info_div'>
            </div>
          </div>
        </Modal>
        <Search_id
          search_id_modal={this.state.search_id_modal}
          _closeSearchModal={this._closeSearchModal}
          _backSearchModal={this._backSearchModal}
          target="id"
        />
        <Search_pw
          search_pw_modal={this.state.search_pw_modal}
          _closeSearchModal={this._closeSearchModal}
          _backSearchModal={this._backSearchModal}
          target="pw"
        />
      </div>
    );
  }
}

export default login;
