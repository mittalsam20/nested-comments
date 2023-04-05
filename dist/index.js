function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var nanoid = require('nanoid');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var getComments = function getComments() {
  return [{
    id: '1',
    body: 'First comment',
    userName: 'Sam',
    userId: '1',
    parentId: null,
    createdAt: '2021-08-16T23:00:33.010+02:00'
  }, {
    id: '2',
    body: 'Second comment',
    userName: 'Rahul',
    userId: '2',
    parentId: null,
    createdAt: '2021-08-16T23:00:33.010+02:00'
  }, {
    id: '3',
    body: 'First comment first child',
    userName: 'rohan',
    userId: '2',
    parentId: '1',
    createdAt: '2021-08-16T23:00:33.010+02:00'
  }, {
    id: '4',
    body: 'Second comment second child',
    userName: 'John',
    userId: '2',
    parentId: '2',
    createdAt: '2021-08-16T23:00:33.010+02:00'
  }, {
    id: '5',
    body: 'nested Second comment second child',
    userName: 'John',
    userId: '2',
    parentId: '4',
    createdAt: '2021-09-16T23:00:33.010+02:00'
  }, {
    id: '6',
    body: 'sdsdsdsd First comment',
    userName: 'Sam',
    userId: '1',
    parentId: '4',
    createdAt: '2021-08-16T23:00:33.010+02:00'
  }];
};

var getComments$1 = function getComments$1() {
  var comments = getComments();
  return comments;
};
var getMilliseconds = function getMilliseconds(_ref) {
  var timeStamp = _ref.timeStamp;
  return new Date(timeStamp).getTime();
};
var getReplies = function getReplies(_ref2) {
  var _ref2$comments = _ref2.comments,
    comments = _ref2$comments === void 0 ? [] : _ref2$comments,
    commentId = _ref2.commentId;
  return comments.filter(function (_ref3) {
    var parentId = _ref3.parentId;
    return parentId === commentId;
  }).sort(function (a, b) {
    return getMilliseconds({
      timeStamp: a.createdAt
    }) - getMilliseconds({
      timeStamp: b.createdAt
    });
  });
};
var createComment = function createComment(_ref4) {
  var text = _ref4.text,
    userName = _ref4.userName,
    userId = _ref4.userId,
    parentId = _ref4.parentId;
  return {
    id: nanoid.nanoid(),
    body: text,
    userName: userName,
    userId: userId,
    parentId: parentId,
    createdAt: new Date().toISOString()
  };
};

var styles = {"comments":"_2U9L8","commentsTitle":"_15c4f","commentsContainer":"_3qMo1","commentFormTitle":"_3T6ez","commentFormTextarea":"_5Okqj","button":"_2hTXI","buttonPrimary":"_3Oikp","buttonSecondary":"_1Gipg","comment":"_2hdWC","commentImageContainer":"_2XI88","commentRightPart":"_2eRr9","commentContent":"_1XAQi","commentAuthor":"_14lWF","commentText":"_3qLCp","commentActions":"_2YQpj","commentAction":"_2L01V","replies":"_tRxDD","replyTextAreaContainer":"_2YkpU"};

var CommentForm = function CommentForm(props) {
  var _props$previousCommen = props.previousComment,
    previousComment = _props$previousCommen === void 0 ? '' : _props$previousCommen,
    submitLabel = props.submitLabel,
    setActiveComment = props.setActiveComment,
    handleSubmit = props.handleSubmit;
  var _useState = React.useState(previousComment),
    text = _useState[0],
    setText = _useState[1];
  var isTextAreaDisabled = text.length === 0 || text === previousComment;
  var onClickCancel = function onClickCancel(event) {
    event.preventDefault();
    setActiveComment({
      id: null,
      mode: 'VIEW'
    });
    setText('');
  };
  var onClickSubmit = function onClickSubmit(event) {
    event.preventDefault();
    handleSubmit({
      text: text
    });
    setText('');
  };
  return /*#__PURE__*/React__default.createElement("form", {
    onSubmit: onClickSubmit
  }, /*#__PURE__*/React__default.createElement("textarea", {
    className: styles.commentFormTextarea,
    value: text,
    onChange: function onChange(e) {
      return setText(e.target.value);
    }
  }), /*#__PURE__*/React__default.createElement("button", {
    className: styles.button + " " + styles.buttonSecondary,
    onClick: onClickCancel
  }, "Cancel"), /*#__PURE__*/React__default.createElement("button", {
    className: styles.button + " " + styles.buttonPrimary,
    disabled: isTextAreaDisabled
  }, submitLabel));
};

