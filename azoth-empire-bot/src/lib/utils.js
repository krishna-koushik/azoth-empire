const Jimp = require('jimp');
const textToImage = require('text-to-image');

class NWBotUtils {
    capitalize(stringTxt) {
        return stringTxt.charAt(0).toUpperCase() + stringTxt.slice(1);
    }

    async fetchDiscordUser(guild, user) {
        const allMembers = await guild.members.fetch();
        return allMembers.find(m => {
            return m.user.username === user.username;
        });
    }

    async fetchAllDiscordUser(guild) {
        return guild.members.fetch();
    }

    checkIfUserHasPermissions(roles, roleName) {
        return roles.some(role => role.name.toLowerCase() === roleName.toLowerCase());
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
            fontFamily: 'Verdana',
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

module.exports = new NWBotUtils();
