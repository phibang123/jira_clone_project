import { baseService } from "../BaseService";

export class commentService extends baseService {
	constructor() {
		super();
	}

  getAllComment = (taskId) =>
  {
    return this.get(`/Comment/getAll/taskId=${taskId}`)
  }
  deleteComment = (commentId) =>
  {
    return this.delete(`/Comment/deleteComment/idComment=${commentId}`)
  }
  insertComment = (comment) =>
  {
    return this.post(`/Comment/insertComment`,comment)
  }
}

export const CommentService = new commentService();
