const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
require("dotenv").config();
const defaultNoOfPosts = process.env.DEFAULT_NO_OF_POSTS;
const defaultNoOfComments = process.env.DEFAULT_NO_OF_COMMENTS;
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
        $unwind: { path: "$reaction", preserveNullAndEmptyArrays: true },
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
        $unwind: { path: "$reaction", preserveNullAndEmptyArrays: true },
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
  if (userId) {
    const pipeline = [
      {
        createdAt: -1,
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
        $unwind: { path: "$reaction", preserveNullAndEmptyArrays: true },
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
    return pipeline;
  } else {
    const pipeline = [
      {
        createdAt: -1,
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
        $unwind: { path: "$reaction", preserveNullAndEmptyArrays: true },
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
        createdAt: -1,
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
        $unwind: { path: "$reaction", preserveNullAndEmptyArrays: true },
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
        createdAt: -1,
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
        $unwind: { path: "$reaction", preserveNullAndEmptyArrays: true },
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
module.exports = {
  postById,
  posts,
  postsByUserId,
};