var onClickDelete = function onClickDelete(_ref) {
  var comments = _ref.comments,
    setComments = _ref.setComments,
    commentId = _ref.commentId;
  var filteredComments = comments.filter(function (_ref2) {
    var id = _ref2.id;
    return id !== commentId;
  });
  setComments(filteredComments);
};
var getActionButton = function getActionButton(_ref3) {
  var mode = _ref3.mode,
    userId = _ref3.userId,
    comments = _ref3.comments,
    commentId = _ref3.commentId,
    setComments = _ref3.setComments,
    currentUserId = _ref3.currentUserId,
    onClickDelete = _ref3.onClickDelete,
    _ref3$postedBy = _ref3.postedBy,
    postedBy = _ref3$postedBy === void 0 ? '1' : _ref3$postedBy,
    setActiveComment = _ref3.setActiveComment;
  var isUser = currentUserId === userId;
  var isAuthor = postedBy === currentUserId;
  var onClickEdit = function onClickEdit() {
    setActiveComment({
      id: commentId,
      mode: 'EDITING'
    });
  };
  return [{
    id: 'REPLY',
    label: 'Reply',
    show: Boolean(currentUserId),
    disabled: mode !== 'VIEW',
    onClick: function onClick() {
      return setActiveComment({
        id: commentId,
        mode: 'REPLYING'
      });
    }
  }, {
    id: 'EDIT',
    label: 'Edit',
    show: isUser,
    disabled: mode !== 'VIEW',
    onClick: onClickEdit
  }, {
    id: 'DELETE',
    label: 'Delete',
    show: isUser || isAuthor,
    disabled: mode !== 'VIEW',
    onClick: function onClick() {
      return onClickDelete({
        comments: comments,
        setComments: setComments,
        commentId: commentId
      });
    }
  }];
};
var Comment = function Comment(props) {
  var comment = props.comment,
    replies = props.replies,
    comments = props.comments,
    setComments = props.setComments,
    _handleSubmit = props.handleSubmit,
    activeComment = props.activeComment,
    setActiveComment = props.setActiveComment,
    _props$currentUserId = props.currentUserId,
    currentUserId = _props$currentUserId === void 0 ? 1 : _props$currentUserId;
  var activeCommentId = activeComment.id,
    mode = activeComment.mode;
  var id = comment.id,
    body = comment.body,
    userName = comment.userName,
    userId = comment.userId,
    parentId = comment.parentId,
    createdAt = comment.createdAt;
  var submitLabel = mode === 'EDITING' ? 'Save' : 'Comment';
  var formattedDate = new Date(createdAt).toLocaleDateString();
  var actionButtons = getActionButton({
    mode: mode,
    userId: userId,
    parentId: parentId,
    currentUserId: currentUserId,
    createdAt: createdAt,
    commentId: id,
    comments: comments,
    setComments: setComments,
    onClickDelete: onClickDelete,
    setActiveComment: setActiveComment
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.comment,
    style: parentId !== null && replies.length > 0 ? {
      marginBottom: '0'
    } : {}
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentImageContainer
  }, /*#__PURE__*/React__default.createElement("img", {
    src: "/user-icon.png",
    alt: "us"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentRightPart
  }, activeCommentId === id && mode === 'EDITING' ? /*#__PURE__*/React__default.createElement(CommentForm, {
    previousComment: body,
    submitLabel: submitLabel,
    setActiveComment: setActiveComment,
    handleSubmit: function handleSubmit(_ref4) {
      var text = _ref4.text;
      return _handleSubmit({
        text: text,
        mode: mode,
        comment: comment
      });
    }
  }) : /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentContent
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentAuthor
  }, userName), /*#__PURE__*/React__default.createElement(React.Fragment, null, formattedDate)), /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentText
  }, body), /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentActions
  }, actionButtons.map(function (_ref5) {
    var id = _ref5.id,
      label = _ref5.label,
      show = _ref5.show,
      onClick = _ref5.onClick;
    return show && /*#__PURE__*/React__default.createElement("div", {
      key: id,
      onClick: onClick,
      className: styles.commentAction
    }, label);
  }))), activeCommentId === id && mode === 'REPLYING' && /*#__PURE__*/React__default.createElement("div", {
    className: styles.replyTextAreaContainer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentImageContainer
  }, /*#__PURE__*/React__default.createElement("img", {
    src: "/user-icon.png",
    alt: "ava"
  })), /*#__PURE__*/React__default.createElement(CommentForm, {
    submitLabel: submitLabel,
    setActiveComment: setActiveComment,
    handleSubmit: function handleSubmit(_ref6) {
      var text = _ref6.text;
      return _handleSubmit({
        text: text,
        mode: mode,
        comment: comment
      });
    }
  })), replies.length > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: styles.replies
  }, replies.map(function (reply) {
    var id = reply.id;
    var nestedReplies = getReplies({
      comments: comments,
      commentId: id
    });
    return /*#__PURE__*/React__default.createElement(Comment, {
      key: id,
      comment: reply,
      replies: nestedReplies,
      comments: comments,
      setComments: setComments,
      handleSubmit: _handleSubmit,
      currentUserId: currentUserId,
      activeComment: activeComment,
      setActiveComment: setActiveComment
    });
  }))));
};

