import { notification } from "antd";

export const Notification = (type, title, description = '') => {
	notification[type]({
		//action.TypeNotification success \ warning \ info \ error
		message: title,
		description: description,
		style: {
			zIndex: 1060,
		}
	});
};
