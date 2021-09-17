const { UserInputError } = require("apollo-server");
const { Base64 } = require("js-base64");
//const lodash = require("lodash");
//const { players } = require("../../database/mongodb/mongoose/models");
const db = require("../../database/mongodb/mongoose/models");

const PREFIX = "connectioncursor:";

/**
 * Return a connection structure from an aggregation pipeline of mongodb.
 * @param {Object} data Information to get the dataset to paginate.
 * @param {Array<Object>} data.pipeline Aggregation framework pipeline to
 * execute.
 * @param {string} data.modelName Database model name to execute
 * the aggregation pipeline.
 * @param {Object} args Connection based pagination arguments.
 * @param {number} [args.first] Limit of the dataset to return since the first
 * element.
 * @param {number} [args.last] Limit of the dataset to return since the last
 * element.
 * @param {string} [args.after] Start offset to slice dataset.
 * @param {string} [args.before] End offset to slice dataset.
 * @returns {Promise<Object>} Connection.
 */
module.exports.connectionFromAggregationPipeline = async function (data, args) {
  const { first, last, after, before } = args;
  const { pipeline, modelName } = data;
  if (!pipeline || !modelName) {
    throw new Error("You must provide a pipeline and a model name");
  }
  const model = db[modelName];
  const clonePipeline = pipeline.slice();
  const totalItems = await getTotalItemsFromAggregationCursor(
    model.aggregate(clonePipeline)
  );
  const afterOffset = getOffsetFromOpaqueCursor(after, 0);
  const beforeOffset = getOffsetFromOpaqueCursor(before, totalItems + 1);
  let skip = Math.max(afterOffset, 0);
  let limit = Math.min(beforeOffset, totalItems + 1) - skip - 1;
  const quotedSetLength = limit;

  if (typeof first === "number") {
    if (first < 0) {
      throw new UserInputError(
        'Argument "first" must be a non-negative integer'
      );
    }
    limit = Math.min(limit, first);
  } else if (typeof last === "number") {
    if (last < 0) {
      throw new UserInputError(
        'Argument "last" must be a non-negative integer'
      );
    }
    skip = Math.max(skip, skip + limit - last);
    limit = Math.min(limit, last);
  } else {
    throw new UserInputError(
      "You must provide a `first` or `last` argument to properly paginate the connection."
    );
  }

  let edges = [];
  if (limit > 0) {
    const items = await model
      .aggregate(pipeline)
      .project({ _id: 1 })
      .skip(skip)
      .limit(limit);
    edges = items.map((value, index) => {
      return {
        cursor: offsetToCursor(skip + index + 1),
        node: value._id,
      };
    });
  }
  const startEdge = edges[0];
  const endEdge = edges[edges.length - 1];
  return {
    edges,
    pageInfo: {
      startCursor: startEdge ? startEdge.cursor : null,
      endCursor: endEdge ? endEdge.cursor : null,
      hasPreviousPage:
        typeof last === "number" ? quotedSetLength > last : skip > 0,
      hasNextPage:
        typeof first === "number"
          ? quotedSetLength > first
          : skip + limit < totalItems,
    },
  };
};

/**
 * Count the number of items from an aggregation cursor.
 * @param {Object} cursor Aggregation cursor instance.
 * @returns {number} Total items.
 */
async function getTotalItemsFromAggregationCursor(cursor) {
  const count = await cursor
    .group({ _id: null, total: { $sum: 1 } })
    .project({ _id: 0 });
  return count[0] ? count[0].total : 0;
}

/**
 * Convert an offset to an opaque cursor.
 * @param {number} offset Offset to convert.
 * @returns {string} Cursor.
 */
function offsetToCursor(offset) {
  return Base64.encode(PREFIX + offset);
}

/**
 * Convert an opaque cursor to a number offset.
 * @param {string} cursor Cursor to convert.
 * @param {number} defaultOffset Default value to return in case the cursor was
 * not valid.
 * @returns {number} Offset.
 */
function getOffsetFromOpaqueCursor(cursor, defaultOffset) {
  if (typeof cursor !== "string") return defaultOffset;
  return parseInt(Base64.decode(cursor).substring(PREFIX.length), 10);
}