var newCommentInitialState = {
  id: 'NEW_COMMENT',
  parentId: null
};
var addComment = function addComment(_ref) {
  var text = _ref.text,
    mode = _ref.mode,
    _ref$comment = _ref.comment,
    comment = _ref$comment === void 0 ? {} : _ref$comment,
    comments = _ref.comments,
    setComments = _ref.setComments,
    _ref$currentUserId = _ref.currentUserId,
    currentUserId = _ref$currentUserId === void 0 ? null : _ref$currentUserId,
    _ref$currentUserName = _ref.currentUserName,
    currentUserName = _ref$currentUserName === void 0 ? null : _ref$currentUserName;
  var updatedComments;
  var id = comment.id,
    userName = comment.userName,
    parentId = comment.parentId;
  console.log(comment, text);
  if (mode === 'COMMENTING' || mode === 'REPLYING') {
    var newComment = createComment({
      text: text,
      userId: currentUserId,
      userName: currentUserName || userName,
      parentId: mode === 'COMMENTING' && parentId == null ? null : id
    });
    updatedComments = [newComment].concat(comments);
  } else if (mode === 'EDITING') {
    updatedComments = comments.map(function (comment) {
      if (comment.id === id) return _extends({}, comment, {
        body: text
      });
      return comment;
    });
  }
  setComments(updatedComments);
};
var Comments = function Comments(props) {
  var _props$currentUserId = props.currentUserId,
    currentUserId = _props$currentUserId === void 0 ? 1 : _props$currentUserId,
    _props$currentUserNam = props.currentUserName,
    currentUserName = _props$currentUserNam === void 0 ? 'Sam' : _props$currentUserNam;
  var _useState = React.useState([]),
    comments = _useState[0],
    setComments = _useState[1];
  var _useState2 = React.useState({
      id: null,
      mode: 'VIEW'
    }),
    activeComment = _useState2[0],
    setActiveComment = _useState2[1];
  var rootComments = comments.filter(function (_ref2) {
    var parentId = _ref2.parentId;
    return parentId === null;
  });
  React.useEffect(function () {
    setComments(getComments$1());
  }, []);
  var _handleSubmit = function handleSubmit(_ref3) {
    var text = _ref3.text,
      mode = _ref3.mode,
      _ref3$comment = _ref3.comment,
      comment = _ref3$comment === void 0 ? null : _ref3$comment;
    addComment({
      text: text,
      mode: mode,
      comment: comment,
      comments: comments,
      currentUserId: currentUserId,
      currentUserName: currentUserName,
      setComments: setComments
    });
    setActiveComment({
      id: null,
      mode: 'VIEW'
    });
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.comments
  }, /*#__PURE__*/React__default.createElement("h3", {
    className: styles.commentsTitle
  }, "comments"), /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentFormTitle
  }, "Write Comment"), /*#__PURE__*/React__default.createElement(CommentForm, {
    submitLabel: "comment",
    setActiveComment: setActiveComment,
    handleSubmit: function handleSubmit(_ref4) {
      var text = _ref4.text;
      return _handleSubmit({
        text: text,
        mode: 'COMMENTING',
        comment: newCommentInitialState
      });
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles.commentsContainer
  }, rootComments.map(function (comment) {
    var id = comment.id;
    var replies = getReplies({
      comments: comments,
      commentId: id
    });
    return /*#__PURE__*/React__default.createElement(Comment, {
      key: id,
      comment: comment,
      replies: replies,
      comments: comments,
      setComments: setComments,
      handleSubmit: _handleSubmit,
      currentUserId: currentUserId,
      activeComment: activeComment,
      setActiveComment: setActiveComment
    });
  })));
};

module.exports = Comments;
//# sourceMappingURL=index.js.map
