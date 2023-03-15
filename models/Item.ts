import { Schema, model } from "mongoose";
import { FOLDER, ITEM } from "./collectionName";

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    username: {
        type: String,
    },

    password: {
        type: String,
    },

    url: [{
        type: String,
    }],

    note: {
        type: String,
    },

    folder: {
        type: Schema.Types.ObjectId,
        ref: FOLDER,
    },
    owner: {
        type: Schema.Types.ObjectId,
        default: 1,
    },
}, { timestamps: true });

const Item = model(ITEM, ItemSchema);

export default Item;