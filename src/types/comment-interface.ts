interface CommentResource {
  id: string
  channelId: string
  profileImage: string
  comment: string
  nickname: string
  isTopLevel: boolean
  commentPredict: string
  nicknamePredict: string
  nicknameProb: number[]
  commentProb: number[]
}

interface PredictCategory {
  commentCategories: string[]
  nicknameCategories: string[]
  predictCommonResponse: { code: number; message: string }
}

interface CommentResponseData {
  isLast: string
  items: CommentResource[]
  predictCommonResponse: { code: number; message: string }
}

interface DeleteCommentObject {
  commentId: string
  channelId: string
}

interface CommentDeleteRequestData {
  justDeleteComments?: DeleteCommentObject[]
  authorBanComments?: DeleteCommentObject[]
}

export type {
  CommentResource,
  CommentResponseData,
  PredictCategory,
  CommentDeleteRequestData,
  DeleteCommentObject,
}
