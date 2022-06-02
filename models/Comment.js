const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReplySchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment_id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        replyBody: {
            type: String,
        },
        writtenBy: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => dateFormat(createdAt)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String
        },
        commentBody: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => dateFormat(createdAt)
        },
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length
});

const comment = model('Comment', CommentSchema);

module.exports = comment;