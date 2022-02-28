const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
require("dotenv").config();
const defaultNoOfPosts = parseInt(process.env.DEFAULT_NO_OF_POSTS);
const defaultNoOfComments = parseInt(process.env.DEFAULT_NO_OF_COMMENTS);
const postById = (postId, userId) => {
  if (userId) {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          user_comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          reaction_by_user: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $ne: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  type: "$reaction.type",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          reactions: 1,
          reaction_by_user: 1,
          comments: {
            $slice: [
              {
                $concatArrays: ["$user_comments", "$comments"],
              },
              0,
              10,
            ],
          },
        },
      },
    ];
    return pipeline;
  } else {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $eq: ["$reaction.type", "comment"],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          reactions: 1,
          comments: {
            $slice: ["$comments", 0, 10],
          },
        },
      },
    ];
    return pipeline;
  }
};
const posts = (userId, pageInput, number) => {
  let page = pageInput || 1;
  let noOfPosts = number || defaultNoOfPosts;
  page--;
  let pipeline;
  if (userId) {
    pipeline = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          user_comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          reaction_by_user: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $ne: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  type: "$reaction.type",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          reactions: 1,
          reaction_by_user: 1,
          comments: {
            $slice: [
              {
                $concatArrays: ["$user_comments", "$comments"],
              },
              0,
              defaultNoOfComments,
            ],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
  } else {
    pipeline = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $eq: ["$reaction.type", "comment"],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          reactions: 1,
          comments: {
            $slice: ["$comments", 0, defaultNoOfComments],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
  }
  return pipeline;
};
const postsByUserId = (userId, currentUserId, pageInput, number) => {
  let page = pageInput || 1;
  let noOfPosts = number || defaultNoOfPosts;
  page--;
  if (currentUserId) {
    const pipeline = [
      {
        $match: {
          user: new ObjectId(userId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          user_comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          reaction_by_user: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $ne: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  type: "$reaction.type",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          reactions: 1,
          reaction_by_user: 1,
          comments: {
            $slice: [
              {
                $concatArrays: ["$user_comments", "$comments"],
              },
              0,
              defaultNoOfComments,
            ],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  } else {
    const pipeline = [
      {
        $match: {
          user: new ObjectId(userId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $eq: ["$reaction.type", "comment"],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          reactions: 1,
          comments: {
            $slice: ["$comments", 0, defaultNoOfComments],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  }
};
const commentsByPostId = (
  postId,
  userId = "000000000000000000000000",
  pageInput,
  number
) => {
  let page = pageInput || 1;
  let noOfPosts = number || defaultNoOfComments;
  page--;
  let pipeline = [
    {
      $facet: {
        comment: [
          {
            $match: {
              $and: [
                { type: "comment" },
                {
                  post: new ObjectId(postId),
                },
                {
                  user: {
                    $ne: new ObjectId(userId),
                  },
                },
              ],
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $skip: page * noOfPosts,
          },
          {
            $limit: noOfPosts,
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              _id: 1,
              comment: 1,
              post: 1,
              user: {
                $arrayElemAt: ["$user", 0],
              },
              createdAt: 1,
            },
          },
          {
            $project: {
              _id: 1,
              comment: 1,
              post: 1,
              "user._id": 1,
              "user.name": 1,
              "user.imgUrl": 1,
              createdAt: 1,
            },
          },
        ],
        user_comment: [
          {
            $match: {
              $and: [
                { type: "comment" },
                {
                  post: new ObjectId(postId),
                },
                {
                  user: {
                    $eq: new ObjectId(userId),
                  },
                },
              ],
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $skip: page * noOfPosts,
          },
          {
            $limit: noOfPosts,
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              _id: 1,
              comment: 1,
              post: 1,
              user: {
                $arrayElemAt: ["$user", 0],
              },
              createdAt: 1,
            },
          },
          {
            $project: {
              _id: 1,
              comment: 1,
              post: 1,
              "user._id": 1,
              "user.name": 1,
              "user.imgUrl": 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
  ];
  return pipeline;
};
const reactionsByPostId = (
  postId,
  userId = "000000000000000000000000",
  pageInput,
  number
) => {
  let page = pageInput || 1;
  let noOfPosts = number || defaultNoOfComments;
  page--;
  let pipeline = [
    {
      $facet: {
        reactions: [
          {
            $match: {
              $and: [
                {
                  type: {
                    $ne: "comment",
                  },
                },
                {
                  post: new ObjectId(postId),
                },
                {
                  user: {
                    $ne: new ObjectId(userId),
                  },
                },
              ],
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $skip: page * noOfPosts,
          },
          {
            $limit: noOfPosts,
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              _id: 1,
              type: 1,
              post: 1,
              user: {
                $arrayElemAt: ["$user", 0],
              },
              createdAt: 1,
            },
          },
          {
            $project: {
              _id: 1,
              type: 1,
              post: 1,
              "user._id": 1,
              "user.name": 1,
              "user.imgUrl": 1,
              createdAt: 1,
            },
          },
        ],
        user_reaction: [
          {
            $match: {
              $and: [
                {
                  type: {
                    $ne: "comment",
                  },
                },
                {
                  post: new ObjectId(postId),
                },
                {
                  user: {
                    $eq: new ObjectId(userId),
                  },
                },
              ],
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $skip: page * noOfPosts,
          },
          {
            $limit: noOfPosts,
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              _id: 1,
              type: 1,
              post: 1,
              user: {
                $arrayElemAt: ["$user", 0],
              },
              createdAt: 1,
            },
          },
          {
            $project: {
              _id: 1,
              type: 1,
              post: 1,
              "user._id": 1,
              "user.name": 1,
              "user.imgUrl": 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
  ];
  return pipeline;
};
const organizationDetails = (organizationId) => {
  const pipeline = [
    {
      $match: {
        _id: new ObjectId(organizationId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "organization",
        as: "users",
      },
    },
    {
      $lookup: {
        from: "teams",
        localField: "_id",
        foreignField: "organization",
        as: "teams",
      },
    },
    {
      $unwind: {
        path: "$users",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email_format: 1,
        user: "$users._id",
        createdAt: 1,
        updatedAt: 1,
        teams: 1,
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "user",
        foreignField: "user",
        as: "posts",
      },
    },
    {
      $unwind: {
        path: "$posts",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email_format: 1,
        user: 1,
        post: "$posts._id",
        createdAt: 1,
        updatedAt: 1,
        teams: 1,
      },
    },
    {
      $unwind: {
        path: "$teams",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email_format: 1,
        user: 1,
        post: 1,
        team: "$teams._id",
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $lookup: {
        from: "notices",
        localField: "team",
        foreignField: "team",
        as: "notices",
      },
    },
    {
      $unwind: {
        path: "$notices",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email_format: 1,
        user: 1,
        post: 1,
        team: 1,
        notice: "$notices._id",
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name",
        },
        email_format: {
          $first: "$email_format",
        },
        createdAt: {
          $first: "$createdAt",
        },
        updatedAt: {
          $first: "$updatedAt",
        },
        users: {
          $addToSet: "$user",
        },
        posts: {
          $addToSet: "$post",
        },
        teams: {
          $addToSet: "$team",
        },
        notices: {
          $addToSet: "$notice",
        },
      },
    },
  ];
  return pipeline;
};
const userDetails = (userId) => {
  const pipeline = [
    {
      $match: {
        _id: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "reactions",
        localField: "_id",
        foreignField: "user",
        as: "reactions",
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "user",
        as: "posts",
      },
    },
    {
      $unwind: {
        path: "$Post",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        organization: 1,
        teams: 1,
        posts: "$posts._id",
        imageUrl: "$image_link",
        reactions: 1,
      },
    },
    {
      $unwind: {
        path: "$reactions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        organization: 1,
        posts: 1,
        reactions: "$reactions._id",
        imageUrl: 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name",
        },
        email: {
          $first: "$email",
        },
        organization: {
          $first: "$organization",
        },
        Posts: {
          $first: "$posts",
        },
        imageUrl: {
          $first: "$imageUrl",
        },
        reactions: {
          $addToSet: "$reactions",
        },
      },
    },
  ];
  return pipeline;
};
const noticeById = (noticeId, userId) => {
  if (userId) {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(noticeId),
        },
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          user_comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          reaction_by_user: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $ne: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  type: "$reaction.type",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          reaction_by_user: 1,
          comments: {
            $slice: [
              {
                $concatArrays: ["$user_comments", "$comments"],
              },
              0,
              10,
            ],
          },
        },
      },
    ];
    return pipeline;
  } else {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(noticeId),
        },
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $eq: ["$reaction.type", "comment"],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          comments: {
            $slice: ["$comments", 0, 10],
          },
        },
      },
    ];
    return pipeline;
  }
};
const notices = (userId, pageInput, number) => {
  let page = pageInput || 1;
  let noOfPosts = number || defaultNoOfPosts;
  page--;
  if (userId) {
    const pipeline = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          user_comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          reaction_by_user: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(userId)],
                    },
                    {
                      $ne: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  type: "$reaction.type",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          reaction_by_user: 1,
          comments: {
            $slice: [
              {
                $concatArrays: ["$user_comments", "$comments"],
              },
              0,
              defaultNoOfComments,
            ],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  } else {
    const pipeline = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $eq: ["$reaction.type", "comment"],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          comments: {
            $slice: ["$comments", 0, defaultNoOfComments],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  }
};
const noticesByUserId = (userId, currentUserId, pageInput, number) => {
  let page = pageInput || 1;
  let noOfPosts = number || defaultNoOfPosts;
  page--;
  if (currentUserId) {
    const pipeline = [
      {
        $match: {
          user: new ObjectId(userId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          user_comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          reaction_by_user: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $ne: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  type: "$reaction.type",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          reaction_by_user: 1,
          comments: {
            $slice: [
              {
                $concatArrays: ["$user_comments", "$comments"],
              },
              0,
              defaultNoOfComments,
            ],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  } else {
    const pipeline = [
      {
        $match: {
          user: new ObjectId(userId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $eq: ["$reaction.type", "comment"],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          comments: {
            $slice: ["$comments", 0, defaultNoOfComments],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  }
};
const noticesByTeamId = (teamId, currentUserId, pageInput, number) => {
  let page = pageInput || 1;
  let noOfPosts = number || defaultNoOfPosts;
  page--;
  if (currentUserId) {
    const pipeline = [
      {
        $match: {
          team: new ObjectId(teamId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          user_comments: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $eq: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
          reaction_by_user: {
            $push: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$reaction.user", new ObjectId(currentUserId)],
                    },
                    {
                      $ne: ["$reaction.type", "comment"],
                    },
                  ],
                },
                {
                  type: "$reaction.type",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          reaction_by_user: 1,
          comments: {
            $slice: [
              {
                $concatArrays: ["$user_comments", "$comments"],
              },
              0,
              defaultNoOfComments,
            ],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  } else {
    const pipeline = [
      {
        $match: {
          team: new ObjectId(teamId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page * noOfPosts,
      },
      {
        $limit: noOfPosts,
      },
      {
        $lookup: {
          from: "notice_reactions",
          localField: "_id",
          foreignField: "notice",
          as: "reaction",
        },
      },
      {
        $unwind: {
          path: "$reaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "reaction.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          image_link: {
            $first: "$image_link",
          },
          user: {
            $first: "$user",
          },
          team: {
            $first: "$team",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          reactions: {
            $push: {
              $cond: [
                {
                  $ne: ["$reaction.type", "comment"],
                },
                {
                  type: "$reaction.type",
                  user: "$reaction.user",
                },
                "$$REMOVE",
              ],
            },
          },
          comments: {
            $push: {
              $cond: [
                {
                  $eq: ["$reaction.type", "comment"],
                },
                {
                  text: "$reaction.comment",
                  user: "$reaction.user",
                  createdAt: "$reaction.createdAt",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image_link: 1,
          createdAt: 1,
          updatedAt: 1,
          user: 1,
          team: 1,
          reactions: 1,
          comments: {
            $slice: ["$comments", 0, defaultNoOfComments],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    return pipeline;
  }
};
module.exports = {
  postById,
  posts,
  postsByUserId,
  organizationDetails,
  noticeById,
  notices,
  noticesByUserId,
  noticesByTeamId,
  userDetails,
  commentsByPostId,
  reactionsByPostId,
};
