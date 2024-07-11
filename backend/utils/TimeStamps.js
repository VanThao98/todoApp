import dayjs from "dayjs";
const TimeStamps = (schema) => {
    schema.add({   
        createdAt: {
            type: String,
            default: () => dayjs().format('YYYY-MM-DD HH:mm:ss'),
        },
        updatedAt: {
            type: String,
            default: () => dayjs().format('YYYY-MM-DD HH:mm:ss'),
        },
    });

    schema.pre('save', function (next) {
        this.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
        next();
    });

    schema.pre('findOneAndUpdate', function (next) {
        this._update.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
        next();
    });

    schema.pre('update', function (next) {
        this._update.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
        next();
    });
};

export default TimeStamps;
