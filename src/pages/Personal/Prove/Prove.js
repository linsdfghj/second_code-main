import React, { useState } from 'react';
import { message } from 'antd';
import './Prove.css';

const Information = () => {
  const [realName, setRealName] = useState('');
  const [realSchool, setRealSchool] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止默认表单提交行为

    // 验证真实姓名是否为汉字
    const chineseNameRegex = /^[\u4e00-\u9fa5]+$/;
    if (!chineseNameRegex.test(realName)) {
      message.error('请输入有效的真实姓名（仅限汉字）');
      return;
    }

    // 验证身份证号码是否为18位阿拉伯数字
    const idCardRegex = /^\d{18}$/;
    if (!idCardRegex.test(idCardNumber)) {
      message.error('请输入有效的18位身份证号码');
      return;
    }

    // 如果通过验证，可以继续提交
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          realName,
          realSchool,
          idCardNumber,
        }),
      });

      if (response.ok) {
        message.success('提交成功');
        setRealName('');
        setRealSchool('');
        setIdCardNumber('');
      } else {
        message.error('提交失败，请重试');
      }
    } catch (error) {
      message.error('提交过程中出现错误，请重试');
    }
  };

  return (
    <div className='prove-all'>
      <div className='prove-down'>
        <div className='prove-content'>
          <div className='realbox'>
            <p>信息认证</p>
            <form className='provebox' onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='请输入真实姓名'
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
              />

              <input
                type='text'
                placeholder='请输入所在学校'
                value={realSchool}
                onChange={(e) => setRealSchool(e.target.value)}
              />

              <input
                type='text'
                placeholder='请输入身份证号'
                value={idCardNumber}
                onChange={(e) => setIdCardNumber(e.target.value)}
              />

              <button type='submit'>提交</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
