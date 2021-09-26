const { Base64 } = require('js-base64');
const Jimp = require('jimp');
const textToImage = require('text-to-image');

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

    /**
     * Add watermark on the image.
     * @param imageSream
     * @param imageCaption
     * @returns {Promise<Buffer>}
     */
    async watermarkImage(imageSream, imageCaption) {
        const image = await Jimp.read(imageSream);

        const dataUri = textToImage.generateSync(imageCaption, {
            debug: false,
            maxWidth: 325,
            fontSize: 18,
            margin: 0,
            textColor: '#fefefe',
            customHeight: 25,
            textAlign: 'center',
            verticalAlign: 'center',
        });

        const watermarkBuffer = Buffer.from(dataUri.replace(/^data:image\/\w+;base64,/, ''), 'base64');

        const watermarkImg = await Jimp.read(watermarkBuffer);

        for (let i = 0; i < image.bitmap.height - 25; i += watermarkImg.bitmap.height) {
            image.composite(watermarkImg, 25, i, {
                mode: Jimp.BLEND_OVERLAY,
                opacitySource: 0.01,
                opacityDest: 1,
            });
        }

        image.background(0xffffffff);

        return image.getBufferAsync(Jimp.MIME_JPEG);
    }
}

module.exports = new Utils();
