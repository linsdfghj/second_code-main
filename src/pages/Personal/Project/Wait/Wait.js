// src/pages/Personal/Project/Wait/Wait.js
import React from 'react';
import { useInfo } from '../InfoContext/InfoContext';
import './Wait.css';

const Wait = () => {
  const { infoList } = useInfo();

  return (
    <div className='wait-all'>
      <div className='wait-up'>
        <div className='wait-up1'>申请项目</div>
        <div className='wait-up1'>申请人</div>
        <div className='wait-up1'>申请时间</div>
        <div className='wait-up1'>状态</div>
        <div className='wait-up1'>操作</div>
      </div>

      {infoList.length > 0 ? (
        infoList.map((item, index) => {
          let startDate;
          if (item.startDate) {
            startDate = new Date(item.startDate);
            if (isNaN(startDate.getTime())) {
              startDate = null;
            }
          }

          return (
            <div className='wait-content' key={index}>
              <div className='wait-content1'>{item.projectName || '无数据'}</div>
              <div className='wait-content1'>{item.applicantName || '无数据'}</div>
              <div className='wait-content1'>{startDate ? startDate.toLocaleDateString() : '无数据'}</div>
              <div className='wait-content1' style={{ color: '#FDA75F' }}>待审核</div>
              <div className='wait-content1' style={{ color: '#FDA75F' }}>查看</div>
            </div>
          );
        })
      ) : (
        <div className='wait-content'>
          <div className='wait-content1' colSpan="5">无数据</div>
        </div>
      )}

      <div className='wait-down'>
        <div className='wait-down-main'>
          共{infoList.length}条记录
        </div>
      </div>
    </div>
  );
};

export default Wait;
