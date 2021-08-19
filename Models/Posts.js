const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartyLinkSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        pictures: [
            {
                contributor: {
                    type: String,
                    ref: 'User'
                },
                url: String
            }
        ],
        creator: {
            type: String,
            ref: 'User'
        },
        closed: { type: Boolean, default: false },
        date: Date
    },
    { collation: 'partylinks' }
);

module.exports = mongoose.model('PartyLink', PartyLinkSchema);
