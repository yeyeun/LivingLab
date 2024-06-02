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

function MyChatComponent(props) {
  const [user, setUser] = useState(initState);

  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 사용자의 상태정보

  useEffect(() => {
    setUser({ ...loginInfo, pw: 'ABCD' });
  }, [loginInfo]);

  const handleChange = (e) => {
    user[e.target.name] = e.target.value;

    setUser({ ...user });
  };

  return <div className="mt-6">나의 채팅</div>;
}
export default MyChatComponent;
