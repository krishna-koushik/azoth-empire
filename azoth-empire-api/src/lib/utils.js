const { Base64 } = require('js-base64');

const DEFAULT_PREFIX = 'connectioncursor:';

class Utils {
    /**
     * Convert an offset to an opaque cursor.
     * @param {number} offset Offset to convert.
     * @param {string} PREFIX  to add on to offset.
     * @returns {string} Cursor.
     */
    offsetToCursor(offset, PREFIX = DEFAULT_PREFIX) {
        return Base64.encode(PREFIX + offset);
    }

    /**
     * Convert an opaque cursor to a number offset.
     * @param {string} cursor Cursor to convert.
     * @param {number} defaultOffset Default value to return in case the cursor was not valid.
     * @param {string} PREFIX  to add on to offset.
     * @returns {number} Offset.
     */
    getOffsetFromOpaqueCursor(cursor, defaultOffset, PREFIX = DEFAULT_PREFIX) {
        return typeof cursor !== 'string' ? defaultOffset : parseInt(Base64.decode(cursor).substring(PREFIX.length), 10);
    }
}

module.exports = new Utils();
