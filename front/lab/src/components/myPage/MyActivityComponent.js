import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../../layouts/SideBar';

const initState = {
  email: '',
  name: '',
  pwd: '',
  nickname: '',
  // phone: '',
  // addr: '',
};

function MyActivityComponent(props) {
  return <div className="mt-6">나의 활동</div>;
}
export default MyActivityComponent;
