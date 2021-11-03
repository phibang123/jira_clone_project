import { Button, notification } from 'antd';

import { SmileOutlined } from '@ant-design/icons';

export const  openNotification = (icon,title,message) => {
  notification.open({
    message: title,
    description: message,
    icon: icon ,
  });
};